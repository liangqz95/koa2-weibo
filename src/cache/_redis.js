/**
 * @description 操作Redis的方法
 * @author lqz
 */

const redis = require("redis");

const {REDIS_CONF} = require('../conf/db');

// 创建客户端
const redisCli = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisCli.on('error', err => {
   console.error("redis error", err)
});

/**
 * redis set
 * @param key 键
 * @param val 值
 * @param timeout 过期时间，单位s
 */
function set(key, val, timeout = 60*60){
    if (typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisCli.set(key, val)
    redisCli.expire(key, timeout)
}

/**
 * redis get
 * @param key 键
 */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisCli.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null){
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            }catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}