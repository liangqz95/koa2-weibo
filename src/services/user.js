/**
 * @description user service
 * @author lqz
 */

const { User } = require('../db/model/index');
const { formatUser } = require('./_format');

/**
 * 获取用户信息
 * @param userName
 * @param password
 * @returns {Promise<void>}
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    };
    if (password){
      Object.assign(whereOpt, {password})
    }

    // 查询
    const result = await User.findOne({
        attributes : ['id', 'userName', 'nickName', 'picture', 'city'],
        where : whereOpt
    });

    if (result == null){
       // 没找到
       return result
    }

    // 格式化
    return formatUser(result.dataValues)
}

/**
 * 创建用户
 * @param userName
 * @param password
 * @param gender
 * @param nickName
 * @returns {Promise<void>}
 */
async function createUser({userName, password, gender = 3, nickName}){
    const result = await User.create({
        userName,
        password,
        gender,
        nickName : nickName ? nickName : userName
    });

    return result.dataValues
}

/**
 * 删除用户
 * @param userName
 * @returns {Promise<void>}
 */
async function deleteUser(userName){
    const result = await User.destroy({
        where : {
            userName
        }
    })
    // result 删除的行数
    return result > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser
};