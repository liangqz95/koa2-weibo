/**
 * @description 用户关系 controller
 * @author lqz
 */

const { getUsersByFollower } = require('../services/user-relation');
const { SuccessModel, ErrorModel } = require('../model/ResModel');

/**
 * 根据 userID 获取粉丝列表
 * @param userId
 * @returns {Promise<void>}
 */
async function getFans(userId) {
 const {count, userList} = await getUsersByFollower(userId);

 return new SuccessModel({
   fansList : userList,
   count
 })
}

module.exports = {
  getFans
};