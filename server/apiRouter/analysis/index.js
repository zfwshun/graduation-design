const axios = require('axios')
const express = require('express')
const router = express.Router()

// 文章分析
router.get('/article_analysis',async (req,res)=>{
    console.log(req.query)
    const {data:commentInfo} = await axios.get('https://www.jzl.com/fbmain/monitor/v3/article_comment2', {
        params: {
            url: req.query.url,
            key: 'JZL0eb3f8faa425a199',
        }
    })
    let commentList=commentInfo.data.map((item)=>{
        return item.content
    })
    const {data} = await axios.get('http://127.0.0.1:5000/article_analysis', {
        params: {
            url: req.query.url,
            commentList: JSON.stringify(commentList)
        }
    })
    let emotionArr=[0,0,0,0,0]
    data.commentsEmotionList.forEach((item)=>{
        if(item>=0&&item<0.2) emotionArr[0]++
        if(item>=0.2&&item<0.4) emotionArr[1]++
        if(item>=0.4&&item<0.6) emotionArr[2]++
        if(item>=0.6&&item<0.8) emotionArr[3]++
        if(item>=0.8&&item<=1) emotionArr[4]++
    })
    console.log(data)
    res.send({
        code: 0,
        msg: 'success',
        data: {
            'keywords': data.keywordsList,
            'emotion': emotionArr
        }
    })
})

// 历史发文分析
router.get('/history_articles_analysis',async (req,res)=>{
    console.log(req.query)
    const {data} = await axios.get('http://127.0.0.1:5000/history_articles_analysis', {
        params: {
            url: req.query.name,
        }
    })
    console.log(data)
    res.send({
        code: 0,
        msg: 'success',
        data: {}
    })
})
module.exports = router