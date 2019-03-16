export default async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  ctx.set('Access-Control-Allow-Credentials', 'true')
  ctx.set('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS,PUT,PATCH')
  await next()
  if (ctx.method === 'OPTIONS') {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    ctx.set('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS,PUT,PATCH')
    ctx.set('Access-Control-Allow-Headers', 'Content-type');
    ctx.status = 204
  }
}