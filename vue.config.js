module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    css: {
        extract: false
    },
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/smartxd': {
                //target: 'http://222.240.37.83:9082',
                target: 'http://dev.chanfine.com:9082',
                //target: 'http://172.19.13.196:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/smartxd': ''
                }
            }
        }
    }
}