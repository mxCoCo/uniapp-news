<template>
	<view class="home">
		<navbar :isSearch="true" :value="searchValue" @input="change"></navbar>
		<view class="home-list">
			<view v-if="is_history" class="label_box">
				<view class="label_header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view v-if="historyLists.length>0" class="label-content">
					<view v-for="(item,index) in historyLists" class="label-content-item" :key="index" @click="openHistory(item)">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<scroll-list v-else class="list-scroll">
				<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
				<view v-if="searchList.length>0">
					<list-card @click="setHistory" :item="item" v-for="(item,index) in searchList" :key="item._id">
					</list-card>
				</view>
				<view v-if="searchList.length===0&&!loading" class="no-data">
					没有搜到相关数据
				</view>
			</scroll-list>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				loading: false,
				is_history: true,
				searchList: [],
				searchValue: '',
				searchTimer: null,
			}
		},
		computed: {
			...mapState(['historyLists'])
		},
		watch: {
			searchValue(newVal, oldVal) {
				if (newVal != oldVal) {
					if (this.searchTimer) {
						clearTimeout(this.searchTimer)
					}
					this.searchTimer = setTimeout(() => {
						this.getSearch(newVal)
					}, 2000)
				}
			}
		},
		methods: {
			change(value) {
				this.searchValue = value
			},
			getSearch(val) {
				if (!val) {
					this.searchList = []
					this.is_history = true
					return
				}
				this.is_history = false
				this.loading = true
				this.$api.get_search({
					user_id: '5f505cac1c6fe20001b65e86',
					value: val
				}).then(res => {
					const {
						data
					} = res
					this.is_history = false
					this.loading = false
					this.searchList = data
				}).catch(() => {
					this.loading = false
				})
			},
			clear() {
				this.$store.dispatch('clear_history_list')
				uni.showToast({
					title: '清空完成'
				})
			},
			setHistory() {
				this.$store.dispatch('set_history', {
					name: this.searchValue
				})
			},
			openHistory(item) {
				this.searchValue = item.name
				this.getSearch(this.searchValue)
			},
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
		background-color: #f5f5f5;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;

		.label_box {
			background-color: #fff;

			margin-bottom: 10px;

			.label_header {
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				color: #666;
				padding: 10px 15px;
				// border-bottom: 1px #f5f5f5 solid;

				.label-title {
					color: $mk-base-color;
				}

				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}

			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content-item {
					padding: 2px 10px;
					margin-top: 12px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
					margin-right: 10px;
					border-radius: 5px;
				}

			}
		}
	}

	.no-data {
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		color: #666;
		font-size: 12px;
	}
</style>
