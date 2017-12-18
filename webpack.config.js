const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      WlAPI: path.resolve(__dirname, 'src/API'),
      WlScenes: path.resolve(__dirname, 'src/scenes'),
      WlComponents: path.resolve(__dirname, 'src/components'),
      WlStores: path.resolve(__dirname, 'src/stores'),
    },
  },
  entry: {
    app: './src/index.jsx',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader', 'import-glob-loader'],
          fallback: 'style-loader',
        }),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
  ],
  devServer: {
    quiet: false,
    stats: { colors: true },
  },
};
