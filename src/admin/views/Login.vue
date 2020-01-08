<template>
	<el-dialog :visible="true" :show-close="false" :modal="false" :center="true" title="小米有品后台管理系统"
		class="dialog-login" width="500px">
		<el-form ref="form" :model="model" :rules="rules" :status-icon="true">
			<el-form-item prop="name">
				<el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="model.name">
					<template slot="prepend">用户名</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="pwd">
				<el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="model.pwd" show-password>
					<template slot="prepend">密　码</template>
				</el-input>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button type="primary" @click="login2">确定</el-button>
			<el-button @click="reset">重置</el-button>
		</div>
	</el-dialog>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';

	let { mapActions } = createNamespacedHelpers('login');

        export default {
                data() {
                        return {
                                model: { name: '', pwd: '' },
                                rules: {
                                        name: [
	                                        { required: true, message: '用户名不能为空', trigger: 'blur' },
	                                        { min: 2, max: 20, message: '用户名长度2-20', trigger: 'blur' }
                                        ],
	                                pwd: [
                                                { required: true, message: '密码不能为空', trigger: 'blur' },
                                                { min: 3, max: 20, message: '密码长度3-20', trigger: 'blur' }
	                                ]
                                }

	                };
                },
	        methods: {
		        ...mapActions([ 'login' ]),
		        login2() {
				this.$refs.form.validate()
					.then(() => this.login(this.model))
					.catch(() => {});
		        },
		        reset() {
				this.$refs.form.resetFields();
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.dialog-login
		background-image: url("../assets/images/world.jpg")
		background-repeat: no-repeat
		background-size: 100% 100%
		background-position: center center
		font-weight: bold
</style>