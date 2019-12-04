/**
 * @description  微博 view 路由
 * @author lqz
 */

const {getSquareBlogList} = require("../../controller/blog-square");
const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { isExist } = require('../../controller/user');

router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {});
});

router.get('/profile', loginRedirect, async(ctx, next) => {
    const { userName } = ctx.session.userInfo;
    ctx.redirect(`/profile/${userName}`);
});

router.get('/profile/:userName', loginRedirect, async(ctx, next) => {

    const myUserInfo = ctx.session.userInfo;
    const myUserName = myUserInfo.userName;

    let curUserInfo;
    const {userName : curUserName} = ctx.params;
    const isMe = myUserName === curUserName;
    if (isMe){
        curUserInfo = myUserInfo
    }else {
        const existResult = await isExist(curUserName);
        if (existResult.errno !== 0){
            return
        }
        curUserInfo = existResult.data;
    }

    // 获取微博首页数据
    const result = await getProfileBlogList(curUserName, 0);
    const {isEmpty, blogList, pageSize, pageIndex, count} = result.data;

    await ctx.render("profile" ,{
        blogData : {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData : {
            userInfo : curUserInfo,
            isMe
        }
    });
});

router.get("/square", loginRedirect, async(ctx, next) => {
    // 获取第一页微博数据
    const result = await getSquareBlogList(0);
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data;
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    });
});

module.exports = router;