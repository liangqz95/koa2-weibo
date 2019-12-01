/**
 * @description  user view 路由
 * @author lqz
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginChecks');

/**
 * 获取登录信息
 * @param ctx
 */
function getLoginInfo(ctx){
    let data = {
        isLogin : false
    };
    const userInfo = ctx.session.userInfo;
    if (userInfo){
        data = {
            isLogin: true,
            userName : userInfo.userName
        }
    }
    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx));
});

router.get("/register", async(ctx, next) => {
    await ctx.render("register", getLoginInfo(ctx));
});

router.get("/setting", loginRedirect,async(ctx, next) => {
    await ctx.render("setting" , ctx.session.userInfo);
});



module.exports = router;