<template>
<div class="create">
    <h3>新增宠物信息</h3>
    <div class="ipt">
        name:
    <div>
        <input type="text" name="name" class="name" />
    </div>
        weight:
    <div>
        
        <input type="text" name="weight" class="weight" />
    </div>
        birthday:
    <div>
        <input type="text" name="birthday" class="birthday" />
    </div>
        varieties:
    <div>
        <input type="text" name="varieties" class="varieties" />
    </div>
        color:
    <div>
        <input type="text" name="color" class="color" />
    </div>
    </div>
    <div>
        <el-form-item class="btns" id="login_btn">
          <el-button type="primary" @click="submit">Submit</el-button
          >
        </el-form-item>

    </div>

</div>

</template>


<script>
export default {
}
</script>


<style lang="less" scoped>
h3 {
    text-align: center;
}

.create {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 500px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
}

input {
  line-height: 40px;
  width: 70%;
  letter-spacing: 1px;
  color: #d2f707;
  outline: none;
  background: transparent;
//   border: none;
  border-bottom: 1px solid #00ff00; /*输入框下边框*/
}

#login_btn {
  // 登录按钮设置
  margin-bottom: 0;
  padding: 10px;
  text-align: center;
}

.ipt {
    text-align: center;
}
</style>


