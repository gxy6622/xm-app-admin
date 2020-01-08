<template>
	<div class="mi-alert" v-show="isShow">
		<div class="content">
			<h2>提&nbsp;示</h2>
			<p v-text="message"></p>
			<button @click="close">关闭</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';

	let { mapState, mapMutations } = createNamespacedHelpers('alert');
        export default {
		computed: mapState([ 'isShow', 'message' ]),
	        methods: mapMutations([ 'close' ])
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mi-alert
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		background-color: rgba(0,0,0,0.7)
		.content
			width: 60%
			height 25%
			position: absolute
			left: 50%
			top: 50%
			transform: translate(-50%, -50%)
			padding: 0.4rem 0.4rem
			background: #fff
			border-radius 0.1rem
			h2
				background: #fa3700
				text-align: center
				color white
				padding: 0.1rem 0
				font-weight  normal
				border-radius 0.1rem
			p
				padding-top: 0.2rem
				font-size 0.3rem
				text-indent 0.1rem
			button
				outline none
				border none
				position absolute
				bottom 2%
				left: 50%
				transform translateX(-50%)
				padding 0.1rem 0.2rem
				font-size 0.3rem
				border-radius 0.1rem
				background #ff3700
				color white
</style>