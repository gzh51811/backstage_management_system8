const Router = require('koa-router');

const db = require('../db');
const token = require('../utils/token');


// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
    // 解构
    let {phone,password,mdl} = ctx.request.body;
 
    let res = await db.find('users',{phone,password});
    res = res[0];
    if(res){
        if(mdl='true'){
            let _token = token.create(res.username);
            ctx.body = {
                _id:res._id,
                username:res.username,
                token:_token
            }   
        }else{
            ctx.body = {
                _id:res._id,
                username:res.username,
            }
        }      
    }else{
        ctx.body = '';
    }

    

    // 存入数据库

})

module.exports = router;