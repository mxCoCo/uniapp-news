<template>
	<view class="scroll-content">
		<scroll-view class="scroll-list" scroll-y="true" >
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	
	.scroll-content {
		width: 100%;
		height: 100%;
		flex: 1;
		overflow: hidden;
		.scroll-list {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

</style>