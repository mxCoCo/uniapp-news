<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//请求接口，异步
			this.$api.get_user({
				user_id: '5f505cac1c6fe20001b65e86'
			}).then(res => {
				const {
					data
				} = res
				
				this.$store.dispatch('set_userinfo',data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("@/components/u-parse/u-parse.css");
</style>
