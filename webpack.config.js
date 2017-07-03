const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractStyles = new ExtractTextPlugin({
  filename: './styles.css',
});

const extractEmbed = new ExtractTextPlugin({
  filename: './embed.css',
});

module.exports = {
  entry: {
    bundle: './app/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: './[name].js',
  },
  module: {
    rules: [
      {
        test: /\.sass$/, // compile our main styles
        exclude: /node_modules|embed.sass/,
        use: extractStyles.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        }),
      },
      {
        test: /\.sass$/, // compile our embed styles
        exclude: /node_modules|styles.sass/,
        use: extractEmbed.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    extractStyles,
    extractEmbed,
  ],
};