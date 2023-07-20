// 导入mysql数据库模块
const mysql=require('mysql');
// 建立与mysql数据库的联连接关系
const db=mysql.createPool({
    host: '100.64.85.20',
    user: 'root',
    password: 'Zfw010925',
    database: 'graduationDesign'
})
// 测试mysql模块能否正常工作
// db.query('select 1',(err,results)=>{
//     //mysql模块工作期间报错了
//     if(err) return console.log(err.message);
//     //mysql模块正常工作
//     console.log(results);
// })

module.exports={
    db
}