const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.post('/',async (ctx,next)=>{

    let res=ctx.request.body;
    // console.log(ctx.request.files);
    // console.log('获取文件名',ctx.request.files.file.path);
    ctx.body ={
          "code": 0
          ,"msg": "上传文件成功"
          
    }



    

});



module.exports = router;


