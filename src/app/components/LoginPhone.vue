<template>
	<div class="login-phone">
		<div class="form-item-wrapper">
			<label for="">+86&gt;</label>
			<input type="tel" placeholder="手机号码" class="phone" v-model="loginInfo.phone">
		</div>
		<div class="form-item-wrapper">
			<input type="text" placeholder="短信验证码" class="code2" v-model="loginInfo.code">
			<button class="code" v-text="code" @click="getCode"></button>
		</div>
		<button class="btn-phone" @click="login">立即登录/注册</button>
	</div>
</template>

<script type="text/ecmascript-6">
	import Cookies from 'js-cookie';

        export default {
                data: function() {
                        return {
                                loginInfo: { phone: '', code: '' },
                                code: '获取验证码'
                        };
                },
                methods: {
                        getCode: function() {
                                this.$http({ url: '/login/getcode' })
                                        .then(data => this.code = data);
                        },
                        login: function() {
                                if(this.code !== this.loginInfo.code.toUpperCase()) {
                                        this.$store.commit('alert/open', '验证码错误...')
                                        return;
                                }
                                this.$http({
                                        method: 'post',
                                        url: '/login/phone',
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
	button.code
		flex-shrink: 0
		width: 1.4rem
		white-space: nowrap
		border: none
		outline: none
		background: #fff
		color: #c49c63
		font-size: 0.24rem
	label
		font-size: 0.32rem
		align-self: center
		padding-right: 0.1rem
		color: #9b9b9b
</style>