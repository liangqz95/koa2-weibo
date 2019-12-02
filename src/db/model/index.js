/**
 * @description  数据模型入口文件
 * @author lqz
 */

const User = require('./User');
const Blog = require('./Blog');

Blog.belongsTo(User, {
    foreignKey : 'userId'
});
// User.hasMany(Blog);

module.exports = {
    User,
    Blog
};