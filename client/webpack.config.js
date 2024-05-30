const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'main.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
    watchFiles: ['src/**/*.html', 'src/**/*.css', '../public'],
    port: 3000,
    open: false,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Random Ideas App',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
