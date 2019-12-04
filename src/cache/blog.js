/**
 * @description 微博缓存
 * @author lqz
 */

const { get, set } = require('./_redis');
const { getBlogListByUser } = require('../services/blog');

const KEY_PREFIX = 'weibo:square:';

/**
 * 获取广场列表缓存
 * @param pageIndex
 * @param pageSize
 * @returns {Promise<void>}
 */
async function getSquareCacheList(pageIndex, pageSize){
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;

    // 尝试获取缓存
    const cacheResult = await get(key);
    if (cacheResult != null){
        // 获取成功
        return cacheResult
    }
    // 没有缓存则访问数据库
    const result = await getBlogListByUser({ pageIndex, pageSize });

    // 设置缓存过期时间 1min
    set(key, result, 60);

    return result
}

module.exports = {
    getSquareCacheList
};