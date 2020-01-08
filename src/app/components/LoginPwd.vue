<template>
	<div class="login-pwd">
		<div class="form-item-wrapper">
			<input type="text" placeholder="邮箱/手机号码/小米ID" class="account" v-model="loginInfo.account">
		</div>
		<div class="form-item-wrapper">
			<input type="password" placeholder="密码" class="pwd" v-model="loginInfo.pwd">
		</div>
		<button class="btn-pwd" @click="login">登录</button>
	</div>
</template>

<script type="text/ecmascript-6">
	import Cookies from 'js-cookie';

        export default {
                data: function() {
                        return {
                                loginInfo: {
                                        account: '',
                                        pwd: ''
                                }
                        };
                },
                methods: {
                        login: function() {
                                this.$http({
                                        method: 'post',
                                        url: '/login/pwd',
                                        data: this.loginInfo
                                })
                                        .then(data => this.$router.replace(Cookies.get('target') || '/'));
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.form-item-wrapper
		display: flex
		border-bottom: 1px solid #d3d3d3
		height: 1.1rem
		input
			flex-grow: 1
			border: none
			outline: none
			font-size: 0.24rem
	button[class^=btn]
		width: 100%
		height: 0.7rem
		background: #e4bb7e
		color: white
		line-height: 0.7rem
		border: none
		outline: none
		font-size: 0.32rem
		border-radius: 0.5rem
		margin: 0.4rem 0
		box-shadow: 0 4px 2px #f1eadf
	label
		font-size: 0.32rem
		align-self: center
		padding-right: 0.1rem
		color: #9b9b9b
</style>