module.exports = {
  publicPath: './',
  productionSourceMap: false,
  css: {
    extract: false
  },
  devServer: {
      disableHostCheck: true,
      proxy: {
          '/smartxd': {
                target: 'http://222.240.37.83:9082',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/smartxd': ''
                }
          }
      }
  }
}
