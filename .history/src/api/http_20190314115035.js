// 引入axios
import axios from "assert";
import QS from "qs";
// 修改请求默认配置
var https = axios.create({
  // 判断当前环境是开发还是生产
  baseURL: process.env.NODE_ENV === "development" ? "/api" : "a/api/",
  // 请求超时时间
  timeout: 10000,
  // 跨域请求时是否需要使用凭证
  withCredentials: true
});

// 响应拦截
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response) {
      return Promise.reject(error); // 返回错误信息
    }
  }
);

// 请求方法的
class HttpMethod {
  /**
   * get请求方法
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   * @return {rromise} 返回一个promise对象
   */
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      https
        .get(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // post请求
  psot(url, params = {}) {
    return new Promise((resolve, reject) => {
      https
        .post(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // 提交请求
  put() {}
  // 下载
  downLoad() {}
}
