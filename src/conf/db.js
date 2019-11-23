/**
 * @description 存储配置
 * @author lqz
 */

 const {isProd, isTest} = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
};

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'koa2_weibo'
};

if (isProd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    };
    
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'koa2_weibo'
    };
}


module.exports = {
    REDIS_CONF,
    MYSQL_CONF
};