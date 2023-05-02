const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9070',
       	pathRewrite:{'^/api':''},
	      ws: false,//用于支持websocket
	      secure: false,
        changeOrigin: true	//用于控制请求头中的host值
      },
      '/live': {
        target: 'http://192.168.88.130:8080',
      	pathRewrite:{'^/':''},
	      ws: false,//用于支持websocket
	      secure: false,
        changeOrigin: true	//用于控制请求头中的host值
      },
/*      '/live-bvc': {
        target: 'https://cn-gdgz-fx-01-18.bilivideo.com/',
      	pathRewrite:{'^/':''},
	      ws: false,//用于支持websocket
	      secure: false,
        changeOrigin: true	//用于控制请求头中的host值
      },*/
    },
  }
})
