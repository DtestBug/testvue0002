<template>
<html>
	<!-- 導航盒 -->
	<div class='model1'>
		<el-form
			:inline="true"
			:model="formInline"
			class="demo-form-inline"
		>
			<el-form-item label="">
				<el-input
					oninput="if(value.length > 11)value = value.slice(0, 10)"
					v-model="formInline.name"
					placeholder="請輸入手機號"
				></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>


	</div>

	<!-- 結果輸出盒 -->
	<div class='model2'>
		<h2>Result</h2>

		<hr>

        <!-- 数据展示 -->
        <el-table class="table" :data="tableData">
            <el-table-column prop="imAccount" label="Name"> </el-table-column>
        </el-table>

	</div>

</html>
</template>

<script>
export default {
    data() {
        return {
			// 手機號輸入框綁定數據
            formInline: {
                name: "",
            },
            // 数据展示
            tableData: [],
        };
    },

    // 默认执行一次
    // created() {},
	

	methods: {
		// 查询token
        onSubmit() {
            if (this.formInline.name == "")
                this.$message({
                    message: "请输入查询条件",
                    type: "error",
                });
            
            else if (this.formInline.name.split(" ").length != 1)
            this.$message({
                message: "禁止输入空格",
                type: "error",
            });
            
            else if (this.formInline.name.length != 11)
            this.$message({
                message: "手机号格式错误",
                type: "error",
            });
                
            
			const res = this.$http
                .post("https://auth2.corpvip.com/account/login",
			{"mobile":this.formInline.name,"code": "8562","loginType":"2"},
			{ headers: {"Content-Type": "application/json"} }
			).then((res) => {
            
            // 获取上一步token
            var token = res.data.body.token

            const res1 = this.$http
                .post("https://auth2.corpvip.com/im/userSig",
			{"token":token},
			{ headers: {"Content-Type": "application/json"} }
            ).then((res1) => {
                    var res2 = res1.data.body;
                    console.log(res2)
                    this.tableData = [res2];
                });

                });
            
        },
	},
}
</script>

<style lang="less" scoped>
// 上方盒子1
.model1 {
	position: absolute;
	width: 100%;
	height: 10%;
	background: rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
	box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
border-radius: 7px;
}

.model2 {
    position: absolute;
	padding-top: 0%;
	width: 100%;
	height: 90%;
	margin-top: 5%;
	background: rgba(0, 0, 0, 0);
	box-sizing: border-box;
	// box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
	border-radius: 7px;
}

.demo-form-inline {
    color: black;
    font-weight: bold;
}
</style>