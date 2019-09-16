const path = require("path");
const resolve = dir => path.join(__dirname, dir);
// 配置开发，生产网址
// const productionUrl = "";
// const devUrl = "";
//  webpack 新增配置文件
module.exports = {
  // 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components/"))
      .set("_as", resolve("src/assets/img/"));
  },
  // 开发与生产环境不同网址
  // publicPath: process.env.NODE_ENV === "production" ? productionUrl : devUrl,
  devServer: {
    port: 8081, // 端口号
    host: "localhost",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      "/api": {
        target: "http://dev.xinlecai.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
