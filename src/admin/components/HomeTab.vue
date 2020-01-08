<template>
	<el-tabs type="card" closable
	        :value="activeName"
	        @tab-click="(tab) => toggleTab(tab.name)"
		@tab-remove="removeTab">
		<el-tab-pane v-for="item in list" :key="item" :name="item">
			<span slot="label"><i class="el-icon-edit-outline"></i>&nbsp;{{ tabMap[item].label }}</span>
			<component :is="tabMap[item].component"></component>
		</el-tab-pane>
		<!--<el-tab-pane name="?">-->
			<!--<span slot="label"><i class="el-icon-edit-outline"></i>&nbsp;密码修改</span>-->
		<!--</el-tab-pane>-->
		<!--<el-tab-pane name="??">-->
			<!--<span slot="label"><i class="el-icon-edit-outline"></i>&nbsp;商品分类管理</span>-->
		<!--</el-tab-pane>-->
		<!--<el-tab-pane name="???">-->
			<!--<span slot="label"><i class="el-icon-edit-outline"></i>&nbsp;商品信息管理</span>-->
		<!--</el-tab-pane>-->
	</el-tabs>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	import TabPassword from './TabPassword.vue';
	import TabCategory from './TabCategory.vue';
	import TabProduct from './TabProduct.vue';
	let { mapState, mapMutations } = createNamespacedHelpers('tab');

        export default {
	        data() {
                        return {
                                tabMap: {
                                        password: { label: '密码修改', component: TabPassword },
                                        category: { label: '商品分类管理', component: TabCategory },
                                        product: { label: '商品信息管理', component: TabProduct }
                                }
		        };
	        },
	        computed: {
		        ...mapState([ 'list', 'activeName' ])
	        },
	        methods: mapMutations([ 'toggleTab', 'removeTab' ])             //只有映射的结果，可以不要...和{}。
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>