<template>
	<swiper @change="changeSwiper" :current="swiperIndex" class="home-swiper" :class="{swiperHeight:weixinSwiperHeight}">
		<swiper-item v-for="(value, key, index) in swiperObj" :key="index">
			<scroll-list class="list-scroll">
				<list-card v-for="(item, ind) in value" :key="ind" :item="item"></list-card>
			</scroll-list>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				weixinSwiperHeight: false,// 兼容微信小程序 swiper高度
			}
		},
		props: {
			swiperObj:{
				type:Object,
				default(){
					return {}
				}
			},
			swiperIndex: {
				type: Number,
				default:0
			}
		},
		created() {
			//兼容微信小程序 swiper高度
			//#ifndef H5||APP-PLUS||MP-ALIPAY
			this.weixinSwiperHeight = true
			//#endif
		},
		methods: {
			//swiper变化事件
			changeSwiper (e) {
				const {current} = e.detail
				this.$emit('changeSwiper',current)
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		width: 100%;
		&.swiperHeight {
			height: 100%;
		}
		
		.swiper-item {
			height: 100%;
			overflow: hidden;

			.list-scroll {
				height: 100%;
			}
		}
	}
</style>