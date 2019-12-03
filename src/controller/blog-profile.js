/**
 * @description 个人主页 controller
 * @author lqz
 */

const { getBlogListByUser } = require('../services/blog');
const { PAGE_SIZE } = require("../conf/constants");
const { SuccessModel, ErrorModel } = require('../model/ResModel');

/**
 * 获取个人主页微博列表
 * @param userName
 * @param pageIndex
 * @returns {Promise<void>}
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize : PAGE_SIZE
  });
  const blogList = result.blogList;

  // 拼接返回数据
  return new SuccessModel({
    isEmpty : blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count : result.count
  })
}

module.exports = {
  getProfileBlogList
};