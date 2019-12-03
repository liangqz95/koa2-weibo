/**
 * @description 数据格式化
 * @author lqz
 */

const { DEFAULT_PICTURE } = require('../conf/constants');
const { timeFormat } = require('../utils/dt');

/**
 * 用户默认头像
 * @param obj
 * @returns {{picture}|*}
 * @private
 */
function _formatUserPicture(obj) {
    if (obj.picture == null){
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化用户信息
 * @param list
 */
function formatUser(list) {
    if (list == null){
        return list
    }

    if (list instanceof Array){
        // 数组 用户列表
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(list)
}

/**
 * 格式化微博时间
 * @param obj
 * @private
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt);
    obj.updatedAtFormat = timeFormat(obj.updatedAt);
    return obj
}

/**
 * 格式化微博信息
 * @param list
 */
function formatBlog(list){
    if (list == null) {
        return list
    }

    if (list instanceof Array){
        // 数组
        return list.map(_formatDBTime)
    }
    // 对象
    return _formatDBTime(list)
}

module.exports = {
    formatUser,
    formatBlog
};