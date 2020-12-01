## Project Tree
```js
.
├── README.md                         -- 项目说明
├── WS.js                             -- WebSocket 类
├── brower                            -- 浏览器端测试所用脚本
│   ├── run.js                        -- 跑 node.js 兼容 ES6 Module
│   └── server.js                     -- express router proxy
├── docs                              -- 测试日志
├── env.json                          -- 环境变量
├── mocha.launcher.js                 -- 启动测试脚本
├── package-lock.json
├── package.json
├── src
│   ├── asyncTest.js                  -- 接口函数定义 & websocket 测试
│   ├── core                          -- 请求库核心
│   │   ├── buildURL.js               -- 构建规范 url
│   │   ├── dispatchRequest.js        -- core request
│   │   └── handleConfig.js           -- 序列化 config
│   └── utils
│       └── utils.js                  -- 工具函数
├── test                              -- 测试目录
│   ├── beforeLogin.spec.js           -- 登录前测试用例
│   └── loggedIn.spec.js              -- 登录后测试用例
└── webpack.config.js
```

## 项目启动
可以在 node 端测，也可以在浏览器端测，自行选择。

### node 端
有两种方法可以启动，无论哪种方法都先安装依赖 `npm install` 。
1. 运行启动测试脚本 -> `node mocha.launcher.js`

> 注：这种方式要单独测试某个 `xxx.spec.js` 文件或有生成测试日志的需求，则自行到脚本中修改。

2. 利用 npm scripts
- `npm run "test:before"` 测试登录前的测试用例
- `npm run "test:after"` 测试登录后的测试用例
- `npm run "test:doc1"` 生成登录前测试用例的测试日志
- `npm run "test:doc2"` 生成登录后测试用例的测试日志

> 注：若要修改，自行定义 package.json

### 浏览器端
1. `npm install` 安装依赖
2. webpack 打包项目 `npm run build`，打包后会出现个 dist 目录
3. `node ./brower/server.js`  命令行启动 server 代理 dist 目录下的静态资源即可利用 Chrome 开发者工具测试 
> 注：打包前把 CommonJs 改为 ES6 Module

## 项目技术栈
- 请求：基于 Fetch 封装的请求库
- 测试框架：Mocha
- 断言库：Chai 
- 打包：Webpack
- 服务端：Node + Express

## 接口文档
https://coolkit-carl.gitee.io/apidocs/#/zh-cmn/%E6%8E%A5%E5%8F%A3%E4%B8%AD%E5%BF%83_v2

## 测试日志
测试日志利用 Mocha 的生成文档 Feature -> `mocha ./test/*.js --reporter mochawesome --reporter-options reportDir=docs/`
> 注：--reporter-options reportDir是生成的报告放在哪个文件夹

本项目的测试日志在 `./docs` 目录下，点击对应目录下的 html 文件即可查看。

## 注意
本项目所有代码以及测试日志归作者本人以及所在公司深圳酷宅科技所有，未经许可，禁止私用。若想商用、建议、转载，请联系邮箱: `sadhu.wu@coolkit.cn`