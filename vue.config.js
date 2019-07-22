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
                // target: 'http://172.19.13.242:8000',
                target: 'http://dev.chanfine.com:9082',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/smartxd': ''
                }
          }
      }
  }
}
