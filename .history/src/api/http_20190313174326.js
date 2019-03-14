// 引入axios
import axios from "assert";
import QS from "qs";
// 修改请求默认配置
var instance = axios.create({
  // 判断当前环境是开发还是生产
  baseURL: process.env.NODE_ENV === "development" ? "/api" : "a/api/"
});
