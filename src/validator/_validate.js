/**
 * @description json schema 校验
 * @author lqz
 */

const AJV = require('ajv');
const ajv = new AJV({
    // allErrors : true // 输出所有错误(比较慢)
});

/**
 * json schema 校验
 * @param schema
 * @param data
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data);
    if (!valid) {
        return ajv.errors[0];
    }
}

module.exports = validate;