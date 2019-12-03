/**
 * @description 时间工具函数
 * @author lqz
 */

const { format } = require('date-fns');

/**
 * 格式化时间
 * @param str
 * @returns {string}
 */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:MM')
}

module.exports = {
    timeFormat
};