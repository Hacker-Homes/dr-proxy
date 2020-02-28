const path = require('path');

const ENTRY = path.resolve(__dirname, 'services', 'reviews', 'src', 'index.jsx');
const OUTPUT_PATH = path.resolve(__dirname, 'services', 'reviews', 'public');
const OUTPUT_FILENAME = 'reviews.js';

module.exports = {
  mode: 'production',
  // devtool: 'inline-source-map',
  entry: ENTRY,
  output: {
    path: OUTPUT_PATH,
    filename: OUTPUT_FILENAME,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'services'),
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
          { loader: 'style-loader' },
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
