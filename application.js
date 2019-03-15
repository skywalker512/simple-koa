import http from 'http'

const request = {
  get url() {
    // ctx.request.req = req 让他可以取到 url
    return this.req.url // 将对象的操作重定义
    // 这样可以做到取值和赋值的不同操作，同时也可以产生一些副作用，比如监听对象值的变化
  }
}

const response = {
  // this._body 不需要创建？
  get body() {
    return this._body
  },
  set body(val) {
    this._body = val
  }
}
// 会直接挂在 ctx 上
const context = {
  get url() {
    // 这里的 this 指的是 ctx
    return this.request.url
  },
  get body() {
    
    return this.response.body
  },
  set body(val) {
    this.response.body = val 
  }
}


export default class Application {
  constructor() {
    this.callback = () => {} // 创建一个空的函数给 use 用
    this.request = request
    this.response = response
    this.context = context
  }

  use(callback) {
    this.callback = callback
  }

  createCtx(req, res) {
    // const ctx = {...this.context} 为啥不能使用 展开运算符
    const ctx = Object.create(this.context)
    ctx.request = Object.create(this.request)
    ctx.response = Object.create(this.response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.request.res = res
    // 最终 ctx 中有用的是 url body
    return ctx
  }

  listen (...args) {
    const server = http.createServer(async (req, res)=>{
      const ctx = this.createCtx(req, res)
      await this.callback(ctx)
      ctx.res.end(ctx.body)
    })
    // 事实上 listen 里的参数 全都原封不动的 来到了 listen
    // 于 apply 类似
    server.listen(...args)
  }
}