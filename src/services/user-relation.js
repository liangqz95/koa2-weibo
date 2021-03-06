/**
 * @description  用户关系 service
 * @author lqz
 */

const {UserRelation, User} = require('../db/model/index');
const { formatUser } = require('./_format');
const sequelize = require('sequelize');

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param followerId
 * @returns {Promise<void>}
 */
async function getUsersByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes : ['id', 'userName', 'nickName', 'picture'],
        order : [
            ['id', 'desc']
        ],
        include : [
            {
                model : UserRelation,
                where : {
                    followerId,
                    userId : {
                        [sequelize.Op.ne] : followerId
                    }
                }
            }
        ]
    });
    let userList = result.rows.map(row => row.dataValues);
    userList = formatUser(userList);
    return {
        count : result.count,
        userList
    }
}

/**
 * 获取关注人列表
 * @param userId
 * @returns {Promise<void>}
 */
async function getFollowersByUser(userId){
    const result = await UserRelation.findAndCountAll({
        order  : [
            ['id', 'desc']
        ],
        include : [
            {
                model : User,
                attributes : ['id', 'userName', 'nickName', 'picture']
            }
        ],
        where : {
            userId,
            followerId : {
                [sequelize.Op.ne] : userId
            }
        }
    });
    let userList = result.rows.map(row => row.dataValues);

    userList = userList.map(item => {
        let user = item.user.dataValues;
        user = formatUser(user);
        return user
    });
    return {
        count : result.count,
        userList
    }
}

/**
 * 添加关注关系
 * @param userId
 * @param followerId
 * @returns {Promise<void>}
 */
async function addFollower(userId, followerId){
    const result = await UserRelation.create({
       userId,
       followerId
    });
    return result.dataValues
}

/**
 * 删除关注关系
 * @param userId
 * @param followerId
 * @returns {Promise<boolean>}
 */
async function deleteFollower(userId, followerId){
    const result = await UserRelation.destroy({
        where : {
            userId,
            followerId
        }
    });
    return result > 0
}

module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowersByUser
};