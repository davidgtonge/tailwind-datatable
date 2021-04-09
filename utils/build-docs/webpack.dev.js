const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: "development",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.resolve(__dirname, "../../public"),
    hot: true,
    port: 3002,
    historyApiFallback: true,
  },
  devtool: "eval-source-map",
}
