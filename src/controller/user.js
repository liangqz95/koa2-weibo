/**
 * @description user controller
 * @author lqz
 */

const { getUserInfo, createUser, deleteUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo
} = require('../model/ErrorInfo');
const { doCrypto } = require('../utils/cryp');

/**
 * 用户名是否存在
 * @param userName
 * @returns {Promise<void>}
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName);
    if (userInfo){
        // 已存在
        return new SuccessModel(userInfo)
    }else {
        // 不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }

}

/**
 * 注册
 * @param userName
 * @param password
 * @param gender
 * @returns {Promise<void>}
 */
async function register({userName, password, gender}){
    const userInfo = await getUserInfo(userName);
    if (userInfo){
        // 已存在
        return new ErrorModel(registerUserNameExistInfo)
    }

    try {
        await createUser({
            userName,
            password : doCrypto(password),
            gender
        });
        return new SuccessModel()
    }catch (err) {
        console.log(err.message, err.stack);
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 登录
 * @param ctx
 * @param userName
 * @param password
 * @returns {Promise<void>}
 */
async function login({ ctx, userName, password}){
    // 获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password));
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }
    // 登录成功
    if (ctx.session.userInfo == null){
        ctx.session.userInfo = userInfo;
    }
    return new SuccessModel()

}

/**
 * 删除当前用户
 * @param userName
 * @returns {Promise<void>}
 */
async function deleteCurUser(userName){
    const result = await deleteUser(userName);
    if (result){
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser
};