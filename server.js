import SimpleKoa from './application'
import bodyParser from './bodyParser';
import upload from './upload'

const app = new SimpleKoa()


// const server = http.createServer((req, res)=>{
//   res.writeHead(200)
//   res.end('hello')
// })
// app.use((req, res)=>{
//   res.writeHead(200)
//   res.end('hello')
// })
app.use(bodyParser())
app.use(async (ctx, next) => {
  if (ctx.url === '/') {
    ctx.body = 'ok';
  }
  await next()
  if (!ctx.body) {
    ctx.status = 404
    ctx.body = '404'
  }
})

app.use(upload)

app.use(async (ctx, next)=>{
  // console.log(ctx.req.method, ctx.req.url, ctx.req.headers['content-type'])
  await next()
})
// server.listen(5129, ()=>{
//   console.log('server is runing')
// })
app.listen(5129, ()=>{
  console.log('server is runing')
}) 