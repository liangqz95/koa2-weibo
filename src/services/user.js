/**
 * @description user service
 * @author lqz
 */

const { User } = require('../db/model/index');

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


    return result.dataValues
}

module.exports = {
    getUserInfo
};