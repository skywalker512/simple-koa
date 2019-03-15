import imgUploader from './imgUploader'

export default async (ctx, next) => {
  if (ctx.url === '/upload' && ctx.method === 'POST') {
    const res = await imgUploader(ctx.request.body)
    ctx.body = res ? 'ok' : 'err'
  }
  await next()
}