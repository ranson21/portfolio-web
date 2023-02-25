// External Dependencies
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

// Default Export
module.exports = options => ({
  cache: options.env !== 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules'],
    alias: {
      node_modules: path.join(__dirname, '..', 'node_modules'),
      app: path.join(__dirname, '..', 'src/app'),
      web: path.join(__dirname, '..', 'src/web'),
      content: path.join(__dirname, '..', 'src/web/content'),
      images: path.join(__dirname, '..', 'src/web/img'),
      data: path.join(__dirname, '..', 'src/data'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: /src/,
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  stats: {
    children: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV', '_SERVER', '_AURORA_URL', 'API_KEY', 'SENDER_ID', 'APP_ID', 'PROJECT_ID', '_RELEASE']),
    new CopyWebpackPlugin([
      { from: './src/web/img', to: 'img' },
      { from: './src/web/favicon.ico', to: 'favicon.ico' },
      { from: './src/web/manifest.webapp', to: 'manifest.webapp' },
      { from: './src/web/robots.txt', to: 'robots.txt' },
    ]),
    new HtmlWebpackPlugin({
      template: './src/web/index.html',
      chunksSortMode: 'dependency',
      inject: 'body',
    }),
  ],
});
