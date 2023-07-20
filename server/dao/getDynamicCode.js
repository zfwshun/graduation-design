const {db} = require("../dataBase/index");
const {signToken} = require("../utils/signToken");
const nodemail=require('../utils/nodemailer')
// 生成数字与字母组成的验证码
function makeCode (length) {
    let code=''
    for (let i = 0; i < length; i++) {
        code += randomNum(0,10)
    }
    return code
}
// 生成随机数
function randomNum (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function getDynamicCode(email){
    return new Promise((resolve, reject) => {
        const querySQL='select * from user where email=?'
        db.query(querySQL, [email], (err, results) => {
            if (err) reject({code: 100, msg: err.message, data: {}})
            if (results.length!==0){
                reject({code: 105, msg: '邮箱已被注册', data: {}})
            } else {
                let dynamicCode=makeCode(4)
                const mail = {
                    // 发件人
                    from: '<zhong_fengwei@163.com>',
                    // 邮件主题
                    subject: '动态码',
                    // 收件人
                    to:email,
                    // 邮件内容，HTML格式
                    text: '动态码：'+dynamicCode//发送验证码
                }
                const message=nodemail(mail)
                if(message){
                    reject({code: 106, msg: message, data: {}})
                }else{
                    resolve({code: 0, msg: '邮件发送成功', data: {dynamicCode}})
                }
            }
        })
    })
}

module.exports={
    getDynamicCode
}