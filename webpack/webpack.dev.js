const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const { merge } = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

const commonConfig = require('./webpack.common.js');

const ENV = 'development';

// Create an API dictionary to toggle local development of each endpoint
const targets = {
  auth: {
    local: 'http://localhost:8001',
    dev: `http://${process.env.HOST}`,
  },
};

// Create a helper function that determines whether to enable the local or minikube service instance
const localTarget = type => process.env.LOCAL_SERVICES && process.env.LOCAL_SERVICES.includes(type);

module.exports = options =>
  merge(commonConfig({ env: ENV }), {
    devtool: 'cheap-module-source-map', // https://reactjs.org/docs/cross-origin-errors.html
    mode: ENV,
    entry: ['./src/app/index.jsx'],
    output: {
      path: path.resolve(__dirname, '..', 'build'),
      filename: 'app/[name].bundle.js',
      chunkFilename: 'app/[id].chunk.js',
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      proxy: [
        {
          context: ['/authorize'],
          target: localTarget('auth') ? targets.auth.local : targets.auth.dev,
          secure: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        },
      ],
    },
    plugins: [
      new SimpleProgressWebpackPlugin({
        format: options.stats === 'minimal' ? 'compact' : 'expanded',
      }),
      new BrowserSyncPlugin(
        {
          host: '127.0.0.1',
          open: 'external',
          port: 9001,
          proxy: {
            target: 'http://127.0.0.1:8080',
            ws: true,
          },
        },
        {
          reload: false,
        }
      ),
      new webpack.HotModuleReplacementPlugin(),
      new writeFilePlugin(),
      new webpack.WatchIgnorePlugin({ paths: [path.resolve(__dirname, 'test')] }),
      new WebpackNotifierPlugin({
        title: 'Portfolio',
        contentImage: path.join(__dirname, 'logo.png'),
      }),
    ],
  });
