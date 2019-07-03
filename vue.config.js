module.exports = {
  lintOnSave: false,
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
      template:'public/middleman.html',
      filename:'middleman.html'
    }
  }
}
