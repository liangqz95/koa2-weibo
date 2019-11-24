const { ErrorModel } = require('../model/ResModel');
const { jsonSchemaFileInfo } = require('../model/ErrorInfo');

/**
 * 生成 json schema 验证的中间件
 * @param validateFn
 * @returns {validator}
 */
function genValidator(validateFn) {
    async function validator(ctx, next) {
        const data = ctx.request.body;
        // 校验
        const error = validateFn(data);
        if (error){
            // 验证失败
            ctx.body =  new ErrorModel(jsonSchemaFileInfo);
            return
        }
        // 验证成功，继续执行
        await next()
    }
    return validator
}

module.exports = {
    genValidator
};