/*
 * fast add new module script
 */
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
// 与用户实现命令交互
const inquirer = require("inquirer");
//从后向前，若字符以 / 开头，不会拼接到前面的路径(因为拼接到此已经是一个绝对路径)；
//若以../ 开头，拼接前面的路径，且不含最后一节路径；
//若以./ 开头 或者没有符号 则拼接前面路径；
const reslove = file => path.resolve(__dirname, "../src", file);
const RouterSymbol = Symbol("router"),
  ViewsSymbol = Symbol("views");
// 获取文件
const rootPath = {
  [RouterSymbol]: reslove("router/modules"),
  [ViewsSymbol]: reslove("views")
};

const errorLog = error => console.log(chalk.red(`${error}`));
const defaultLog = log => console.log(chalk.green(`${log}`));
// module name
let moduleName = new String(); // 创建变量模块名称
let fileType = new String(); // 文件类型

const vueTemplate = module => `<template>
<div class="${module}"></div>

</template>

<script>
export default {
  name: '${module}',
  data () {
    return {

    }
  },
  methods: {

  },
  created() {
    
  }
}
</script>

<style lang="less">
.${module}{}
</style>
`;
// 初始生成路文件
const routerTemplate = (module, router) => `
export default [
  {
  "path": "/${module}",
  "name": "${module}",
  "component": () => import("@/views/${module}/${router}")
  }
]`;

const routerPath = (module, router) => {
  return {
    path: `/${router}`,
    name: `${router}`,
    component: () => import(`@/views/${module}/${router}`)
  };
};
/**
 *  generate view file生成模板文件
 * @param {*} filePath 文件路径
 * @param {*} content 文件内容
 * @param {*} dirPath 目录地址
 */
const generateFile = async (filePath, content, dirPath = "") => {
  try {
    // 如果目录地址不为空切查询的到地址
    if (dirPath !== "" && !(await fs.existsSync(dirPath))) {
      await fs.mkdirSync(dirPath);
      defaultLog(`created module ${dirPath}`);
    }
    if (await fs.existsSync(filePath)) {
      // 确认文件一否已被创建
      errorLog("The current file already exists");
    } else {
      // 文件未被创建执行的操作
      await fs.openSync(filePath, "w"); // w 打开文件用于写入。如果文件不存在则创建文件，如果文件已存在则截断文件
      defaultLog(`created file ${filePath}`);
      await fs.writeFileSync(filePath, content, "utf8"); // 文件写入信息
    }
  } catch (error) {
    errorLog(error);
  }
};

/**
 * generateRouterFile router file 生成路由模板
 */
const generateRouterFile = async (filePath, content, routerArg) => {
  try {
    if (await fs.existsSync(filePath)) {
      // 确认文件一否已被创建,如果模板被创建，文件不同生成路由

    } else {
      // 文件未被创建执行的操作
      await fs.openSync(filePath, "w"); // w 打开文件用于写入。如果文件不存在则创建文件，如果文件已存在则截断文件
      defaultLog(`created router file ${filePath}`);
    }
    await fs.writeFileSync(filePath, content, "utf8"); // 文件写入信息
  } catch (error) {
    errorLog(error);
  }
};
const generates = new Map([
  [
    "view",
    async (module, router, fileName) => {
      if (fileName) {
        // 判断模块是否存在，如果存在则不需要添加
        const filePath = path.join(rootPath[ViewsSymbol], module);
        // 生成新的文件
        const vuePath = path.join(filePath, `${fileName}`);
        await generateFile(vuePath, vueTemplate(router), filePath);
      }
    }
  ],
  // router is not need new folder
  [
    "router",
    async (module, router) => {
      // 按模块创建路由对应视图模块
      const routerPath = path.join(rootPath[RouterSymbol], `/${module}.js`);
      await generateRouterFile(routerPath, routerTemplate(module, router), {
        module,
        router
      });
    }
  ]
]);
// files
const files = ["router"];
// 文件名成正则校验
// eslint-disable-next-line no-useless-escape
const reg = /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
inquirer
  .prompt([{
      name: "modules",
      message: "请输入要创建或写入模块名称(英文，包括路由)"
    },
    {
      name: "fileName",
      message: "请输入视图view模块下文件名(英文,首字母要大写，驼峰命名,已存在可不用填写)"
    },
    {
      name: "routerList",
      message: "请输入路由名称"
    }
  ])
  .then(res => {
    if (reg.test(res.modules)) {
      errorLog("请输入正确的文件名");
      return;
    }
    if (!moduleName) {
      moduleName = res.modules;
    } else {
      files.forEach(async el => {
        // 执行创建语句
        await generates
          .get(`${el}`)
          .call(null, res.modules, res.routerList, res.fileName);
      });
    }
  });