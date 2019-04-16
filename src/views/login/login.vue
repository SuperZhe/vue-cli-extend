<template>
  <div class="login">
    <div class="content">
      <div>
        <div class="title">
          登录
        </div>
        <el-form
          label-position="right"
          label-width="80px"
          class="loginForm"
          :model="loginForm"
        >
          <el-form-item label="用户名">
            <el-input
              v-model="loginForm.loginName"
              @keyup.native.enter="login"
              @change="preLogin"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="loginForm.password"
              @keyup.native.enter="login"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="companyId" label="公司" v-if="company.length > 0">
            <el-select v-model="loginForm.companyId" placeholder="请选择公司">
              <el-option
                v-for="item in company"
                :key="item.companyId"
                :label="item.companyName"
                :value="item.companyId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        loginName: "",
        password: "",
        companyId: ""
      },
      company: [],
      isHaveCompany: true
    };
  },
  created() {
    localStorage.removeItem("permission");
  },
  methods: {
    login() {
      this.$api.login(this.loginForm).then(data => {
        if (data.code === 0) {
          sessionStorage.setItem("userinfo", JSON.stringify(data.result));
          if (data.result.roleNames) {
            let roleNames = data.result.roleNames;
            // 仅供开发模式使用 start
            roleNames.push("SUPER");
            // 仅供开发模式使用 end
            // if (roleNames.includes('COMPANY_SUPER') || roleNames.includes('SUPER')) {
            if (roleNames.includes("SUPER")) {
              localStorage.setItem(
                "permission",
                JSON.stringify({ isSuper: 1 })
              );
              this.$store.dispatch("updatePermissions", { isSuper: 1 });
              this.$router.push({
                name: "homePage"
              });
            } else {
              this.$api.getLoginPermission().then(data => {
                if (data.code === 0) {
                  localStorage.setItem(
                    "permission",
                    JSON.stringify({ permissionData: data.result })
                  );
                  this.$store.dispatch("updatePermissions", {
                    permissionData: data.result
                  });
                  this.$router.push({
                    name: "homePage"
                  });
                } else {
                  this.message(data.msg);
                }
              });
            }
          }
        } else {
          this.message(data.msg);
        }
      });
    },
    preLogin() {
      // 预登陆
      this.$api.preLogin({ loginName: this.loginForm.loginName }).then(res => {
        if (res.code === 0) {
          this.company = res.data;
          if (res.data.length === 1) {
            this.loginForm.companyId = res.data[0].companyId;
          }
        } else {
          this.message(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less">
@baseColor: #4a84ff;
.login {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: aliceblue;
  .content {
    width: 400px;
    height: 320px;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    border: 1px solid #e9e9e9;
    background: #ffffff;
    .company {
      cursor: pointer;
      text-align: center;
      line-height: 50px;
      background-color: #e9e9e9;
    }
    .title {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      background: #333333;
      color: #ffffff;
    }
    .loginForm {
      padding: 30px 40px 0 20px;
      .el-select {
        width: 258px;
      }
    }
  }
}
</style>
