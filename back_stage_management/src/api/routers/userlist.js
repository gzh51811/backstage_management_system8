const Router = require('koa-router');
const db = require('../db');
const mongoose = require('mongoose');

// 创建路由
var router = new Router();


/**
 * ctx
 */
router.get('/',async (ctx,next)=>{
    // 解构
    let {page,limit}=ctx.request.query;
    let res = await db.slices('users',(page-1)*limit,limit*1,{});
    for(var i=0;i<res.length;i++){
        res[i].regtime=fmtDate((res[i].regtime)*1);
        if(res[i].close=='on')
        {
            res[i].close='是'
        }
        if(res[i].close=='off')
        {
            res[i].close='不是'
        }
    }
    // console.log(res);
    if(res){
        ctx.body = {
            "code": 0,
            "msg": "",
            "count": 11,
            "data": res
          } 
    }else{
        ctx.body = 'no'
    }

    

    // 存入数据库

})
router.post('/',async (ctx,next)=>{
    // 解构
    let {state,id,username,email,sex,phone,close}=ctx.request.body;
    var _id = mongoose.Types.ObjectId(id);
    if(state=='update'){
        let res = await db.update('users', { '_id': _id },{$set:{'id':_id,'username':username,'email':email,'sex':sex,'phone':phone,'close':close}});
    }
    if(state=='del'){
        let res = await db.delete('users', { '_id': _id });
    }
        
    
    ctx.body='66';
    

    // 存入数据库

})
function fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}

module.exports = router;

function newFunction(res) {
    console.log(res);
}