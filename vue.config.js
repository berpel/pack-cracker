module.exports = {
  outputDir: './dist',
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
      filename: 'js/pack-cracker.js'
    },
    optimization: {
      splitChunks: false,
      minimize: true
    }
  }
};