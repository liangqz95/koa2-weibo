/**
 * @description 微博 @关系 controller
 * @author lqz
 */

const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../services/at-relation');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {PAGE_SIZE} = require('../conf/constants');

/**
 * 获取@我的微博数量
 * @returns {Promise<void>}
 */
async function getAtMeCount(userId) {
    const count = await getAtRelationCount(userId);
    return new SuccessModel({
        count
    })
}

/**
 * 获取@用户的微博列表
 * @param userId
 * @param pageIndex
 * @returns {Promise<void>}
 */
async function getAtMeBlogList(userId, pageIndex= 0){
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize : PAGE_SIZE
    });

    const {count, blogList} = result;

    return new SuccessModel({
        isEmpty : blogList.length === 0,
        blogList,
        pageIndex,
        pageSize : PAGE_SIZE,
        count
    })
}

/**
 * 标记为已读
 * @param userId
 * @returns {Promise<void>}
 */
async function markAsRead(userId){
    try {
        await updateAtRelation(
            {
                newIsRead : true
            },
            {
                userId,
                isRead : false
            }
        )
    }catch (err) {
        console.error(err)
    }
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
};