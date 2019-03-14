const productionUrl = "";
const dev = "";

//  webpack 新增配置文件
module.exports = {
  // 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
  configureWebpack: {},
  // 开发与生产环境不同网址
  baseUrl: process.env.NODE_ENV === "production" ? productionUrl : dev
};
