<template>
	<div class="login-wrapper">
		<h1>欢迎登录小米有品</h1>
		<div>
			<LoginPhone v-show="loginType ===1"></LoginPhone>
			<LoginPwd v-show="loginType !== 1"></LoginPwd>
			<span class="title-phone" v-show="loginType !== 1" @click="loginType = 1">手机短信登录/注册</span>
			<span class="title-pwd" v-show="loginType ===1" @click="loginType = 0">用户密码登录</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import LoginPhone from '../components/LoginPhone.vue';
	import LoginPwd from '../components/LoginPwd.vue';

        export default {
                components: { //局部注册要用的组件对象
                        LoginPhone,
                        LoginPwd
                },
                data: function() {
                        return {
                                loginType: 1 //表示手机登录
                        };
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.login-wrapper
		box-sizing: border-box
		background-image: url(../assets/images/login_bg.png)
		background-repeat: no-repeat
		background-size: 100% 100%
		padding: 1.2rem 0.92rem 0
		width: 100%
		height: 100%
		h1
			font-weight: normal
			color: #666
			text-align: center
		span
			font-size: 0.28rem
			color: #666
</style>