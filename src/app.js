const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const path = require('path');
const koaStatic = require('koa-static');

// 路由
const errorViewRouter = require('./routes/view/error');
//const index = require('./routes/index');
const userViewRouter = require('./routes/view/user');
const userApiRouter = require('./routes/api/user');
const utilsApiRouter = require('./routes/api/utils');
const blogViewRouter = require('./routes/view/blog');
const homeApiRouter = require('./routes/api/blog-home');
const profileApiRouter = require('./routes/api/blog-profile');
const squareApiRouter = require('./routes/api/blog-square');
const atMeApiRouter = require('./routes/api/blog-at');

const { REDIS_CONF } = require('./conf/db');
const { isProd } = require('./utils/env');
const { SESSION_SECRET_KEY } = require('./conf/secretKeys');
// const jwt = require('koa-jwt');
// const { secret } = require("./conf/constants");

// error handler
 let onerrorConf = {};
 if (isProd) {
   onerrorConf = {
     redirect : "/error"
   };
 }
onerror(app, onerrorConf);

 // app.use(jwt({
 //   secret : secret
 // }).unless({
 //   path : [/^\/users\/login/]
 // }));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(koaStatic(__dirname + '/public'));
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

 // session 配置
app.keys = [SESSION_SECRET_KEY];
app.use(session({
  key : 'weibo.sid',
  prefix : 'weibo:sess:',
  cookie : {
    path : '/',
    httpOnly : true,
    maxAge : 24*60*60*1000
  },
  ttl : 24*60*60*1000,
  store : redisStore({
    all : `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}));

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
//app.use(index.routes(), index.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods());
app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods());
app.use(homeApiRouter.routes(), homeApiRouter.allowedMethods());
app.use(profileApiRouter.routes(), profileApiRouter.allowedMethods());
app.use(squareApiRouter.routes(), squareApiRouter.allowedMethods());
app.use(atMeApiRouter.routes(), atMeApiRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
