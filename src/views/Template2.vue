<template>
<div>
  <div>
    <el-button type="text" @click="createData">新增</el-button>
    <el-button id="cx" type="text" @click="sel">查询</el-button>

  </div>
    <el-table
	  class="table"
      :data="tableData"
      >

      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>

      <el-table-column
          prop="weight"
          label="Weight">
      </el-table-column>

      <el-table-column
          prop="birthday"
          label="Birthday">
        </el-table-column>

      <el-table-column
          prop="varieties"
          label="Varieties">
        </el-table-column>

      <el-table-column
        prop="color"
        label="Color">
      </el-table-column>

    </el-table>
</div>
</template>

import '.tank'

<script>

export default {
  data() {
    return {
      tableData: []
        }
      },

  created() {
    this.getdata();
    this.tank
  },

  methods: {
    tank() {
      var a = document.getElementById('cx')
      console.log(a)

    },

    createData() {
      return this.$router.push({path: "/create"}, onComplete => {}, onAbort => {});
    },

    getdata() {
      var self = this;
      this.$http.get("/pets/")
      .then(function(Response){
        for (var a = 0; a < Response.data.results.length; a += 1){
          //typeof 类型(参数)
          self.tableData = Response.data.results; 
          self.tableData[a]['weight'] = self.tableData[a]['weight']+" / KG";
        }
      })
    }
  }
}
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

</style>

<style lang="less">

.el-table::before {
  height: 0;
}

.el-table th, .el-table tr {
  background: transparent;
  border: none;
  color: black;
  font-weight: bold;
  font-size: 15px;
}

.el-button--text, .el-button--text.is-disabled, .el-button--text.is-disabled:focus, .el-button--text.is-disabled:hover, .el-button--text:active {
    border-color:chartreuse;
    width: 100px;
}

</style>