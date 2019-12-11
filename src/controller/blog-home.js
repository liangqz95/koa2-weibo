/**
 * @description  首页 controller
 * @author lqz
 */

const xss = require('xss');
const { createBlog, getBlogListByUser } = require('../services/blog');
const {SuccessModel, ErrorModel} = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorInfo');
const { PAGE_SIZE } = require('../conf/constants');

/**
 * 创建微博
 * @param userId
 * @param content
 * @param image
 * @returns {Promise<void>}
 */
async function create({userId, content, image}) {
  try {
      // 创建微博
    const blog = await createBlog({
      userId,
      content : xss(content),
      image
    });
    return new SuccessModel(blog)
  }catch (e) {
    console.error(e.message, e.stack);
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param userId
 * @param pageIndex
 * @returns {Promise<void>}
 */
async function getHomeBlogList(userId, pageIndex=0){
  const result = await getBlogListByUser({
    userId,
    pageIndex,
    pageSize : PAGE_SIZE
  });
  const { count, blogList } = result;

  return new SuccessModel({
    isEmpty : blogList.length === 0,
    blogList,
    pageIndex,
    pageSize : PAGE_SIZE,
    count
  })
}

module.exports = {
  create,
  getHomeBlogList
};