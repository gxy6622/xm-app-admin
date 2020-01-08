<template>
	<div>
		<el-button class="btn-collapse"
		        :icon="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
			@click="isCollapse = !isCollapse" >
		</el-button>
		<el-menu class="mi-menu" :collapse="isCollapse"
		        :default-active="$store.state.tab.activeName"
			background-color="#303133"
			text-color="#fff"
			active-text-color="#ff7a4d"
			@select="selectHandler">
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-setting"></i>
					<span>设置</span>
				</template>
				<el-menu-item index="password">
					<i class="el-icon-edit-outline"></i>
					<span slot="title">密码设置</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-menu"></i>
					<span>分类</span>
				</template>
				<el-menu-item index="category">
					<i class="el-icon-edit-outline"></i>
					<span slot="title">商品分类管理</span>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-goods"></i>
					<span>商品</span>
				</template>
				<el-menu-item index="product">
					<i class="el-icon-edit-outline"></i>
					<span slot="title">商品信息管理</span>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                data() {
                        return {
                                isCollapse: false               //标识当前菜单是否处于收缩状态
                        };
                },
	        methods: {
                        selectHandler(index) {
                                //把index值放入仓库中
	                        this.$store.commit('tab/addTab', index);
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.btn-collapse
		color: #fff
		background-color: #ff7a4d
		border: none
		font-weight: bolder
		margin: 13px 9px
	.mi-menu:not(.el-menu--collapse)
		width: 300px
		border-right: none
		.el-menu-item
			padding-left: 70px !important
</style>