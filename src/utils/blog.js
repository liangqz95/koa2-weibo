/**
 * @description 微博数据相关的工具方法
 * @author lqz
 */

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

// 获取blog-list.ejs的文件内容
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString();

/**
 * 根据 blogList 渲染出HTML字符串
 * @param blogList
 * @param canReply
 * @returns {*}
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = {
  getBlogListStr
};