const path = require('path');
const nodeExternals = require('webpack-node-externals');

const ENTRY = path.resolve(__dirname, 'server', 'index.jsx');
const OUTPUT_PATH = path.resolve(__dirname);
const OUTPUT_FILENAME = 'bundle.js';

module.exports = {
  target: 'node',
  externals: [nodeExternals()],

  mode: 'development',
  entry: ENTRY,
  output: {
    path: OUTPUT_PATH,
    filename: OUTPUT_FILENAME,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              // localIdentName: '[sha1:hash:hex:6]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
