import readStream from './readStream'
import imgUploader from './imgUploader'

// https://chenshenhai.github.io/koajs-design-note/note/chapter05/03.html

const strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/

const jsonTypes = 'application/json'

const formTypes = 'application/x-www-form-urlencoded'

const textTypes = 'text/plain'

// const multiPart = 'multipart/form-data'

function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  for (const [index, queryStr] of queryStrList.entries()) { // queryStrList.entries() 将会在使用 of 的时候返回 index
    let itemList = queryStr.split('=');
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }
  return queryData;
}

export default function bodyParser() {
  return async function (ctx, next) {
    // 拦截post请求
    if (!ctx.request.body && ctx.method === 'POST') {
      // 解析请求体中的表单信息
      let body = await readStream(ctx.request.req);
      let result = body;
      if (ctx.request.is(formTypes)) {
        result = parseQueryStr(body);
      } else if (ctx.request.is(jsonTypes)) {
        if (strictJSONReg.test(body)) {
          try {
            result = JSON.parse(body);
          } catch (err) {
            ctx.throw(500, err);
          }
        }
      } else if (ctx.request.is(textTypes)) {
        result = body;
      } else {
        ctx.body = 'type dont support'
      }
      // else if (ctx.request.is(multiPart)) {
      //   imgUploader(ctx, body)
      // }

      // 将请求体中的信息挂载到山下文的request 属性中
      ctx.request.body = result;
    }
    await next();
  };
}