import { fileInfoUploader, fileDataUploader, fileEndUploader, fileUndoUploader } from './fileUploader'

export default async (ctx, next) => {
  if (ctx.url === '/upload/start' && ctx.method === 'POST') {
    const res = await fileInfoUploader(ctx.request.body)
    ctx.body = res ? 'ok' : 'err'
  }
  if (ctx.url === '/upload/end' && ctx.method === 'POST') {
    const res = await fileEndUploader(ctx.request.body)
    ctx.body = res ? 'ok' : 'err'
  }
  if (ctx.url === '/upload/undo' && ctx.method === 'POST') {
    const res = await fileUndoUploader(ctx.request.body)
    ctx.body = res ? 'ok' : 'err'
  }
  if (/^\/upload\/data/.test(ctx.url) && ctx.method === 'POST') {
    const key = ctx.url.split('/')[3]
    const step = ctx.url.split('/')[4]
    const res = await fileDataUploader(ctx.request.body, key, step)
    ctx.body = res ? 'ok' : 'err'
  }
  await next()
}