/**
 * build a express server to proxy browser request
 */
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

const app = express()
const router = express.Router()

const CN = 'https://cn-apia.coolkit.cn',
      US = 'https://us-apia.coolkit.cc',
      AS = 'https://as-apia.coolkit.cc',
      EU = 'https://eu-apia.coolkit.cc';

router.post('/user/register', bodyParser.json(), (req, res) => {
  fetch(CN + '/v2/user/register', {
    method: req.method,
    headers: Object.assign({}, {
      'Host': 'cn-apia.coolkit.cn'
    }, req.headers),
    body: JSON.stringify(req.body)
  }).then(response => response.json())
    .then(data => {console.log(data); res.json(data) })
    .catch(e => console.log('出错 -> ', e))
})

router.post('/user/login', bodyParser.json(), (req, res) => {
  fetch(CN + '/v2/user/login', {
    method: req.method,
    headers: Object.assign({}, {
      'Host': 'cn-apia.coolkit.cn'
    }, req.headers),
    body: JSON.stringify(req.body)
  }).then(response => response.json())
    .then(data => {console.log(data); res.json(data) })
    .catch(e => console.log('出错 -> ', e))
})

router.post('/user/change-pwd', bodyParser.json(), (req, res) => {
  fetch(CN + '/v2/user/change-pwd', {
    method: req.method,
    headers: Object.assign({}, {
      'Host': 'cn-apia.coolkit.cn'
    }, req.headers),
    body: JSON.stringify(req.body)
  }).then(response => response.json())
    .then(data => {console.log(data); res.json(data) })
    .catch(e => console.log('出错 -> ', e))
})

router.post('/user/close-account', bodyParser.json(), (req, res) => {
  fetch(CN + '/v2/user/close-account', {
    method: req.method,
    headers: Object.assign({}, {
      'Host': 'cn-apia.coolkit.cn'
    }, req.headers),
    body: JSON.stringify(req.body)
  }).then(response => response.json())
    .then(data => {console.log(data); res.json(data) })
    .catch(e => console.log('出错 -> ', e))
})


router.post('/user/verification-code', bodyParser.json(), (req, res) => {
  fetch(CN + '/v2/user/verification-code', {
    method: req.method,
    headers: Object.assign({}, {
      'Host': 'cn-apia.coolkit.cn'
    }, req.headers),
    body: JSON.stringify(req.body)
  }).then(response => response.json())
    .then(data => {console.log(data); res.json(data) })
    .catch(e => console.log('出错 -> ', e))
})
app.use('/v2', router)

app.use(express.static('../dist'))

const port = process.env.PORT || 9002 // 启用 node.js 没有传端口的话，默认就用 9002 这个端口

module.exports = app.listen(port, function (err) { // 启动服务监听端口
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})