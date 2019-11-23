const sequelize = require('sequelize');
const {isProd, isTest} = require('../utils/env');
const { MYSQL_CONF } = require('../conf/db');
const {host, user, password, database} = MYSQL_CONF;

const conf = {
    host,
    dialect: 'mysql'
};

if (isProd){
    conf.pool = {
        max: 5,  //连接池最大
        min: 0,  // 最小
        idle: 10000  // 连接池10s没有使用则释放
    };
}

if (isTest){
    conf.logger = () => {}
}

const seq = new sequelize(database, user, password, conf);

// 测试连接
// seq.authenticate().then(() => {
//     console.log("哈哈哈")
// }).catch(() => {
//     console.log("err")
// });

module.exports = seq;