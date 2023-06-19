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
      // lodash: 'lodash',
      // mui: ['@mui/material', '@mui/icons-material'],
      // react: ['react', 'react-dom'],
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
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
          },
          // commons: {
          //   reuseExistingChunk: true,
          //   test: /[\\/]node_modules[\\/]/,
          //   // cacheGroupKey here is `commons` as the key of the cacheGroup
          //   name(module, chunks, cacheGroupKey) {
          //     const moduleFileName = module
          //       .identifier()
          //       .split('/')
          //       .reduceRight(item => item);
          //     const allChunksNames = chunks.map(item => item.name).join('~');
          //     return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          //   },
          //   chunks: 'all',
          // },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
          },
        },
      },
      nodeEnv: 'production',
      flagIncludedChunks: true,
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
      new webpack.IgnorePlugin({
        checkResource(resource, context) {
          const isLocaleFromMomentImport = /^\.\/locale$/.test(resource) && /moment$/.test(context);

          return isLocaleFromMomentImport;
        },
      }),
    ],
  });
