<template>
<html>

  <div id="jl">

    <!-- 上方盒子1 -->
    <div class="box1">
      <h1>Test development platform</h1>      
    </div>

    <!-- 下方盒子2 -->
    <div class="box2">

      <!-- 菜单栏 -->
      <div class="box2_menu">
        
        <!-- :model数据绑定     ：rules数据校验规则 -->
        <el-form
          ref="modle1FormRef"
          label-width="0px"
          class="model1_form"
        >
        <!-- 菜单1 -->
        <div class="menu1" id="menu_btns">
          <el-form-item class="menu_btn" id="website_btn">
            <el-button @click="menu1" @keyup.enter.native="menu1">用例结果统计</el-button>

          </el-form-item>
        </div>

        <!-- 菜单2 -->
        <div class="menu2" id="menu_btns">
          <el-form-item class="menu_btn" id="study_btn">
            <el-button @click="menu2" @keyup.enter.native="menu2">用户信息查询</el-button>
          </el-form-item>
        </div>

        <!-- 菜单3 -->
        <div class="menu3" id="menu_btns">
          <el-form-item class="menu_btn" id="A2_btn">
            <el-button @click="menu3" @keyup.enter.native="menu3">宠物数据新建</el-button>
          </el-form-item>
        </div>

        <!-- 菜单4 -->
        <div class="menu4" id="menu_btns">
          <el-form-item class="menu_btn" id="A4_btn">
            <el-button @click="menu4" @keyup.enter.native="menu4">测试用例管理</el-button>
          </el-form-item>
        </div>

        <!-- 菜单5 -->
        <div class="menu5" id="menu_btns">
          <el-form-item class="menu_btn" id="A5_btn">
            <el-button @click="menu5" @keyup.enter.native="menu5">用例批量执行</el-button>
          </el-form-item>
        </div>

        <!-- 菜单6 -->
        <div class="menu6" id="menu_btns">
          <el-form-item class="menu_btn" id="A6_btn">
            <el-button @click="menu6" @keyup.enter.native="menu6">关于我们</el-button>
          </el-form-item>
        </div>
        </el-form>

      </div>

      <!-- 内容框1 -->
      <div class="box2_data1">

        <el-form>
          <!-- 内容框内设置路由,下次跳转页面的地址 -->
          <router-view />  
        </el-form>

      </div>

    </div>
  </div>
</html>
</template>


<script>
import axios from 'axios'
export default {

  // 数据验证，符合上面的条件ref返回为true
  methods: {
    menu1() {
      return this.$router.push({path: "/general"}, onComplete => {}, onAbort => {}); // General菜单
    
            },
    menu2() {
      return this.$router.push({path: "/reptile"}, onComplete => {}, onAbort => {}); // Reptile菜单
            },

    menu3() {
      return this.$router.push({path: "/data"}, onComplete => {}, onAbort => {}); // Data detection菜单
            },
    menu4() {
      return this.$router.push({path: "/template2"}, onComplete => {}, onAbort => {}); // Template2菜单
            },

    menu5() {
      return this.$router.push({path: "/settings"}, onComplete => {}, onAbort => {}); // Settings菜单
            },

    menu6() {
      return this.$router.push({path: "/about"}, onComplete => {}, onAbort => {}); // About菜单
            },

  },
};
</script>


<style lang="less" scoped>
#jl {
  // 弹性盒子  display: -webkit-flex;  display: flex;  flex-direction: column;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100% ;
  background-color: red; /* 浏览器不支持时显示 */
  background-image: linear-gradient(#7c7676, #2e1818);
}

// 上方盒子1
.box1 {
  width: 99%;
  left: 0.5%;
  height: 14%;
  position: absolute;
  padding: 15px;
  background: rgba(0, 0, 0, 0.9);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
}

// 下方盒子2
.box2 {
  position: absolute;
  top: 14%;
  width: 100%;
  height: 85%;
  // box-sizing: border-box;
  // box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  // border-radius: 10px;
}

.box2_menu {

  position: absolute;
  left: 0.5%;
  width: 16%;
  height: 98%;
  top: 1%;
  background: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

// .box2_menu:hover {
  // left: 0px;
// }

#menu_btns {
  padding: 10px;
  width: 100%;
  height: 7%;
  // background: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  // box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
}

.box2_data1 {
  position: absolute;
  left: 17%;
  width: 82.5%;
  height: 98%;
  top: 1%;
  background: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.menu_btn {
  // 登录按钮设置
  margin-bottom: 0;
  font-weight: bold;
}

.box1 h1 {
  text-align :left;
  
  color: #64d419ec;
}
.url{
    font-size: 72;
    font-size: 55;
    color: #64d419ec;
}

.el-button {
  background: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  // box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  padding:12px 20px;
  font-size: 24px;
  line-height: 1;
  outline: none;
  color:black;
  font-family: "Corbel Light";
  font-weight: bold;
  background: transparent;
  border: none;
  border-bottom:  solid black; /*输入框下边框*/
}


</style>