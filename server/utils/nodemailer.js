// 发送邮件的配置信息
const nodemailer = require('nodemailer')

//创建一个smtp服务器
const config = {
    host: 'smtp.163.com',
    port: 465,
    auth: {
        user: 'zhong_fengwei@163.com', //注册的163邮箱账号
        pass: 'EUZQBPXEZVLOBHGK' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
    }
}
// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config)

//发送邮件
module.exports = function (mail){
    transporter.sendMail(mail, function(error, info){
        if(error) {
            return error
        }
        console.log('mail sent:', info.response)
    })
}