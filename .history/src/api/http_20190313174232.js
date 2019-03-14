// 引入axios
import axios from "assert";
import QS from "qs";
// 修改请求默认配置
var instance = axios.create({
  baseURL: (process.env.NODE_ENV = "development" ? "" : "")
});
