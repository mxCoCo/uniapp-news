<template>
	<view class="tab">
		<scroll-view class="tab_scroll" scroll-x="true">
			<view class="tab_scroll_box">
				<view v-for="(item,index) in list" :key="index" class="tab_scroll_item" :class="{active:activeIndex===index}"
				 @click="clicktab(item,index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 图标不能滚动所以在scroll-view之外写 -->
		<view class="tab_icons" @click="openCollect">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
			}
		},
		watch:{
			tabIndex(newVal, oldVal) {
				if(newVal!=oldVal) {
					this.activeIndex = newVal
				}
			}
		},
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			tabIndex: {
				type: Number,
				default:0
			}
		},
		created() {

		},
		methods: {
			openCollect() {
				uni.navigateTo({
					url: '/pages/home-label/home-label'
				})
			},
			clicktab(item, index) {
				this.activeIndex = index
				this.$emit('tab', {
					data: item,
					index
				})
			}
		},
	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		background-color: white;
		border-bottom: 1px #f5f5f5 solid;
		width: 375px;
		box-sizing: border-box;

		.tab_scroll {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;

			.tab_scroll_box {
				display: flex;
				align-items: center;
				height: 45px;
				flex-wrap: nowrap; //控制tab_scroll_item的内容是否换行
				box-sizing: border-box;

				.tab_scroll_item {
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;

					&.active {
						color: $mk-base-color;
					}
				}
			}
		}

		.tab_icons {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;

			&::after {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>
