const Router = require('koa-router');

const db = require('../db');
const token = require('../utils/token');
const mongoose = require('mongoose');


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
router.get('/',async (ctx,next)=>{
    let {_id} =ctx.request.query;
    console.log(_id);
    var id = mongoose.Types.ObjectId(_id);
    let res = await db.find('users',{'_id':id});
    console.log(res[0].close);

    if(res[0].close=='on'){
        ctx.body = 'yes'
    }else{
        ctx.body = 'no'
    }
});

module.exports = router;