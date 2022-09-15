const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  // entry: './ts/es6/set.ts',
  entry: './ts/topic/minMax.ts',
  mode: 'development',
  optimization: {
    emitOnErrors: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
    // static: './dist', // static替换原先的contentBase
    hot: true,
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(c|s[ac])ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)/,
        loader: 'file-loader',
        options: {
          name: '[name][hash].[ext]',
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new EslintWebpackPlugin({
      extensions: ['.js', '.ts'],
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckWebpackPlugin({
      eslint: {
        files: './ts/es6/*.ts',
      },
      typescript: {
        configOverwrite: {
          include: ['./ts/es6/*.ts', './type/type.d.ts'],
        },
      },
    }),
  ],
};
