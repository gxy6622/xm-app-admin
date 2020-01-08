<template>
	<div>
		商品详情页
		<a @click.prevent="$router.back()">后退</a>
		<div class="banner" ref="banner">
			<ul>
				<li style="background-color: red">第一页</li>
				<li style="background-color: blue">第二页</li>
				<li style="background-color: green">第三页</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import imagesLoaded from 'imagesloaded';

        export default {
		methods: {
		        initOrUpdateBannerScroll() {
		                imagesLoaded(this.$refs.banner, () => {
                                        this.$nextTick(() => {
                                                if(!this.bannerScroll) {
                                                        this.bannerScroll = new BScroll(this.$refs.banner, {
                                                                scrollX: true,
                                                                scrollY: false,
                                                                momentum: false,                //关闭better-scroll的惯性滚动
                                                                snap: {
                                                                        loop: true,                     //开启无缝滚动
                                                                        threshold: 0.2                //触发滚动的临界距离
                                                                }
                                                        });
                                                        this.bannerScroll.on('scrollStart', () => clearTimeout(this.timer));
                                                        this.bannerScroll.on('scrollEnd', () => this.timer = setTimeout(() => this.bannerScroll.next(), 3000));
                                                        this.timer = setTimeout(() => this.bannerScroll.next(), 3000);
                                                }

                                        });
		                })
			}
		},
	        updated() {},
//	        componentDidMount() {//五张图片左右方向无缝轮播
//		        this.scroll = new IScroll(this.wrapperDom, (
//		                scrollX: true,
//		                scrollY: false,
//		                click: true,
//		                momentum: false,
//		                snap: true
//		        ));
//		        this.scroll.on('scrollStart', () => {
//		                clearTimeout(this.timer);
//		        });
//		        this.scroll.on('scrollEnd', () => {//6,1,5根据实际情况的图片长度计算
//		                if(this.scroll.currentPage.pageX === 6) this.scroll.goToPage(1,0,0);
//                                if(this.scroll.currentPage.pageX === 0) this.scroll.goToPage(5,0,0);
//		                this.timer = setTimeout(() => this.scroll.next(), 5000);
//		        });
//		        this.scroll.goToPage(1,0,0);    //默认显示第一张
//		        this.timer = setTimeout(() => this.scroll.next(), 5000);
//	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.banner
		width: 100%
		height: 300px           /*让页面不变形，不会抖动*/
		overflow: hidden
		ul
			width: 500%
			height: 100%
			li
				width: 20%
				height: 100%
				float: left
</style>