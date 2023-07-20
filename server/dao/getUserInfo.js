const {db} = require('../dataBase/index')
const {verifyToken} = require("../utils/verifyToken");

// 获取用户信息
function getUserInfo(token) {
    return new Promise((resolve, reject) => {
        const info=verifyToken(token)
        console.log(info)
        if(info==='error'){
            reject({code: 103, msg: '无效的token', data: {}})
        }else {
            db.query('select * from user where username=?', [info.username], (err, results) => {
                if (err) reject({code: 100, msg: err.message, data: {}})
                resolve({code: 0, msg: 'success', data: {avatar: results[0].avatar,username: results[0].username,email: results[0].email}})
            })
        }
    })
}

module.exports = {
    getUserInfo
}
