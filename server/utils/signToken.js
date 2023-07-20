const jwt = require("jsonwebtoken")
const SECRET = "QWERTYUIOPasdfghjklZXCVBNM"

// 注册token
function signToken(info){
    const token=jwt.sign(info, SECRET, {
        expiresIn: 3600*24
    })
    return token
}
module.exports={
    signToken
}

