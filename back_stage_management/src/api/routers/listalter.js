const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();
const ObjectId = require('mongodb').ObjectID;

/**
 * ctx
 */
router.get('/',async (ctx,next)=>{

    let {_id}=ctx.request.query;
    console.log(_id);
    let delete_current_list=await db.delete('goodslist',{"_id":new ObjectId(_id)});
    console.log(delete_current_list.result);

    ctx.body =delete_current_list.result;

});



module.exports = router;


