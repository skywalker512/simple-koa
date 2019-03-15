import SimpleKoa from './application'
import fs from 'fs'
import path from 'path'
const app = new SimpleKoa()


// const server = http.createServer((req, res)=>{
//   res.writeHead(200)
//   res.end('hello')
// })
// app.use((req, res)=>{
//   res.writeHead(200)
//   res.end('hello')
// })
app.use(async (ctx, next) => {
  if (ctx.url === '/') {
    ctx.body = 'ok';
  }
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.url === '/err') {
    ctx.body = 'err'
  }
  await next()
})

app.use(async (ctx, next)=>{
  console.log(ctx.req.method, ctx.req.url)
  await next()
})
// server.listen(5129, ()=>{
//   console.log('server is runing')
// })
app.listen(5129, ()=>{
  console.log('server is runing')
}) 