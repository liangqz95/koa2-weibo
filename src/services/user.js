/**
 * @description user service
 * @author lqz
 */

const { User } = require('../db/model/index');
const { formatUser } = require('./_format');
const { addFollower } = require('./user-relation');

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

    const data = result.dataValues;

    // 自己关注自己，为了方便首页获取数据
    addFollower(data.id, data.id);

    return data
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
    });
    // result 删除的行数
    return result > 0
}

/**
 * 更新用户信息
 * @param newPassword
 * @param newNickName
 * @param newPicture
 * @param newCity
 * @param userName
 * @param password
 * @returns {Promise<void>}
 */
async function updateUser(
    {newPassword, newNickName, newPicture, newCity},
    {userName, password}
    ){
    // 拼接修改内容
    const updateData = {};
    if (newPassword){
        updateData.password = newPassword
    }
    if (newNickName){
        updateData.nickName = newNickName
    }
    if (newPicture){
        updateData.picture = newPicture
    }
    if (newCity){
        updateData.city = newCity
    }
    // 拼接查询条件
    const whereData = {
        userName
    };
    if (password){
      whereData.password = password
    }
    // 执行修改
    const result = await User.update(updateData, {
        where : whereData
    });
    // 修改的行数
    return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
};