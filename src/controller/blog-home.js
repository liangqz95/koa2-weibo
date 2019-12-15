/**
 * @description  首页 controller
 * @author lqz
 */

const xss = require('xss');
const { createBlog, getBlogListByUser } = require('../services/blog');
const {SuccessModel, ErrorModel} = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorInfo');
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constants');
const { getUserInfo } = require('../services/user');
const { createAtRelation } = require('../services/at-relation');

/**
 * 创建微博
 * @param userId
 * @param content
 * @param image
 * @returns {Promise<void>}
 */
async function create({userId, content, image}) {
  // 分析并收集 content 中的 @用户
  // content 格式 @张三 - zhangsan
  const atUserNameList = [];
  content = content.replace(
      REG_FOR_AT_WHO,
      (matchStr, nickName, userName) => {
        // 获取用户名
        atUserNameList.push(userName);
        return matchStr
      }
  );

  // 根据@用户名，获取用户信息
  const atUserList = await Promise.all(
      atUserNameList.map(userName => getUserInfo(userName))
  );

  // 根据用户信息获取用户ID
  const atUserIdList = atUserList.map(user => user.id);

  try {
      // 创建微博
    const blog = await createBlog({
      userId,
      content : xss(content),
      image
    });

    // 创建＠关系
    await Promise.all(atUserIdList.map(
        userId => createAtRelation(blog.id, userId)
    ));

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