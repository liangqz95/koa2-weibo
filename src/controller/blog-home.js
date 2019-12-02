/**
 * @description  首页 controller
 * @author lqz
 */

const xss = require('xss');
const { createBlog } = require('../services/blog');
const {SuccessModel, ErrorModel} = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorInfo');

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

module.exports = {
  create
};