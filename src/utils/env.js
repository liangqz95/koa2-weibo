/**
 * @description 环境变量
 * @author lqz
 */

const ENV = process.env.NODE_ENV;

module.exports = {
    isDev : ENV === 'dev',
    notDev : ENV !== 'dev',
    isProd : ENV === 'production',
    notProd : ENV !== 'dev',
    isTest : ENV === 'test',
    notTest : ENV !== 'test'
};