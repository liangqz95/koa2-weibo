/**
 * @description 广场 API 路由
 * @author lqz
 */

const router = require('koa-router')();
const {loginCheck} = require('../../middlewares/loginChecks');
const { getSquareBlogList } = require('../../controller/blog-square');
const { getBlogListStr } = require('../../utils/blog');

router.prefix('/api/square');

router.get("/loadMore/:pageIndex", loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params;
    pageIndex = parseInt(pageIndex);
    const result = await getSquareBlogList(pageIndex);

    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList);

    ctx.body = result
});

module.exports = router;