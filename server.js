import SimpleKoa from './application'
const app = new SimpleKoa()


// const server = http.createServer((req, res)=>{
//   res.writeHead(200)
//   res.end('hello')
// })
// app.use((req, res)=>{
//   res.writeHead(200)
//   res.end('hello')
// })
app.use(async ctx => {
  ctx.body = `Hello ${ctx.url}`
})
// server.listen(5129, ()=>{
//   console.log('server is runing')
// })
app.listen(5129, ()=>{
  console.log('server is runing')
})