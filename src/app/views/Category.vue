<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="logo">
				<img src="../assets/images/navi_title_v4.png" alt="">
			</div>
			<div class="search">
				<img src="../assets/images/search.png" alt="">
				<span>有品心动卡</span>
			</div>
			<div class="message">
				<img src="../assets/images/std_titlebar_home_message.png" alt="">
			</div>
		</div>
		<div class="content">
			<div class="left" ref="left">
				<ul class="category-main" v-if="mainList.length > 0">
					<li v-for="item in mainList" :key="item.id"
					    :class="{ active: item.id === curCid }"
					    @click="initSubLists(item.id)">
						<span v-text="item.name"></span>
					</li>
				</ul>
			</div>
			<div class="right" ref="right">
				<div>
					<div class="avatar-wrapper" v-if="avatar">
						<img :src="avatar" alt="" class="avatar">
					</div>
					<ul class="category-sub" v-if="subList.length > 0">
						<li v-for="item in subList" :key="item.id">
							<router-link :to="`/list/${ curCid }/${ item.id }`">
								<img :src="item.avatar" />
								<span v-text="item.name"></span>
							</router-link>
						</li>
					</ul>
					<p v-else>暂无二级分类，敬请期待</p>
				</div>
			</div>
		</div>
		<div class="footer">
			<MiNav></MiNav>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import imagesLoaded from 'imagesloaded';
	import MiNav from '../components/MiNav.vue';
	import { createNamespacedHelpers } from 'vuex';        //map映射到此组件中

	let{ mapState, mapGetters, mapActions } = createNamespacedHelpers('category');  //映射category子仓库

        export default {
                components: { MiNav },
                //将data中的数据进行简单计算得出页面需要的一个新的data（计算属性）
                computed: {
	                ...mapState([ 'mainList', 'curCid' ]),
	                ...mapGetters([ 'subList' ]),
                        avatar(){
                                if(this.curCid === 0) return '';
                                else return this.mainList.find(item => item.id === this.curCid).avatar;
                        }
                },
                methods: {
	                ...mapActions([ 'initMainList', 'initSubLists' ]),
	                _initLeftScroll() { if(!this.leftScroll) this.leftScroll = new BScroll(this.$refs.left, { click: true }); },
	                _initAndRefreshRightScroll() {
                                imagesLoaded(this.$refs.right, () => {
                                        this.$nextTick(() => {   //better-scroll 默认的API，相当于setTimeout(() => {}, 19);
                                                if(!this.rightScroll) this.rightScroll = new BScroll(this.$refs.right, { click: true });
                                                else {
                                                        this.rightScroll.scrollTo(0, 0);
                                                        this.rightScroll.refresh();             //刷新better-scroll，防止右侧高度不一样只能看内容多的。
                                                }
                                        });
                                });
	                }
                },
                created: function(){
                        console.log('分类数据创建了..');
                        this.initMainList();   //组件调用仓库中的actions，用dispatch
                },
	        updated: function() {
                        this._initLeftScroll();
                        this._initAndRefreshRightScroll();
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.header
		height: 0.8rem
		flex-shrink: 0
		flex: none
		display: flex
		align-items: center
		div
			display: flex
			justify-content: center
			align-items: center
		.logo
			width: 1.52rem
			height: 0.56rem
			flex-direction: column
			img
				width: 1.28rem
				height: 0.56rem
		.search
			flex: 1
			background: rgb(238, 238, 238)
			border-radius: 1.5px
			height: 0.56rem
			img
				width: 0.26rem
				height: 0.26rem
				margin-left: 0.12rem
			span
				flex: 1
				font-size: 0.24rem
				color: #999
				margin-left: 0.12rem
		.message
			width: 0.8rem
			height: 0.56rem
			img
				width: 0.56rem
				height: 0.56rem
	.content
		flex: 1
		overflow: auto
		display: flex
		border-top: 1px solid #ccc
		border-bottom: 1px solid #ccc
		.left
			width: 1.5rem
			flex-shrink: 0
			border-right: 1px solid #ccc
			overflow: hidden
			li
				padding: 0.2rem 0;
				span
					display: block
					height: 0.48rem
					line-height: 0.48rem
					text-align: center
					color: rgb(51,51,51)
					border-left: 3px solid transparent
			li.active>span
				color: rgb(132,95,63)
				border-left-color: rgb(132,95,63)
		.right
			flex-grow: 1
			overflow: hidden
			li
				display: inline-block
				width: 33.333333%
				padding: 0 0.6rem 0 0.26rem
				box-sizing: border-box
				a
					display: block
					text-align: center
					color: #666
					img
						width: 100%
			.avatar-wrapper
				padding: 0.26rem 0.26rem 0 0.26rem
				img
					width: 100%
	.footer
		flex: none
</style>