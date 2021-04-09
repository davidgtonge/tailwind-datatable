const path = require("path")

module.exports = {
  mode: "production",
  devServer: {
    contentBase: path.resolve(__dirname, "../../public"),
  },
  devtool: "source-map",
}
