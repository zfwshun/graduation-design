const axios = require('axios')
const express = require('express')
const {login} = require("../../dao/login")
const {getUserInfo} = require("../../dao/getUserInfo")
const {register} = require("../../dao/register")
const {getDynamicCode} = require("../../dao/getDynamicCode")
const router = express.Router()

router.use(express.urlencoded({extended:false}))
router.use(express.json())

// 获取动态码
router.get('/dynamic_code',async (req,res)=>{
    console.log(req.query)
    try{
        const result=await getDynamicCode(req.query.email)
        res.send(result)
    }catch(err){
        console.log('error',err.msg)
        res.send(err)
    }
})

// 注册用户
router.post('/register',async (req,res)=>{
    console.log(req.body)
    try{
        const result=await register(req.body)
        res.send(result)
    }catch(err){
        console.log('error',err.msg)
        res.send(err)
    }
})

// 登录
router.post('/login',async (req,res)=>{
    console.log(req.body)
    try{
        const result=await login(req.body)
        res.send(result)
    }catch(err){
        console.log('error',err.msg)
        res.send(err)
    }
})

// 获取用户信息
router.get('/get_user_info',async (req,res)=>{
    console.log(req.headers.token)
    try{
        const result=await getUserInfo(req.headers.token)
        res.send(result)
    }catch(err){
        console.log('error',err.msg)
        res.send(err)
    }
})

module.exports = router