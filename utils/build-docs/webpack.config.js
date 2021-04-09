/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const {merge} = require("webpack-merge")

const commonConfig = require("./webpack.common.js")

module.exports = ({env}) => {
  console.log("env...", env)
  const envConfig = require(`./webpack.${env}.js`)

  return merge(commonConfig, envConfig)
}
