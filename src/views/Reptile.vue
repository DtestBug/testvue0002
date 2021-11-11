<template>
<html>
	<!-- 導航盒 -->
	<div class='model1'>
		<el-form
			:inline="true"
			:model="formInline"
			class="demo-form-inline"
		>

			<!-- 輸入環境 -->
			<el-form-item label="">
				<el-input
					oninput="if(value.length >= 1)value = value.slice(0, 1)"
					v-model="formInline.isonlie"
					placeholder="1:test / 0:online"
				></el-input>
			</el-form-item>

			<!-- 手機號 -->
			<el-form-item label="">
				<el-input
					oninput="if(value.length >= 11)value = value.slice(0, 11)"
					v-model="formInline.mobile"
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
			<!-- userCd -->
            <el-table-column prop="imAccount" label="UserCd"> </el-table-column>
			
			<!-- 时间 -->
			<el-table-column prop="time" label="Time"> </el-table-column>
        </el-table>

	</div>

</html>
</template>

<script>
export default {
    data() {
        return {

            formInline: {
			// 手機號輸入框綁定數據
			mobile: "",

			// 賬號環境
			isonlie:"",
            },
            // 数据展示
            tableData: [],
        };
    },

    // 默认执行一次
    // created() {},
	

	methods: {
		// 判斷是否綫上
		onSubmit() {
			if (this.formInline.isonlie == 0)
				this.onSubmit1("https://auth2.corpvip.com")
			else if (this.formInline.isonlie == 1)
				this.onSubmit1("https://auth2-test1.corpvip.com")
		},

		// 查询token
        onSubmit1(data) {
			let url = data;
            if (this.formInline.mobile == "")
                this.$message({
                    message: "请输入查询条件",
                    type: "error",
                });
            
            else if (this.formInline.mobile.split(" ").length != 1)
            this.$message({
                message: "禁止输入空格",
                type: "error",
            });
            
            else if (this.formInline.mobile.length != 11)
            this.$message({
                message: "手机号格式错误",
                type: "error",
            });
                
            
			const res = this.$http
                .post(url + "/account/login",
			{
				"mobile": "11022222222",
				"tracingType": "IDFA",
				"code": "8562",
				"ct": "iOS",
				"callerType": "1",
				"v": "1.8.6",
				"tracingID": "",
				"token": "",
				"loginType": "2"
			},
			{ headers: {"Content-Type": "application/json"} }
			).then((res) => {
            
            // 获取上一步token
            var token = res.data.body.token

            const res1 = this.$http
                .post(url + "/im/userSig",
			{"token":token},
			{ headers: {"Content-Type": "application/json"} }
            ).then((res1) => {
                    var res2 = res1.data.body;
                    console.log(res2)

					res2["time"] = new Date().toLocaleString()  // 当前时间，中括号内的time必须与prop属性值一致
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
	background-color: transparent;
}

.demo-form-inline {
    color: black;
    font-weight: bold;
	padding-top: 10px;
	padding-left: 10px;

}

.el-input {
    width: 100%;
}
</style>