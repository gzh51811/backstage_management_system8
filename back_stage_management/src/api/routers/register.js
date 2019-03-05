const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
    // 解构
    console.log(ctx.request.body);




    let {username,password,sex,date,phone,close,desc,email} = ctx.request.body;
    console.log(username,password,sex,date,phone,close,desc,email);


    let data = {username,password,sex,date,phone,close,desc,email,regtime:Date.now()}
    let res = await db.insert('users',data);
    console.log(res);

    ctx.body = res.result;

    // 存入数据库

});

// 判断用户名是否存在
router.get('/',async (ctx,next)=>{
    let {phone} = ctx.query;

    let res = await db.find('users',{phone});

    if(res.length>0){
        ctx.body = 'no'
    }else{
        ctx.body = 'yes'
    }
});

module.exports = router;