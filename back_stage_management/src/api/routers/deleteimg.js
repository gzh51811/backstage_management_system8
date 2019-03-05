const Router = require('koa-router');

const db = require('../db');


// 引入文件模块
const  fs=require('fs');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.get('/',async (ctx,next)=>{

    let  {imgext}=ctx.request.query;
    console.log('想要删除的图片',imgext);
    var  imgurl='./img/'+imgext;
    fs.unlink(imgurl, (err) => {
        if (err) throw err;
        console.log('文件已删除');
    });
    ctx.body ={
          "code": 0
          ,"msg": "删除图片成功"
          
    }


});



module.exports = router;


