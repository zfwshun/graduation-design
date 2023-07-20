const axios = require('axios')
const express = require('express')
const router = express.Router()

// 通过公众号名称名称获取历史发文列表
router.get('/history_article_list/:name/:page', async (req, res) => {
    console.log(req.params)
    const {data} = await axios.get('http://127.0.0.1:5000/history_article_list', {
        params: {
            name: req.params.name,
            page: req.params.page,
        }
    })
    // console.log(data)
    res.send({code: data.base_resp.ret, msg: data.base_resp.ret.err_msg, data: {
            total_page: Math.ceil(data.app_msg_cnt/5),
            now_page: req.params.page*1,
            article_list: data.app_msg_list
        }})
})
// 通过文章链接获取文章信息
router.get('/article_info',async (req,res)=>{
    console.log(req.query)
    const {data} = await axios.get('https://www.jzl.com/fbmain/monitor/v3/article_info', {
        params: {
            url: req.query.url,
            key: 'JZL0eb3f8faa425a199',
        }
    })
    console.log(data.code)
    res.send(data)
})

// 通过公众号名称或者文章链接获取公众号信息
router.get('/public_accounts_info',async (req,res)=>{
    console.log(req.query)
    const {data} = await axios.get('http://127.0.0.1:5000/public_accounts_info', {
        params: {
            name: req.query.name,
        }
    })
    // console.log(data)
    res.send({code: data.base_resp.ret, msg: data.base_resp.ret.err_msg, data: data.list[0]})
})

// 用关键字和公众号名称搜索文章
router.get('/search_article',async (req,res)=>{
    console.log(req.query)
    if(req.query.name===''){
        // 根据关键词获取微信文章
        const {data} = await axios.post('https://www.jzl.com/fbmain/monitor/v3/kw_search', {
            kw: req.query.keyword,
            page: req.query.page,
            period: req.query.period,
            key: 'JZL0eb3f8faa425a199',
        })
        console.log(data.code)
        data.hasName=false
        res.send(data)
    }else{
        // 获取指定公众号内含有关键字标题的文章
        const {data} = await axios.get('http://127.0.0.1:5000/search_article', {
            params: {
                name: req.query.name,
                keyword: req.query.keyword,
                page: req.query.page
            }
        })
        console.log(data)
        res.send({code: data.base_resp.ret, msg: data.base_resp.ret.err_msg, data: data.app_msg_list, hasName: true,total_page: Math.ceil(data.app_msg_cnt/5),
            now_page: req.query.page*1,})
    }
})
module.exports = router
