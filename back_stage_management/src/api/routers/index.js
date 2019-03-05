const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

// 创建路由
var router = new Router(); 

// 引入页面路由
const registryRouter = require('./register');
const loginRouter = require('./login');
const goodslistRouter = require('./goodslist');
const listalterRouter = require('./listalter');
const uploadRouter = require('./upload');
const addlistRouter = require('./addlist');
const editlistRouter = require('./editlist');
const deleteimgRouter = require('./deleteimg');
const orderlistRouter = require('./orderlist');
const userlistRouter = require('./userlist');
const tokenverifyRouter = require('./tokenverify');



router.use(koaBody({
    // 支持formdata
    multipart:true,

    // 文件支持
    formidable:{
        // 指定保存路径(相对服务器)
        uploadDir:'./img',
        keepExtensions:true,
        // 改文件名
        onFileBegin(filename,file){
            // console.log('上传',file);




            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            file.path = './img/'+file.name//(会覆盖)
        }
    }
}));



// router.use(koaBody({
//     // 支持formdata
//     multipart:true,

//     // 文件支持
//     formidable:{
//         // 指定保存路径(相对服务器)
//         uploadDir:'./img',
//         keepExtensions:true,
//         // 改文件名
//         onFileBegin(filename,file){
//             console.log('上传',file)
//             // filename: 上传文件的原始名
//             // file:文件信息对象
//             //   * path:

//             // file.path = './uploads/'+filename
//         }
//     }
// }));
router.use('/register',registryRouter.routes());
router.use('/login',loginRouter.routes());
router.use('/goodslist',goodslistRouter.routes());
router.use('/listalter',listalterRouter.routes());
router.use('/uploadimg',uploadRouter.routes());
router.use('/addlist',addlistRouter.routes());
router.use('/editlist',editlistRouter.routes());
router.use('/deleteimg',deleteimgRouter.routes());
router.use('/orderlist',orderlistRouter.routes());
router.use('/userlist',userlistRouter.routes());
router.use('/tokenverify',tokenverifyRouter.routes());

// 要引用就必须暴露
module.exports = router;