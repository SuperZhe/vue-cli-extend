module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 7"]
    },
    "postcss-pxtorem": {
      rootValue: 37.5, // 1:1还原vant、mint-ui的组件，否则会样式会有变化
      propList: ["*"]
    }
  }
};
