// 把方法接口放出去得文件口
import date from "./date";
export default {
  install(Vue) {
    Vue.prototype.$lib = new date();
  }
};
