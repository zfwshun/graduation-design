const {db} = require('../dataBase/index')

function register(userInfo) {
    return new Promise((resolve, reject) => {
        db.query('select * from user where username=?', [userInfo.username], (err, results) => {
            if (err) reject({code: 100, msg: err.message, data: {}})
            if (results.length !== 0) {
                reject({code: 104, msg: '用户已存在', data: {}})
            } else {
                const insertSql = 'insert into user(username,password,email) values(?,?,?)'
                db.query(insertSql, [userInfo.username, userInfo.password,userInfo.email], (err, results) => {
                    if (err) reject({code: 100, msg: err.message, data: {}})
                    //如果执行的是insert into插入语句，则results是一个对象
                    //可以通过affectedRows属性，来判断是否成功
                    if (results.affectedRows === 1)
                        resolve({code: 0,msg: '注册用户成功',data: {}})
                })
            }
        })
    })
}

module.exports = {
    register
}
