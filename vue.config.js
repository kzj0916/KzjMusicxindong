module.exports = {
    // publicPath: './',
    // outputDir:'dist',
    // assetsDir:'static',
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },
    devServer: {
        proxy: {//解决跨域问题
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/
                target: 'https://autumnfish.cn/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
