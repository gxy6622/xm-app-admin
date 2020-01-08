<template>
	<div>
		<slot name="a3"></slot>
		这是子组件。
		<span v-text="aProp"></span>
		<slot></slot>
		<span>可以放在任意位置</span>
		<slot name="a1"></slot>
		<span>可以放在任意位置</span>
		<slot name="a2"></slot>
		<slot name="a4" :key1="name" :key2="age"></slot>

	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                data() {
                        return {
                                name: '张三',
	                        age: 20
                        }
                },
                props: ['aProp'],
	        created() {
                        this.$emit('aaa')
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<!--<slot name="a5" :key1="name" :key2="age"></slot>-->