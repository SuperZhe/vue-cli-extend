<template>
  <div class="login">
    <h1>这是登录页</h1>
    <hello-world></hello-world>
  </div>
</template>

<script>
import helloWorld from "_c/helloWorld.vue";
export default {
  name: "login",
  components: { helloWorld }
};
</script>

<style scoped lang="less">
.login {
}
</style>
