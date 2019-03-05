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
    let res = await db.slices('orderslist',(page-1)*limit,limit*1,{});
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
    let {id,state1,state2}=ctx.request.body;
    var _id = mongoose.Types.ObjectId(id);
    if(state1=='已'){
        if(state2=='付款'){
            let res = await db.update('orderslist', { '_id': _id },{$set:{'state1':'等待付款','state2':'等待发货','state3':'等待签收', 'state4':'等待完成订单' }});
        }
        if(state2=='发货'){
            let res = await db.update('orderslist', { '_id': _id },{$set:{'state2':'等待发货','state3':'等待签收', 'state4':'等待完成订单' }});
        }
        if(state2=='签收'){
            let res = await db.update('orderslist', { '_id': _id },{$set:{'state3':'等待签收','state4':'等待完成订单' }});
        }
        if(state2=='完成订单'){
            let res = await db.update('orderslist', { '_id': _id },{$set:{'state4':'等待完成订单' }});
        }
    }
    if(state1=='等待'){
        if(state2=='完成订单'){
            let res = await db.update('orderslist', { '_id': _id },{$set:{'state1':'已付款', 'state2':'已发货','state3':'已签收','state4':'已完成订单' }});
        }
        if(state2=='签收'){
            let res = await db.update('orderslist', { '_id': _id },{$set:{'state1':'已付款', 'state2':'已发货','state3':'已签收' }});
        }
        if(state2=='发货'){
            let res = await db.update('orderslist', { '_id': _id },{$set:{'state1':'已付款', 'state2':'已发货' }});
        }
        if(state2=='付款'){
            let res = await db.update('orderslist', { '_id': _id },{$set:{'state1':'已付款' }});
        }
    }
        
    
    ctx.body='66';
    

    // 存入数据库

})

module.exports = router;

function newFunction(res) {
    console.log(res);
}
