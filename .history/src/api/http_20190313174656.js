// 引入axios
import axios from "assert";
import QS from "qs";
// 修改请求默认配置
var instance = axios.create({
  // 判断当前环境是开发还是生产
  baseURL: process.env.NODE_ENV === "development" ? "/api" : "a/api/",
  // 请求超时时间
  timeout: 10000,
  // 跨域请求时是否需要使用凭证
  withCredentials: true
});

// 响应拦截
axios.interceptors.response.use(\response => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
});