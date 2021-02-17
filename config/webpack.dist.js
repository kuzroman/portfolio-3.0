const paths = require('./paths')

module.exports = {
  mode: 'production',

  devServer: {
    contentBase: paths.build,
    // open: false,
    compress: true,
    // hot: true,
    port: 9000,
  },
}