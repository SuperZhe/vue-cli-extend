// 引入axios
import axios from "axios";
import QS from "qs";
let baseURL = process.env.NODE_ENV === "development" ? "/api" : "a/api/";
// 修改请求默认配置
let https = axios.create({
  // 判断当前环境是开发还是生产
  baseURL: baseURL,
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
   * @return {promise} 返回一个promise对象
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
  /**
   * post请求
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   * @param {promise} 返回一个promise对象
   */
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      https
        .post(url, QS.stringify(params))
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /**
   * 上传文件
   * @param {String} url - API地址
   * @param {FormData} formData 表单数据
   */
  upload(url, params = {}) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: params,
      url: url
    };
    return axios(options);
  }
  /**
   * 文件下载
   * @param {String} 文件下载地址
   * @param {params} 下载文件需要参数
   */
  downLoad(url, params = {}) {
    return new Promise((resolve, reject) => {
      let iframeId = `download-iframe-link`;
      let iframe = document.getElementById(iframeId);
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = iframeId;
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        iframe.onload = function() {
          resolve();
          document.body.removeChild(iframe);
        };
        iframe.onerror = function() {
          reject(new Error(0));
          document.body.removeChild(iframe);
        };
      }
      let paramsString = QS.stringify(params);
      if (url.includes("http")) {
        iframe.src = url + (paramsString ? `?${paramsString}` : "");
      } else {
        console.log(`${baseURL}${url}?${paramsString}`);
        iframe.src = `${baseURL}${url}?${paramsString}`;
      }
    });
  }
}

export default HttpMethod;
