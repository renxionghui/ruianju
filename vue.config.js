module.exports = {
  lintOnSave: false,
  assetsDir:'static/web',
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
  }
}
