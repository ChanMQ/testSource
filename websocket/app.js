const koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const serve = require('koa-static')
const compress = require('koa-compress')

const views = require('koa-views')

const app = new koa()

const staticPath = './src'

app.use(logger())

app.use(bodyparser())
app.use(json())
app.use(compress({
    filter: function (contentType) {
        return /html/i.test(contentType)
    },
    threshold: 0
}))

app.use(views(path.resolve(staticPath), {
    map: {
        html: 'twig'
    }
}))

app.use(serve(staticPath))

app.use(async(ctx) => {
    if (ctx.path === '/') {
        ctx.status = 200
        ctx.body = ctx.render('index')
    }
})

app.on('error', err => {
    console.log('server error \n ', detail)
    console.error(err)
})

const port = 9999
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})