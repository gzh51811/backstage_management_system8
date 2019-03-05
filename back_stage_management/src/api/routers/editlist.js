const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();
const ObjectId = require('mongodb').ObjectID;


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{

    let {_id}=ctx.request.body;
    // console.log('353011',_id)
    let current_cid_list=await db.find('goodslist',{"_id":new ObjectId(_id)});
    // console.log(current_cid_list);

    
    ctx.body ={
        "code":0,
        "msg":'编辑成功',
        "data":current_cid_list[0]
    };



    

});





module.exports = router;


