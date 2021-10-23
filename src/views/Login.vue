<template>
<html>
<title>九歌的综合网站</title>

  <!-- <embed hidden="true" autostart="true" src="../../src/img/bgm01.mp3" /> -->
  <!-- <audio src="../../src/img/bgm01.mp3" autoplay="autoplay"></audio> -->
  <!-- <object width="100%" height="64" hidden="true" autostart="true" data="../../src/img/bgm01.mp3"></object> -->
  <div class="login_container">
    <div class="login_box">
      <!-- {{ 函数返回数据  }} -->
      <h5>{{ slogan }}</h5>
      <!-- :model数据绑定     ：rules数据校验规则 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username" class="login_input" id="login_user">
          <el-input
            class="txt_input"
            v-model="loginForm.username"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password" class="login_input" id="login_pwd">
          <el-input
            class="txt_input"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>

        <!-- 登录 -->
        <el-form-item class="btns" id="login_btn">
          <el-button type="primary" @click="login" @keyup.enter.native="login"
            >Login</el-button
          >
        </el-form-item>

        <!-- 注册 -->
        <el-button class="resgister" type="text" @click="dialog = true">Resgiter</el-button>
  
        <!-- 小图 -->
        <img src="../../src/img/login_xb.jpg" alt="Smiley face" width="100%" height="100%">


      </el-form>
    </div>

      <el-drawer
        title="用 户 注 册 表"
        :before-close="handleClose"
        :visible.sync="dialog"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="registerform">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="registerform.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="registerform.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>

          <el-form :model="form">
            <el-form-item label="确认密码" :label-width="formLabelWidth">
              <el-input
                v-model="registerform.password_confirm"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input
                v-model="registerform.email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>

          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="submit" :loading="loading">{{
              loading ? "提交中 ..." : "提 交"
            }}</el-button>
          </div>
        </div>
      </el-drawer>

  </div>
</html>
</template>



<script>
import axios from "axios";
export default {
  data() {
    return {
            // 宠物表单
      registerform: {
        username: "",
        password: "",
        password_confirm: "",
        email: "",
      },
      dialog: false,
      loading: false,
      gridData: [],
      form: {
        name: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",
      timer: null,

      // 登录表单的数据
      loginForm: {
        username: "",
        password: "",
      },

      // 表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
      },

      slogan: "",
    };
  },

  mounted() {
    this.slogan1(); // 函数入口
  },

  // 数据验证，符合上面的条件ref返回为true
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http
          .post("/login/", this.loginForm)
          .catch((e) => {
            return { data: { code: "400" } };
          });
        if (res.hasOwnProperty("username")) return this.$router.push({path: "/home"}, onComplete => {}, onAbort => {}); // this.$message.success('登录失败');this.$message.success成功提示框

        if (res.code == 400) return this.$message.error("登录失败");  // 弹出错误的提示框
      });
    },

    slogan1() {
      // 定义函数，从接口获取数据
      axios
        .get("/slogan/", this.slogan1) // 接口地址为/user/slogan/
        .then((Response) => {
          //   console.log(Response.data.data);
          this.slogan = Response.data.data;
        });
    },

    open1() {
    this.$message({
      message: '用户已注册',
      type: 'success'
      });
    },

    submit() {
      const { data: res } = this.$http
      .post("/register/", this.registerform)
      .then(() => {
      this.$refs.drawer.closeDrawer();
      this.open1()
    console.log(this.registerform.data)
        });
    },
    handleClose(done) {
        this.dialog = false;
        this.loading = false;
    },
    cancelForm() {
        this.loading = false;
        this.dialog = false;
        clearTimeout(this.timer);
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-image: url(../../src/img/login_bg2.jpg);
  margin: 0;
  height: 100%;
  padding: 0;
  font-family: sans-serif;
  background-size: cover;
  text-align: center;
}

.login_pic {
  background-image: url(../../src/img/login_xb.jpg);
  margin: 0;
  height: 50%;
  width: 50%;
  padding: 0;
  font-family: sans-serif;
  // background-size: cover;
}

.login_box {
    position: absolute;
    top: 50%;
    left: 17%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 600px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
}

h5 {
  font-family: "Corbel Light";
  font-weight: bold;
  margin: 0 0 30px;
  padding: 0;
  color: #64d419ec;
  text-align: center;
  font-size: 15;
}

.login_form {
  // 登录box设置
  bottom: 0;
  width: 100%;
}

// ::v-deep

.el-button--primary {
  // 所有主按钮设置
  background-color: #f123;
  width: 100px;
}

#login_btn {
  // 登录按钮设置
  margin-bottom: 0;
  padding: 10px;
  text-align: center;
}

#register_btn {
  // 注册按钮设置
  text-align: end;
}

.btns {
  // 按钮设置
  font-weight: bold;
}

.resgister {
  text-align: end;
}

</style>

// 取消作用域可以更改全局
<style lang="less">
.el-input--prefix .el-input__prefix {
  left: 55px;
  transition: all 0.3s;
}

.el-input .el-input__inner {
  // 输入框设置
  width: 70%;
  letter-spacing: 1px;
  color: #d2f707;
  outline: none;
  background: transparent;
  border: none;
  border-bottom: 1px solid #00ff00; /*输入框下边框*/
}

.login_box #login_user .el-form-item__error {
  left: 62px;
  line-height: 2;
}

#login_pwd .el-form-item__error {
  left: 62px;
  line-height: 2;
}


element.style {
    width: 100%;
}

div.drawer.rtl.demo-drawer {
  text-align: center;
}


.el-drawer__header {
    font-size: 28px;
    color: #000;
    font-weight: bold;
}
.el-input .el-input__inner {
    color: black;
}
.el-form-item__label {
    color: black;
    font-weight: bold;
}
.el-table::before {
    height: 0;
}

</style>