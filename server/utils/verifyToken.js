const jwt = require("jsonwebtoken")
const SECRET = "QWERTYUIOPasdfghjklZXCVBNM"

// 验证token
function verifyToken(token) {
    let data=null
    jwt.verify(token, SECRET, (err, decode)=>{
        if(err){
            // token失效
            data='error'
        }else {
            // decode即为创建token时使用的data数据
            data=decode
        }
    })
    return data
}

module.exports={
    verifyToken
}
