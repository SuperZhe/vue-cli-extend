const productionUrl = "";
const dev = "";

//  webpack 新增配置文件
module.exports = {
  // 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
  configureWebpack: {},
  // 开发与生产环境不同网址
  baseUrl: process.env.NODE_ENV === "production" ? productionUrl : dev,
  devServer: {
    port: 8080, // 端口号
    host: "localhost",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      "/api": {
        target: "http://192.168.2.61:8090",
        ws: true,
        changeOrigin: true
      }
    } // 配置多个代理
  }
};
