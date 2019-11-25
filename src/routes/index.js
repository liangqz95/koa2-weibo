const router = require('koa-router')();
const { loginRedirect, loginCheck } = require('../middlewares/loginChecks');

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: "我爱你",
    isSave: true,
    blogs: [
      {
        id: 1,
        title : "aaa"
      },
      {
        id: 2,
        title: "bbb"
      },
      {
        id: 3,
        title: "ccc"
      }
    ]
  })
});

router.get('/string', loginCheck, async (ctx, next) => {
  ctx.body = 'koa2 string'
});

router.get('/json', loginRedirect, async (ctx, next) => {
  // const session = ctx.session;
  // if (session.viewNum == null){
  //   session.viewNum = 0
  // }
  //session.viewNum++;
  ctx.body = {
    title: 'koa2 json',
    // viewNum: session.viewNum
  }
});

router.get('/profile/:userName/:num', async(ctx, next) => {
  const {userName} = ctx.params;
  const {num} = ctx.params;
  ctx.body = {
    title: 'this is profile page',
    userName,
    num
  }
});

module.exports = router;
