/**
 * @description 用户关系 controller
 * @author lqz
 */

const {getUsersByFollower, addFollower, deleteFollower} = require('../services/user-relation');
const {SuccessModel, ErrorModel} = require('../model/ResModel');
const {addFollowerFailInfo, deleteFollowerFailInfo} = require('../model/ErrorInfo');

/**
 * 根据 userID 获取粉丝列表
 * @param userId
 * @returns {Promise<void>}
 */
async function getFans(userId) {
    const {count, userList} = await getUsersByFollower(userId);

    return new SuccessModel({
        fansList: userList,
        count
    })
}

/**
 * 关注
 * @param myUserId
 * @param curUserId
 * @returns {Promise<void>}
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId);
        return new SuccessModel()
    } catch (e) {
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 取消关注
 * @param myUserId
 * @param curUserId
 * @returns {Promise<void>}
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId);
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
    getFans,
    follow,
    unFollow
};