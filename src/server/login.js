import http from "@/api/http.js";

class Login extends http {
  constructor() {
    super();
  }

  /**
   * 登录相关接口=>login
   * @param [string]  参数：captcha  描述：captcha   是否必填 false
   * @param [string]  参数：loginName  描述：loginName   是否必填 false
   * @param [string]  参数：password  描述：password   是否必填 false
   */
  login(params) {
    return super.post("/login", params);
  }
  /**
   * 预登录接口
   * @param {String} 参数：longinName 名称
   * @param {String} 参数：password 密码
   */
  preLogin(params) {
    return super.post("/preLogin", params);
  }
  /**
   * 权限接口
   */
  getLoginPermission(params) {
    return super.post("/permFun/getLoginPermission", params);
  }
}

// 放出去的出口
export default Login;
