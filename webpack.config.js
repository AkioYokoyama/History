const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: './src/popup/popup.tsx',
    options: './src/options/options.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    url: false
                }
            },
            'sass-loader'
        ],
      },
    ],
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: './public/popup.html',
      filename: 'popup.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './public/options.html',
      filename: 'options.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: ".",
          to: "../build",
          context: "public",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/*.html"],
          },
        },
      ],
      options: {},
    }),
  ],
};
