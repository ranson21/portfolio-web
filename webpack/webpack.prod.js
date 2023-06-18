const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const commonConfig = require('./webpack.common.js');

const ENV = 'production';

module.exports = options =>
  merge(commonConfig({ env: ENV }), {
    mode: ENV,
    devtool: 'source-map',
    entry: {
      main: './src/app/index.jsx',
      vendors: ['react'],
    },
    output: {
      path: path.resolve(__dirname, '..', 'build'),
      publicPath: '/',
      filename: 'app/[name][fullhash].bundle.js',
      chunkFilename: 'app/[id].[chunkhash].chunk.js',
    },
    optimization: {
      splitChunks: {
        minSize: 0,
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: -20,
          },
          // common chunk
          default: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: -10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
      nodeEnv: 'production',
      // flagIncludedChunks: true,
      // sideEffects: false,
      // usedExports: true,
      concatenateModules: true,
      // emitOnErrors: false,
      // checkWasmTypes: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 5,
            warnings: false,
            module: true,
            ie8: false,
            keep_fnames: false,
            safari10: false,
          },
        }),
      ],
    },
    plugins: [
      new CompressionPlugin({
        filename: '[path][name].gz[query]',
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      // new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.IgnorePlugin({
        checkResource(resource, context) {
          const isLocaleFromMomentImport = /^\.\/locale$/.test(resource) && /moment$/.test(context);

          return isLocaleFromMomentImport;
        },
      }),
    ],
  });
