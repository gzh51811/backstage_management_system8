const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

const ObjectId = require('mongodb').ObjectID;


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{




let {_id,title,pricing, sellingPrice,
repertory,img,uploadtime,salenum,classify}=ctx.request.body;
console.log('qqq',_id,title,pricing, sellingPrice,
repertory,img,uploadtime,salenum,classify)

let  res=await db.find('goodslist',{"_id":new ObjectId(_id)});
    console.log(res.length,img);
// 更新
    
    
    if(res.length>0){
        await db.update('goodslist',{"_id":new ObjectId(_id)},{$set:{'title':title,'pricing':pricing,'sellingPrice':sellingPrice,
         'repertory':repertory,'img':img,'uploadtime':uploadtime,'salenum':salenum,'classify':classify}});
        // console.log(888,img);
        ctx.body ={msg:'更新成功'};





    }
    else if(res.length==0){
         await db.insert('goodslist',{title,pricing, sellingPrice,
         repertory,img,uploadtime,salenum,classify});
         ctx.body ={msg:'插入成功'};

    }
    



    

});



module.exports = router;


