const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ROOT = path.resolve(__dirname, "src");
const DESTINATION = path.resolve(__dirname, "dist");

module.exports = {
  context: ROOT,
  entry: {
    main: "./index.ts"
  },
  output: {
    filename: "[name].bundle.js",
    path: DESTINATION
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [ROOT, "node_modules"]
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'My App',
        template: './index.html'
      }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        use: "source-map-loader"
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: "awesome-typescript-loader"
      },
      {
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          "sass-loader"
        ]
      }
    ]
  },
  devtool: "cheap-module-source-map",
  devServer: {
    port: 4210
  }
};
