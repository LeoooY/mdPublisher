const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const multer = require('@koa/multer');
const upload = multer({ dest: 'uploads/' }); // note you can pass `multer` options here

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    // add a route for uploading single files
    router.post(
        '/api/upload',
        upload.single('file'),
        ctx => {
            console.log('ctx.request.file', ctx.request.file);
            console.log('ctx.file', ctx.file);
            console.log('ctx.request.body', ctx.request.body);
            ctx.type='application/json'
            ctx.body = 'done';
        }
    );

    //   router.get('/a', async ctx => {
    //     await app.render(ctx.req, ctx.res, '/a', ctx.query)        
    //     ctx.respond = false
    //   })

    //   router.get('/b', async ctx => {
    //     await app.render(ctx.req, ctx.res, '/b', ctx.query)
    //     ctx.respond = false
    //   })

    // router.all('/api/*', async ctx => {
    //     await next()
    //     ctx.type='application/json'
    // })

    router.all('*', async ctx => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    server.use(router.routes())
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})
