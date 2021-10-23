<template>
  <div>
    <div>

      <!-- <el-button type="text" @click="dialog2=true">查询</el-button>
    <el-button type="text" @click="dialog3=true">更新</el-button>
    <el-button type="text" @click="dialog4=true">删除</el-button> -->

    <el-form :inline="true" :model="formInline" class="demo-form-inline">


      <el-form-item label="">
        <el-input v-model="formInline.name" placeholder="输入宠物名可以查删改"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="delSubmit">删除</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="upSubmit">修改</el-button>
      </el-form-item>

                  <!-- 新增数据按钮 -->
      <el-button type="text" @click="dialog = true">新增</el-button>
    </el-form>





      <el-drawer
        title="宠 物 信 息 表"
        :before-close="handleClose"
        :visible.sync="dialog"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="petsform">
            <el-form-item label="宠物名字" :label-width="formLabelWidth">
              <el-input v-model="petsform.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="体重" :label-width="formLabelWidth">
              <el-input v-model="petsform.weight" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>

          <el-form :model="form">
            <el-form-item label="出生日期" :label-width="formLabelWidth" >
              <el-date-picker type="date" placeholder="选择日期" v-model="petsform.birthday" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-form-item>

            <el-form-item label="品种" :label-width="formLabelWidth">
              <el-input
                v-model="petsform.varieties"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="颜色" :label-width="formLabelWidth">
              <el-input v-model="petsform.color" autocomplete="off"></el-input>
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
    <el-table class="table" :data="tableData">
      <el-table-column prop="name" label="Name"> </el-table-column>

      <el-table-column prop="weight" label="Weight"> </el-table-column>

      <el-table-column prop="birthday" label="Birthday"> </el-table-column>

      <el-table-column prop="varieties" label="Varieties"> </el-table-column>

      <el-table-column prop="color" label="Color"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        formInline: {
          name: ""
        },

      // 宠物表单
      petsform: {
        name: "",
        weight: "",
        birthday: "",
        varieties: "",
        color: "",
      },
      tableData: [],
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
    };
  },

  created() {
    this.getdata();
  },

  methods: {
    open1() {
    this.$message({
      message: '数据已创建',
      type: 'success'
      });
    },

    open2() {
    this.$message({
      message: this.formInline.name+': 已被删除',
      type: 'success'
      });
    },

    // 查询
    onSubmit() {
      const { data: res } = this.$http
      .get("/pets/"+ this.formInline.name);  // 请求userdata/{参数}接口  this.formInline:{usernmae}
      },

    delSubmit() {
      const { data: res } = this.$http
      .delete("/pets/"+ this.formInline.name).catch((e) => { return { data: { code: "400" } }})  // 请求userdata/{参数}接口  this.formInline:{usernmae}
      .then(() => {
        this.open2();
        window.location.reload();
      });
      // console.log(e);
    },

    upSubmit() {
      const { data: res } = this.$http
      .put("/pets/"+ this.formInline.name)  // 请求userdata/{参数}接口  this.formInline:{usernmae}
      .then(() => {
          alert("敬请期待！");
      })
    },

    submit() {
    const { data: res } = this.$http
        .post("/pets/", this.petsform)
        .then(() => {
            this.open1();
            this.$refs.drawer.closeDrawer();
            this.getdata()
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


    getdata() {
      var self = this;
      this.$http.get("/pets/").then(function (Response) {
        var res = Response.data.results;
        for (var a = 0; a < Response.data.results.length; a += 1) {
          //typeof 类型(参数)
          res[a]["weight"] = res[a]["weight"] + " / KG";
          self.tableData = res;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
    // 弹性盒子  display: -webkit-flex;  display: flex;  flex-direction: column;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    outline: none;
    background: transparent;
    border: none;
}
.el-input {
  padding-left: 50px;
}


</style>

<style lang="less">
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
.el-table th,
.el-table tr {
    background: transparent;
    border: none;
    color: black;
    font-weight: bold;
    font-size: 15px;
}
.el-button--text,
.el-button--text.is-disabled,
.el-button--text.is-disabled:focus,
.el-button--text.is-disabled:hover,
.el-button--text:active {
    border-color: blue;
    width: 100px;
    font-size: 15px;
    font-weight: bold;
}

.el-button--primary {
    background: 0 0;
    width: 100px;
    color: #409EFF;
}

</style>