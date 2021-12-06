<template>
    <div>
        <div class="dh">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
            >
                <el-form-item label="">
                    <el-input
                        oninput="if(value.length > 11)value = value.slice(0, 10)"
                        v-model="formInline.name"
                        placeholder="输入学生名字可以查删改"
                    ></el-input>
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

                <el-form-item>
                   <el-button type="primary" @click="dialog = true">新增</el-button>
                </el-form-item>

            </el-form>
        </div>
        
            <el-drawer
                title="学生信息表"
                :before-close="handleClose"
                :visible.sync="dialog"
                custom-class="demo-drawer"
                ref="drawer"
            >
                <div class="demo-drawer__content">
                    <el-form :model="studentsform">
                        <el-form-item
                            label="学生名字"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.name"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="年龄"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.age"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                    </el-form>

                    <el-form :model="form">
                        <el-form-item
                             label="期望薪资"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.salary"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="意向公司"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.intended_company"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="学历及专业"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.education"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="面试阶段"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.interview_stage"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="外包公司"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.outsourcing_company"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="住址"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.address"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="是否可推"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.isPush"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="备注"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.remarks"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="负责人"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="studentsform.person_in_charge"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                    </el-form>

                    <div class="demo-drawer__footer">
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button
                            type="primary"
                            @click="submit"
                            :loading="loading"
                            >{{ loading ? "提交中 ..." : "提 交" }}</el-button
                        >
                    </div>
                </div>
            </el-drawer>
        
        <div class="res_table_students">
            <el-table class="table" :data="tableData">
                <el-table-column prop="name" label="姓名"> </el-table-column>

                <el-table-column prop="age" label="年龄"> </el-table-column>

                <el-table-column prop="salary" label="薪资">
                </el-table-column>

                <el-table-column prop="intended_company" label="意向公司">
                </el-table-column>

                <el-table-column prop="education" label="学历/专业"> </el-table-column>

                <el-table-column prop="interview_stage" label="面试阶段"> </el-table-column>

                <el-table-column prop="outsourcing_company" label="外包公司" :show-overflow-tooltip="true"> </el-table-column>

                <el-table-column prop="address" label="住址" :show-overflow-tooltip="true"> </el-table-column>

                <el-table-column prop="isPush" label="是否推送"> </el-table-column>

                <el-table-column prop="remarks" label="备注" :show-overflow-tooltip="true"> </el-table-column>

                <el-table-column prop="person_in_charge" label="负责人"> </el-table-column>
            </el-table>
        </div>

        <div class="pagination">
            <!-- 分页功能 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
        </div>
    </div>
</template>


<script>
export default {
    // 设置头部标题都可以用 document.title，这个是通用的，我也可以这样设置，如下
    page() {
        document.title = "个人中心";
    },
    data() {
        return {
            // 分页
            currentPage: 1,
            formInline: {
                name: "",
            },
            // 宠物表单
            studentsform: {
                name: "",
                age: "",
                salary: "",
                intended_company: "",
                education: "",
                interview_stage: "",
                outsourcing_company: "",
                address: "",
                isPush: "",
                remarks: "",
                person_in_charge: "",
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
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            let ttoken = localStorage.token;
            var self = this;
            // console.log(`${val}`);
            const res = this.$http
                .get("/students/", { params: { page: `${val}` } }, {headers: {Authorization: "Bearer "+ttoken}})
                .catch((e) => {
                    return { data: { code: "404" } };
                })
                .then(function (Response) {
                    // console.log(Response)
                    if (Response.status == 200) {
                        var res = Response.data.results;
                        for (var a = 0; a < res.length; a += 1) {
                            //typeof 类型(参数)
                            res[a]["weight"] = res[a]["weight"] + " / KG";
                        }
                        self.tableData = res;
                    }
                    if (Response.data.code == 404) {
                        self.$message({ message: "页码不存在", type: "error" });
                    }
                });
        },
        open1() {
            this.$message({
                message: "数据已创建",
                type: "success",
            });
        },
        // 查询
        onSubmit() {
            let ttoken = localStorage.token;

            const res = this.$http
                .get("/students/" + this.formInline.name, {headers: {Authorization: "Bearer "+ttoken}}) // 请求userdata/{参数}接口  this.formInline:{usernmae}
                .then((res) => {
                    // 数据显示到盒子
                    var res1 = res.data;
                    res.tableData = res1;
                    this.tableData = [res1];
                    // console.log(res1);
                    // 数据不存在弹框
                    if (res.data.code == 404)
                        this.$message({
                            message: this.formInline.name + ": 不存在",
                            type: "error",
                        });
                    
                })
                .catch((e) => {
                    return { data: { code: "404" } };
                })
        },
        delSubmit() {
            let ttoken = localStorage.token;
            const res = this.$http
                .delete("/students/" + this.formInline.name, {headers: {Authorization: "Bearer "+ttoken}})
                .catch((e) => {
                    return { data: { code: "404" } };
                })
                .then((res) => {
                    //   console.log(res.request.status)
                    if (res.data.code == 404)
                        this.$message({
                            message: this.formInline.name + ": 不存在",
                            type: "error",
                        });
                    if (res.request.status == 204)
                        this.$message({
                            message: this.formInline.name + ": 已被删除",
                            type: "success",
                        });
                });
            window.location.reload();
        },
        upSubmit() {
            let ttoken = localStorage.token;
            const { data: res } = this.$http
                .put("/students/" + this.formInline.name, {headers: {Authorization: "Bearer "+ttoken}}) // 请求userdata/{参数}接口  this.formInline:{usernmae}
                .then(() => {
                    alert("敬请期待！");
                });
        },
        submit() {
            let ttoken = localStorage.token;
            
            const { data: res } = this.$http
                .post("/students/", this.studentsform, {headers: {Authorization: "Bearer "+ttoken}})
                .then(() => {
            console.log(ttoken);
                    this.$refs.drawer.closeDrawer();
                    this.getdata();
                    this.$message({
                        message: "数据已创建",
                        type: "success",
                    });
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
            let ttoken = localStorage.token;
            var self = this;
            this.$http.get("/students/", {headers: {Authorization: "Bearer "+ttoken}}).then(function (Response) {
                var res = Response.data.results;
                for (var a = 0; a < res.length; a += 1) {
                    //typeof 类型(参数)
                    res[a]["weight"] = res[a]["weight"] + " / KG";
                }
                self.tableData = res;
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
    padding-left: 20px;
}
.pagination {
    text-align: end;
}
.dh {
    color: black;
    font-weight: bold;
	padding-top: 5px;
	padding-left: 10px;
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
    width: 91%;
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
    border-color: #409eff;
    width: 100px;
    font-size: 15px;
    font-weight: bold;
}
.el-button--primary {
    background: 0 0;
    width: 100px;
    color: #409eff;
}

.el-pagination button:disabled  {
    background-color: transparent;
}

.el-pagination .btn-next {
    background-color: transparent;
}
.el-pagination .btn-prev {
    background-color: transparent;
}

.el-icon-date:before{
    content:''

}
</style>