<template>
	<div>
		这是父组件
		<Child :a-prop="name" @aaa="aaaHandler">
			<div>这是默认插槽的一段html内容</div>
			<div slot="a1">这是具名插槽a1的一段html内容</div>
			<div slot="a2">这是具名插槽a2的一段html内容</div>
			<div slot="a3">这是具名插槽a3的一段html内容</div>
			<div slot="a4" slot-scope="{ key1, key2 }">
				<a href="">
					<span v-text="key1"></span>
					<span v-text="key2"></span>
				</a>
			</div>


		</Child>
	</div>
</template>

<script type="text/ecmascript-6">
	import Child from './Child.vue';

        export default {
                components: { Child },
                data() {
                        return {
                                name: 'Hello Vue'
                        }
                },
	        methods: {
                        aaaHandler() {
                                console.log('子组件发射了aaa事件，且被父组件捕获..')
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<!--<div slot="a5" slot-scope="aa">-->
<!--<a href="">-->
<!--<span v-text="aa.key1"></span>-->
<!--<span v-text="aa.key2"></span>-->
<!--</a>-->
<!--</div>-->