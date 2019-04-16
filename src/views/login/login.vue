<template>
  <div class="login">
    <h1>这是登录页</h1>
    <hello-world></hello-world>
  </div>
</template>

<script>
import helloWorld from "@/components/HelloWorld.vue";
export default {
  name: "login",
  components: { helloWorld },
  created() {
    console.log(this.$api.login());
  }
};
</script>

<style scoped lang="less">
.login {
}
</style>
