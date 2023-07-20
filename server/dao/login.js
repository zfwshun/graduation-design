const {db} = require('../dataBase/index')
const {signToken} = require("../utils/signToken");

function login(userInfo) {
    return new Promise((resolve, reject) => {
        const querySQL='select * from user where username=?'
        db.query(querySQL, [userInfo.username], (err, results) => {
            if (err) reject({code: 100, msg: err.message, data: {}})
            if (results.length===0){
                reject({code: 101, msg: '用户名不存在', data: {}})
            } else if(results[0].password !== userInfo.password){
                reject({code: 102, msg: '密码错误', data: {}})
            } else {
                const token=signToken({id: results[0].id,username: results[0].username})
                resolve({code: 0, msg: '登录成功', data: {token}})
            }
        })
    })
}

module.exports = {
    login
}
