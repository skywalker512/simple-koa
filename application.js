import http from 'http'

export default class Application {
  constructor() {
    this.callback = () => {} // 创建一个空的函数给 use 用
  }

  use(callback) {
    this.callback = callback
  }

  listen (...args) {
    const server = http.createServer((req, res)=>{
      this.callback(req, res)
    })
    // 事实上 listen 里的参数 全都原封不动的 来到了 listen
    server.listen(...args)
  }
}