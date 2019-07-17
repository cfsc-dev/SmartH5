module.exports = {
    publicPath: './',
    productionSourceMap: false,
    css: {
        extract: false
    },
    devServer: {
        proxy: {
            '/smartxd': {
                target: 'http://dev.chanfine.com:9082',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/smartxd': ''
                }
            }
        }
    },
}