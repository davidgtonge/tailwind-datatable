const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  entry: path.resolve(__dirname, "../../docs/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.mdx?$/,
        use: ["babel-loader", "@mdx-js/loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".md", ".mdx", ".js", ".jsx"],
    fallback: {fs: false, buffer: false},
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      templateContent: `
    <html>
      <head>
        <title>Tailwind Datatable</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
      <div id="app"></div>
       
      </body>
    </html>
  `,
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "../../public"),
    filename: "[name].js",
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  stats: {
    children: true,
    errors: true,
  },
}
