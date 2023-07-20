const express=require('express')
const app=express()

const cors=require('cors')
app.use(cors())

const acquisitionRouter=require('./apiRouter/acquisition/index')
const analysisRouter=require('./apiRouter/analysis/index')
const userRouter=require('./apiRouter/user/index')
app.use('/api/acquisition',acquisitionRouter)
app.use('/api/analysis',analysisRouter)
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    res.send('server starts successfully')
})
app.listen(80,()=>{
    console.log('express server running at http://100.64.85.20');
})