// 引入请求
let https = require("https");
let indexHtml = require("./classHtml");
// 文件操作插件
let fs = require("fs");
let url = "https://dev.c.xinlecai.cn/xlc-ops-c/v2/api-docs";
let http = () => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let result = "";
      res.on("data", data => {
        result += data;
      });
      res.on("end", () => {
        resolve(result.trim());
      });
      res.on("error", e => {
        // 错误处理
        reject(e);
      });
    });
  });
};

class methodsFs {
  /**
   * 判断问文件是否存在
   * @param dir文件路径
   */
  exists(fileName) {
    return new Promise((resolve, reject) => {
      fs.exists(`${__dirname}\\${fileName}`, function(res) {
        resolve(res);
      });
    });
  }
  /**
   * 新建文件夹
   * @param 新建文件夹名称
   */
  mkdir(fileName) {
    return new Promise((resolve, reject) => {
      this.exists(fileName).then(res => {
        if (!res) {
          fs.mkdir(`${__dirname}/${fileName}`, function(err) {
            if (err) reject(err);
            resolve(true);
          });
        } else {
          resolve(true);
        }
      });
    });
  }
}

class InitData extends methodsFs {
  constructor(data) {
    super();
    super.data = data.paths;
  }
  /**
   * filename, 必选参数，文件名
   * data, 写入的数据，可以字符或一个Buffer对象
   * [options],flag,mode(权限),encoding
   * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
   */
  writeFileIndex() {
    if (super.mkdir("api测试")) {
      let data = this.setApiArray();
      let that = this;
      // 设置引入各个模块接口
      let html = "";
      [...new Set(data.classArray)].forEach(el => {
        html += `import ${el} from './${el}.js'\n `;
      });
      let arr = [...new Set(data.classArray)];
      html += `let api = [${[...new Set(data.classArray)]}] `;
      html += indexHtml;
      html += `
      class ApiList extends mix(...api){

      } \n
      export default {
        install(Vue) {
          // 不能让类的方法名有重复
          let api = new ApiList()
          Vue.prototype.$api = api
        }
      }`;
      // 设置引入类
      fs.writeFile(`${__dirname}/api/index.js`, html, function(err) {
        if (err) console.error(err);
        console.log("============文件更新成功===========");
        that.writeModuleFile();
        return true;
      });
    }
  }
  /**
   * 设置各个模块文件，并进行更新修改
   */
  writeModuleFile() {
    if (super.mkdir("api测试")) {
      let data = this.setApiArray();
      // 设置引入各个模块接口
      let html;
      [...new Set(data.classArray)].forEach(el => {
        html = `import http from './api/http.js' \n`;
        html += `class ${el} extends http  { \n
          constructor(){
            super()
          }`;
        data.apiArray.forEach(item => {
          if (item.ApiName.includes(el)) {
            html += `${item.ApiName}(params){
              return super.${item.methods}('${item.apiUrl}',params)
            } \n`;
          }
        });
        html += `\n} export default ${el}`;
        fs.writeFile(`${__dirname}/api/${el}.js`, html, function(err) {
          if (err) console.error(err);
          console.log(`=============${el}文件书写成功===============`);
        });
      });
    }
  }
  /**
   * 设置请求方法，根据参数来定时formData或是raw
   */
  setMethodsAjax(list) {
    let methods = "formDataPost";
    if (
      this.data[list].hasOwnProperty("post") &&
      this.data[list].post.hasOwnProperty("parameters")
    ) {
      this.data[list].post.parameters.forEach(el => {
        if (el["in"] === "body") {
          methods = "post";
        }
      });
    }
    return methods;
  }
  /**
   * 处理传入数据，生成引入，与需要继承的类的数组
   */
  setApiArray() {
    let apiArray = [];
    let classArray = [];
    Object.keys(this.data).forEach(el => {
      // 设置请求方法
      let _vueApi = el.trim().split("/");
      classArray.push(_vueApi[1]);
      let laterName = _vueApi[_vueApi.length - 1].trim();
      let ApiName = `${_vueApi[1]}${_vueApi[_vueApi.length - 1]
        .substr(0, 1)
        .toUpperCase()}${laterName.substr(1)}`;
      apiArray.push({
        ApiName: ApiName,
        apiUrl: el,
        methods: this.setMethodsAjax(el)
      });
    });
    return {
      apiArray: apiArray,
      classArray: classArray
    };
  }
}

function init() {
  setInterval(function() {
    try {
      http().then(res => {
        let data = JSON.parse(res.trim());
        let init = new InitData(data);
        init.writeFileIndex();
      });
    } catch (error) {
      console.log(error);
    }
  }, 10000 * 60);
}

try {
  init();
} catch (error) {
  console.log(error);
}
