<!--  -->
<template>
  <div class="login-contarin">
    <el-form ref="ruleForm" :rules="rules" :model="user" class="login-form">
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="手机号码:"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="验证码:"></el-input>
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox v-model="user.checked"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "login",
  data() {
    return {
      user: {
        mobile: "13911111111", // 手机号
        code: "246810", // 验证码
        checked: false,
      },

      rules: {
        mobile: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[1|3|5|7|8|9]\d{9}$/,
            message: "手机号码格式不对",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { pattern: /^\d{6}$/, message: "验证码格式不对", trigger: "blur" },
        ],
        // 自定义验证规则
        checked: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error("请同意用户协议"));
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (!valid) {
          return;
        }
        this.login();
      });
      // 表单验证

      // 验证通过，提交登录
    },
    login() {
      // 开启登陆中 loading...
      this.loginLoading = true;

      login(this.user)
        .then((res) => {
          console.log(res);

          // 登录成功
          this.$message({
            message: "登录成功",
            type: "success",
          });
          window.localStorage.setItem('user',JSON.stringify(res.data.data))
          // 关闭 loading
          this.loginLoading = false;
          this.$router.push("/");
        })
        .catch((err) => {
          // 登录失败
          console.log("登录失败", err);
          this.$message.error("登录失败，手机号或验证码错误");

          // 关闭 loading
          this.loginLoading = false;
        });
    },
  },
};
</script>
<style lang='less' scoped>
.login-contarin {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(./background.jpg);
  background-size: cover;
  .login-form {
    padding: 40px;
    background-color: #fff;
    min-width: 30px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>