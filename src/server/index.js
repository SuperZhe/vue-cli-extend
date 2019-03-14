import http from "@/api/http.js";
import login from "./login";

//  进行类的属性与方法 ，静态属性与方法拷贝
function mix(...mixins) {
  console.log(mixins);
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== "constructor" && key !== "prototype" && key !== "name") {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
let apiArray = [http, login];

// 继承所有的类，并写入公用的接口
class ApiList extends mix(...apiArray) {
  constructor() {
    super();
  }
}

export default {
  install(Vue) {
    Vue.prototype.$api = new ApiList();
  }
};
