<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏-不同设备状态栏高度不一样 -->
			<!-- #ifndef MP-ALIPAY -->
			<view :style="{height:statusBarHeight+'px'}"></view>
			<!-- #endif -->
			<!-- 导航栏 -->
			<view class="navbar-content"  @click.stop="open" :class="{search:isSearch}" :style="{height:navbarHeight+'px',width:navbarWidth+'px'}">
				<view  v-if="isSearch" class="navbar_content_search_icons" @click="backIndex">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view  v-if="!isSearch" class="navbar-search" :style="{height:navbarSearchHeight+'px'}">
					<view class="navbar-search-icon">
						<uni-icons type="search" color="#999"></uni-icons>
						<!-- <text class="iconfont icon-sousuo"></text> -->
					</view>
					<view class="navbar-search-text">uni-app、vue</view>
				</view>
				<view v-else class="navbar-search" :style="{height:navbarSearchHeight+'px'}">
					<!-- 搜索页面显示 -->
					<input class="navbar-search_text" type="text" v-bind:value="val" placeholder="请输入您要搜索的内容" @input="inputChange" />
						<!-- <input class="navbar-search_text" type="text" v-model="val"
					  placeholder="请输入您要搜索的内容" />{{val}} -->
				</view>
			</view>
		</view>
		<view :style="{height:statusBarHeight+navbarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,//手机顶部默认状态栏高度 [微信小程序:20px]
				navbarHeight: 45, // 导航栏高度 [微信小程序(胶囊高度):40px(包含上下间距4px)]
				navbarWidth: 375, // 导航栏宽度 [微信小程序(胶囊距离左边距离):278px]
				navbarSearchHeight: 30, // 导航栏搜索框高度 [微信小程序(胶囊本身高度):32px]
				val: ''
			}
		},
		props: {
			isSearch: { //判断这个组件是在搜索页还是在首页
				type: Boolean,
				default: false
			},
			value:{
				type:[String,Number],
				default:''
			}
		},
		watch:{
			value(newVal){
				this.val=newVal
			}
		},
		created() {
			// 获取手机系统信息
			const systemInfo = uni.getSystemInfoSync()
			// console.log(systemInfo)
			//设置状态栏高度
			this.statusBarHeight = systemInfo.statusBarHeight
			this.navbarWidth = systemInfo.windowWidth
			
			//获取胶囊的位置
			//#ifndef H5||APP-PLUS||MP-ALIPAY
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.navbarSearchHeight = menuButtonInfo.height
			this.navbarWidth = menuButtonInfo.left
			this.navbarHeight = menuButtonInfo.height + (menuButtonInfo.top-systemInfo.statusBarHeight) * 2
			// console.log(menuButtonInfo)
			//#endif
			
			//#ifdef MP-ALIPAY
			this.statusBarHeight=0
			//#endif
			
			// 触发,告诉tab栏距离顶部固定定位的高度
			this.$emit('tab-top',this.statusBarHeight+this.navbarHeight)
			
		},
		methods: {
			open () {
				if (this.isSearch) return
				uni.navigateTo({
					url: '/pages/home-search/home-search'
				})
			},
			inputChange(e) {
				const {
					value
				} = e.detail
				//input 是子组件中的input
				this.$emit('input', value)
			},
			backIndex(){
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import  '@/common/css/icons.css';
	
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $mk-base-color;
			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
				box-sizing: border-box;
				height: 45px;
				.navbar-search {
					width: 100%;
					padding: 0 10px;
					display: flex;
					align-items: center;
					height: 30px;
					border-radius: 30px;
					background-color: #fff;
					.navbar-search-icon {
						margin-right: 10px;
					}
					.navbar-search-text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}
				&.search {
					padding-left: 0;
				
					.navbar_content_search_icons {
						margin-left: 10px;
						margin-right: 10px;
					}
				
					.navbar-search {
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>
