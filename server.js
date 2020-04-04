const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const multer = require('@koa/multer');
const moment=require('moment')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const fileName=file.originalname.replace('.md','')
        const time=moment().format('YYYY-MM-DD')
        cb(null, `${fileName}_${time}.md`)
    }
})
// dest: '/uploads/',
const upload = multer({ storage }); // note you can pass `multer` options here

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const koaApp = new Koa()
    const router = new Router()

    // add a route for uploading single files
    router.post(
        '/api/upload',
        upload.single('mdfile'),
        ctx => {
            // console.log('ctx.request.file', ctx.request.file);
            // console.log('ctx.file', ctx.file);
            // console.log('ctx.request.body', ctx.request.body);
            ctx.body = {
                res: 'done'
            };
        }
    );

    // add a route for uploading single files
    router.post(
        '/api/test',
        ctx => {
            ctx.body = {
                res: 'test done'
            };
        }
    );

    /* 自定义渲染页面路由示例 */
    //   router.get('/a', async ctx => {
    //     await app.render(ctx.req, ctx.res, '/a', ctx.query)        
    //     ctx.respond = false
    //   })

    //   router.get('/b', async ctx => {
    //     await app.render(ctx.req, ctx.res, '/b', ctx.query)
    //     ctx.respond = false
    //   })

    /* 其余路由走 next自带路由 /pages/api/下的接口 和渲染/pages/下的页面 */
    /* router定义的路由，方法不匹配的皆会走到这里 */
    router.all('*', async ctx => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    koaApp
        /* 统一处理接口 */
        .use(async (ctx, next) => {
            ctx.res.statusCode = 200
            if (/\/api\//.test(ctx.path)) {
                ctx.type = 'application/json'
            }
            await next()
        })

        /* 路由 */
        .use(router.routes())
        .use(router.allowedMethods())

    koaApp.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})
