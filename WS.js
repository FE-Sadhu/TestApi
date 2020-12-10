const WebSocket = require('ws')

class WS {
  /**
   * 初始化实例属性
   * @param {String} url ws 的接口
   * @param {Function} msgCb 服务端传数据的回调
   * @param {String} name
   */
  constructor(url, msgCb, name) {
    this.url = url
    this.msgCb = msgCb
    this.name = name
    this.ws = null // websocket 对象
    this.status = null // 连接状态
    this.interval = null // 间隔时间
  }
  /**
   * 首次或重连时候建立 WebSocket 连接
   * @param {params} data 可选 
   */
  connect(data) {
    this.ws = new WebSocket(this.url)
    // 成功连接事件
    this.ws.on('open', (e) => {
      this.status = 'open';
      console.log(`${this.name}连接成功`, e)
      // 有要传的数据就发给后端
      data && this.ws.send(JSON.stringify(data))
    })
    // 监听服务端返回信息
    this.ws.on('message', (data) => {
      if (data !== 'pong') {
        data = JSON.parse(data)
        if (data.config && data.config.hb === 1) {
          this.interval = data.config.hbInterval * Math.random(0.8, 1)
          this.heartCheck()
        }
        this.msgCb(data)
      }
    })
    // 手动关闭触发关闭事件
    this.ws.on('close', (e) => {
      this.closeHandle(e)
    })
    // 连接出错回调
    this.ws.on('error', (e) => {
      this.closeHandle(e)
    })
  }
  heartCheck() {
    this.pingInterval = setInterval(() => {
      if (this.ws.readyState === 1) {
          // ws 为连接状态
          this.ws.send('ping'); // 客户端发送ping
      }
    }, this.interval)
  }
  /**
   * 
   * @param {params} data 发送消息给服务器
   */
  sendHandle(data) {
    return this.ws.send(JSON.stringify(data));
  }
  /**
   * 因为 WebSocket 并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
   * @param {Event} e 
   */
  closeHandle(e = 'err') {
    // 清除定时器
    if (this.pingInterval !== undefined) {
      clearInterval(this.pingInterval)
    }

    if (this.status !== 'close') {
        console.log(`${this.name}断开，重连 websocket `, e)
        this.connect(); // 重连
    } else {
        console.log(`${this.name} websocket 手动关闭`)
    }
  }
  // 手动关闭
  closeMyself() {
    console.log(`手动关闭${this.name}`)
    this.status = 'close';
    return this.ws.close();
  }
}

module.exports = {
  WS
}