'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id
	} = event
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	const res = await db.collection('article').aggregate().addFields({
		is_like: $.in(['$_id', article_likes_ids])
	}).project({ //把指定的字段传递给下一个流水线
		content: false, //不去传递
	}).end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功！',
		data: res.data
	}
};
