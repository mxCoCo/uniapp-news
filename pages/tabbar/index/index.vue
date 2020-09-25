<template>
	<view class="container">
		<navbar @tab-top="tabTop"></navbar>
		<tab class="tab-list" :style="{top:topHeight+'px'}" :tabIndex="tabIndex" :list="tabList" @tab="tabClick"></tab>
		<list class="home-list" @changeSwiper="changeSwiper" :swiperIndex="swiperIndex" :swiperObj="swiperObj"></list>
	</view>
</template>

<script>
	//统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。easycom将其精简为一步。 
	//只要组件安装在项目的components目录下，并符合components/组件名称/组件名称.vue目录结构。
	//就可以不用引用、注册，直接在页面中使用。
	// import navbar from '@/components/navbar/navbar'

	export default {
		data() {
			return {
				topHeight: 45,// tab选项卡距离顶部导航栏的高度
				tabIndex: 0,// tab选项卡选中的索引值
				tabList: [], // 头部标签栏数据列表
				swiperIndex: 0,// swiper轮播的索引值
				swiperObj: {}, // 文章数据列表[对象：key表示选项卡，value表示轮播文章列表数据]
			}
		},
		components: {},
		watch: {
			tabList (newValue, oldValue) {
				if(newValue != oldValue) {
					this.getList();
				}
			}
		},
		onLoad() {
			uni.$on('labelChange', (res) => {
				this.tabList=[]
				this.tabIndex=0
				this.swiperIndex=0
				this.getLabel()
			})
			this.getLabel();
		},
		created() {
			uni.$on('update_article', (res) => {
				this.tabList=[]
				this.tabIndex=0
				this.swiperIndex=0
				this.getLabel()
			})
		},
		methods: {
			// 获取头部标签栏数据
			getLabel() { 
				this.$api.get_label({
					user_id: '5f505cac1c6fe20001b65e86',
				}).then(res => {
					this.tabList = res.data
				})
			},
			// 获取头部标签栏数据
			getList() { 
				this.$api.get_list({
					user_id: '5f505cac1c6fe20001b65e86',
				}).then(res => {
					const list = res.data
					const swiperObj = {}
					this.tabList.forEach((tab,index) => {
						swiperObj[tab.name] = list.filter((item) => (item.classify == tab.name))
					})
					this.swiperObj = swiperObj
				})
			},
			// tab选项卡点击触发swiper联动
			tabClick(tab) {
				const {data, index} = tab
				this.swiperIndex = index
			},
			// tab选项卡距离顶部导航栏的高度
			tabTop (topHeight) {
				this.topHeight = topHeight
			},
			// swiper触发tab选项卡联动
			changeSwiper (tabIndex) {
				this.tabIndex = tabIndex
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.container {
		display: flex;
		flex-direction: column;
		flex: 1;
		.tab-list {
			position: fixed;
			top: 45px;
			left: 0;
			z-index: 1;
		}
		.home-list {
			margin-top: 46px;
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
