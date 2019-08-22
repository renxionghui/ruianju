module.exports = {
  lintOnSave: false,
  assetsDir:'static/web',
  publicPath:process.env.NODE_ENV === 'production' ? 'http://www.realtoraccess.com' : '/',
  pages:{
    index:{
      entry:'src/views/index/index.js',
      template:'public/index.html',
      filename:'index.html'
    },
    house:{
      entry:'src/views/house/house.js',
      template:'public/house.html',
      filename:'house.html',

    },
    middleman:{
      entry:'src/views/middleman/middleman.js',
      template:'public/agenthome.html',
      filename:'agenthome.html'
    }
  },
  devServer: {
    disableHostCheck: true,
    // 设置请求代理
    proxy: {
        '/': {
            target: 'http://www.realtoraccess.com',
            ws: false,
            changeOrigin: true
        }
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false
}
