/**
 * @description 微博 @ 用户关系 service
 * @author lqz
 */

const { AtRelation, Blog, User } = require('../db/model/index');
const {formatUser, formatBlog} = require('./_format');

/**
 * 创建微博 @关系
 * @param blogId
 * @param userId
 * @returns {Promise<void>}
 */
async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId
    });
    return result.dataValues;
}

/**
 * 获取@用户的未读微博数量
 * @param userId
 * @returns {Promise<void>}
 */
async function getAtRelationCount(userId){
    const result = await AtRelation.findAndCountAll({
        where : {
            userId,
            isRead : false
        }
    });
    return result.count
}

/**
 * 获取@用户的微博列表
 * @param userId
 * @param pageIndex
 * @param pageSize
 * @returns {Promise<void>}
 */
async function getAtUserBlogList({userId, pageIndex, pageSize = 10}){
    const result = await Blog.findAndCountAll({
        include : [
            {
                model : AtRelation,
                attributes : ['userId', 'blogId'],
                where : {
                    userId
                }
            },
            {
                model : User,
                attributes : ['userName', 'nickName', 'picture']
            }
        ],
        limit : pageSize,
        offset : pageIndex * pageSize,
        order : [
            ["id", "desc"]
        ]
    });

    let blogList = result.rows.map(row => row.dataValues);
    blogList = formatBlog(blogList);
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues);
        return blogItem
    });

    return {
        count : result.count,
        blogList
    }
}

/**
 * 更新 atRelation
 * @param newIsRead
 * @param userId
 * @param idRead
 * @returns {Promise<void>}
 */
async function updateAtRelation({ newIsRead }, {userId, isRead}){
    const upDateData = {};
    if (newIsRead){
        upDateData.isRead = newIsRead
    }
    const whereData = {};
    if (isRead){
        whereData.isRead = isRead
    }
    if (userId){
        whereData.userId = userId
    }
    const result = await AtRelation.update(upDateData, {
        where : whereData
    });
    return result[0]>0
}

module.exports = {
  createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
};