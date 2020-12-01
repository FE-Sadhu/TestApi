const dispatchRequest = require('./core/dispatchRequest.js')
const { getSign, getEnv, getDigest } = require('./utils/utils.js')
const { WS } = require('../WS')
const fs = require('fs')

const CN = 'https://cn-apia.coolkit.cn',
      US = 'https://us-apia.coolkit.cc',
      AS = 'https://as-apia.coolkit.cc',
      EU = 'https://eu-apia.coolkit.cc';

const ALLOT_SERVER_CN = 'https://cn-dispa.coolkit.cn/dispatch/app',
      ALLOT_SERVER_US = 'https://us-dispa.coolkit.cc/dispatch/app',
      ALLOT_SERVER_EU = 'https://eu-dispa.coolkit.cc/dispatch/app',
      ALLOT_SERVER_AS = 'https://as-dispa.coolkit.cc/dispatch/app';

const COMMON_HEADERS = {
  'Content-Type' : 'application/json',
  'Host': 'cn-apia.coolkit.cn'
}

/**
 * 工厂模式造 headers
 * @param {String} type 
 * @param {Object} body 
 * @param {Boolean} flag true -> 登录前, false -> 登录后
 */
function headersFactory(type, body = '', flag = false) {
  return Object.assign(
    type === 'user' ? { 'X-CK-Appid': 'oc3tvAdJPmaVOKrLv0rjCC0dzub4bbnD' } : {},
    flag ? { 'Authorization' : 'Sign ' + getSign(body) } : { 'Authorization' : 'Bearer ' + getEnv('at')},
    COMMON_HEADERS
  )
}

/* 接口函数定义 */
const asyncObj = { 
  user: {
    userRegister() {
      const data = {
        countryCode: '+86',
        phoneNumber: '+8617720837235',
        verificationCode: '9820',
        password: '11111111' // 密码
      }

      const promise = dispatchRequest(CN + '/v2/user/register', {
        method: 'POST',
        headers: headersFactory('user', data, true),
        data
      })

      /* get token */
      return promise.then(res => {

        if (res.error === 0 && Object.keys(res.data).length > 0) {
          fs.writeFileSync('env.json', JSON.stringify({
            at: res.data.at,
            rt: res.data.rt,
            user: res.data.user,
            region: res.data.region
          }, null, 2), (err) => {
            if (err) throw err
            console.log('最新 Token 已写入本地')
          })
        }
        return res
      })
    },
    pwdLogin() {
      const data = {
        lang: 'cn',
        // email: '1714222385@qq.com', 不存在文档描述的优先检查，一起传就报 400 错，有冲突
        countryCode: "+86",
        phoneNumber: '+8617720837235',
        password: '12345678c'
      }

      const promise = dispatchRequest(CN + '/v2/user/login', {
        method: 'POST',
        headers: headersFactory('user', data, true),
        data
      })

      /* get token */
      return promise.then(res => {
        if (res.error === 0 && Object.keys(res.data).length > 0) {
          fs.writeFileSync('env.json', JSON.stringify({
            at: res.data.at,
            rt: res.data.rt,
            user: res.data.user,
            region: res.data.region
          }, null, 2), (err) => {
            if (err) throw err
            console.log('最新 Token 已写入本地')
          })
        }
        return res
      })
    },
    verificationLogin() {
      const data = {
        lang: 'cn',
        // email: '' 国外不能验证码
        countryCode: "+86",
        phoneNumber:	'+8617720837235',
        verificationCode: '8385'
      }
      const promise =  dispatchRequest(CN + '/v2/user/sms-login', {
        method: 'POST',
        headers: headersFactory('user', data, true),
        data
      })

      /* get token */
      return promise.then(res => {
        if (res.error === 0 && Object.keys(res.data).length > 0) {
          fs.writeFileSync('env.json', JSON.stringify({
            at: res.data.at,
            rt: res.data.rt,
            user: res.data.user,
            region: res.data.region
          }, null, 2), (err) => {
            if (err) throw err
            console.log('最新 Token 已写入本地')
          })
        }
        return res
      })
    },
    sentVerification() {
      /**
       * 请求限制:
        1分钟内不能超过3次
        1小时内不能超过20次
        1天内不能超过100次
       */
      const data = {
        type: 1, // Number, 0 - 注册、1 - 重置、3 - 注销账号、4 - 验证码登录
        phoneNumber: '+8617720837235' // 或邮箱
      }

      return dispatchRequest(CN + '/v2/user/verification-code', {
        method: 'POST',
        headers: headersFactory('user', data, data.type === 3 ? false : true),
        data
      })
    },
    resetPwd() {
      const data = {
        phoneNumber: '+8617720837235', // 或 email
        verificationCode: '9977',
        password: '12345678'
      }

      const promise = dispatchRequest(CN + '/v2/user/reset-pwd', {
        method: 'POST',
        headers: headersFactory('user', data, true),
        data
      })

      /* get token */
      return promise.then(res => {
        if (res.error === 0 && Object.keys(res.data).length > 0) {
          fs.writeFileSync('env.json', JSON.stringify({
            at: res.data.at,
            rt: res.data.rt,
            user: res.data.user,
            region: res.data.region
          }, null, 2), (err) => {
            if (err) throw err
            console.log('最新 Token 已写入本地')
          })
        }
        return res
      })
    },
    /* 以上是登录前，必须加签名; 以下是登录后，必须加 token */
    changePwd() {
      const data = {
        oldPassword: '12345678c',
        newPassword: '12345678c'
      }

      return dispatchRequest(CN + '/v2/user/change-pwd', {
        method: 'POST',
        headers: headersFactory('user'),
        data
      })
    },
    getUserInfo() {
      // console.log('special: ', headersFactory('user'))
      return dispatchRequest(CN + '/v2/user/profile', {
        method: 'GET',
        headers: headersFactory('user')
      })
    },
    changeUserInfo() {
      const data = { /* 这三个参数都可不传，不传就是不更新 */
        nickname: 'Sadhu',
        acceptEmailAd: false,
        accountConsult: true // 固定值为 true，不可填其它
      }

      return dispatchRequest(CN + '/v2/user/profile', {
        method: 'POST',
        headers: headersFactory('user'),
        data
      })
    },
    /* 异步更新的 at，在 mocha 中可能还没设置好 at 就发其它请求了，mocha 中测试 describe 不按顺序 */
    refreshToken() {
      console.log(getEnv('rt'))
      const data = {
        rt: getEnv('rt')
      }

      const promise = dispatchRequest(CN + '/v2/user/refresh', {
        method: 'POST',
        headers: headersFactory('user'),
        data
      })

      return promise.then(res => {
        if (res.error === 0 && Object.keys(res.data).length > 0) {
          const env = JSON.parse(fs.readFileSync('env.json', 'utf-8'))
          
          env.at = res.data.at
          env.rt = res.data.rt

          fs.writeFileSync('env.json', JSON.stringify(env, null, 2), (err) => {
            if (err) throw err
            console.log('最新 Token 已写入本地')
          })
        }
        return res
      })
    },
    signOut() {
      return dispatchRequest(CN + '/v2/user/logout', {
        method: 'DELETE',
        headers: headersFactory('user')
      })
    },
    destroyAccount() {
      const data = {
        verificationCode: '3899'
      }
      return dispatchRequest(CN + '/v2/user/close-account', {
        method: 'POST',
        headers: headersFactory('user'),
        data
      })
    }
  },
  homePage: {
    reqHome() {
      const data = {
        "lang": "cn",
        "clientInfo": {
          "os": "iOs"
        },
        "getUser": {},
        "getFamily": {},
        "getThing": {
          "num": 10
        },
        "getScene": {},

        "getMessage": {}
      }

      return dispatchRequest(CN + '/v2/homepage', {
        method: 'POST',
        headers: headersFactory('homePage'),
        data
      })
    }
  },
  device: {
    getThingsList() {
      /* Thing包括: 设备（自己的和别人分享的)、设备群组 */
      const params = {
        lang: 'cn',
        // familyid: '' 不传则默认当前家庭
        num: 0, // 获取数量，默认 30, 0 表示所有
        // beginIndex: -9999999 从哪个序号开始获取列表数据，不填就默认这个
      }
      return dispatchRequest(CN + '/v2/device/thing', {
        method: 'GET',
        headers: headersFactory('device'),
        params
      })
    },
    getChooseThing() {
      /* thingList items 数量必须大于 0， 小于等于 10 */
      const data = {
        thingList: [{
          itemType: 1,
          id: '1000d4f0f3' // itemType 为 1 时 -> deviceid，为 3 -> 群组 id
        }]
      }

      return dispatchRequest(CN + '/v2/device/thing', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    getThingStatus() {
      // 设备的状态属性
      const params = {
        type: 1, // 1 - 设备, 2 - 群组
        id: '1000d4f0f3',
        params: 'sledOnline|switch' // 按这种格式，选择要获取哪些状态属性
      }

      return dispatchRequest(CN + '/v2/device/thing/status', {
        method: 'GET',
        headers: headersFactory('device'),
        params
      })
    },
    changeThingStatus() {
      // 设备的状态属性
      const data = {
        type: 1, // 1 - 设备, 2 - 群组
        id: '1000d4f0f3',
        params: { // 更新设备时，会向设备下发控制指令，如果设备不在线或发送失败则返回错误，群组无视"不在线"或"发失败"情况
          switch: 'on'
        }
      }

      return dispatchRequest(CN + '/v2/device/thing/status', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    changeBatchThingStatus() {
      // 该接口会实际向设备下发控制指令，为不能走长连接更新状态的设备准备的
      const data = {
        thingList: [ // 0 < length < 10
          {
            type: 2,
            id: '5fc4b1845a5a2a0007ec8b12',
            params: {
              switch: 'on'
            }
          },
          {
            type: 1,
            id: '1000d4f0f3',
            params: {
              startup: 'on'
            }
          }
        ],
        timeout: 0 // 等待设备响应的时间 默认为 0
      }
      return dispatchRequest(CN + '/v2/device/thing/batch-status', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    addWifiDev() {
      /* 取巧法1,单通道插座 */
      const deviceid = '1000d4f0f3',
            devicekey = "76ef199a-1609-4fce-bdfb-fa7ca7650382",
            chipid = "00E0604B";
      
          
      const data = {
        name: 'Sadhu 单通道',
        deviceid,
        digest: getDigest(deviceid, devicekey),
        chipid
      }

      return dispatchRequest(CN + '/v2/device/add', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    addGsm() {
      // 扫码得到: 'api.coolkit.cc:8080/api/user/device/addGsm?id=625faaf9b71e044c745728c521907abf'
      const id = '625faaf9b71e044c745728c521907abf'

      const data = {
        id,
        name: 'sadhu gsm'
      }

      return dispatchRequest(CN + '/v2/device/add-gsm', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    updateInfo() {
      const data = {
        deviceid: '1000d4f0f3',
        name: '单通道插座 update',
        // roomid: '' 房间id，只能更换到设备所在家庭下的房间，不能跨家庭更改
      }
      return dispatchRequest(CN + '/v2/device/update-info', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    deleteDevice() {
      const params = {
        deviceid: '10009c2bdd'
      }
      return dispatchRequest(CN + '/v2/device', {
        method: 'DELETE',
        headers: headersFactory('device'),
        params
      })
    },
    changeDeviceTags() {
      /* 用于自定义设备功能，如给设备新增一个功能，与服务端约定 'xx' == 'xx' 的 tags，客户端请求该接口把约定字段传过去，服务端就知道目的了 */
      const data = {
        deviceid: '1000d4f0f3',
        type: 'replace', // 不填默认 replace，还可以 merge
        tags: {
          'sadhuTag': 'on'
        }
      }
      return dispatchRequest(CN + '/v2/device/tags', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    getGroupList() {
      const params = {
        lang: 'cn' // 默认 en
      }
      return dispatchRequest(CN + '/v2/device/group', {
        method: 'GET',
        headers: headersFactory('device'),
        params
      })
    },
    addGroup() {
      // 如果使用别人分享的设备作为主设备来新增群组，则当分享撤销时，该群组也会被一并删除
      const data = {
        name: 'sadhu 群组2',
        mainDeviceId: '1000d4f0f3',
        // familyid: '', 群组所属的家庭id，如果为空，表示添加到当前家庭
        // roomid:	''	群组所属的房间id，如果为空，表示添加到【未分配】下
        // sort: 1	给新群组分配序号的方式 1=更小的序号 2=更大的序号
        // deviceidList	Array<String>	创建群组时加入到该群组的设备的id列表，不需要将主设备id传入，如果列表中的设备uiid与主设备的不一致，则不会将该设备添加到群组
      }
      return dispatchRequest(CN + '/v2/device/group', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    changeGroup() {
      // 只能修改群组名称
      const data = {
        id: '5fc4b1845a5a2a0007ec8b12',
        name: '修改第一个群组',
      }
      return dispatchRequest(CN + '/v2/device/group', {
        method: 'PUT',
        headers: headersFactory('device'),
        data
      })
    },
    deleteGroup() {
      const params = {
        id: '5fc4b151d2a2ba0008aabc28',
      }
      return dispatchRequest(CN + '/v2/device/group', {
        method: 'DELETE',
        headers: headersFactory('device'),
        params
      })
    },
    changeGroupStatus() {
      // 只保存数据，不作联动设备状态修改处理
      const data = {
        id: '5fc4b0e51dd83d00086499b4',
        params: {
          switch: "off"
        }
      }
      return dispatchRequest(CN + '/v2/device/group/status', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    addDevInGroup() {
      // 设备 uuid 必须与主设备 uuid 相同
      // 响应更新后的群组的设备列表: updatedThingList
      const data = {
        id: '5fc4b0e51dd83d00086499b4',
        deviceidList: ['1000d4f0f3']	// 设备id列表，数量最小1，最大30
      }
      return dispatchRequest(CN + '/v2/device/group/add', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    deleteDevInGroup() {
      // 响应更新后的群组的设备列表: updatedThingList
      const data = { 
        id: '5fc4b0785a5a2a0007ec8b0f',
        deviceidList: ['1000d4f0f3']	// 设备id列表，数量最小1，最大30
      }
      return dispatchRequest(CN + '/v2/device/group/delete', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    updateGroupsDevices() {
      // 重新覆盖群组内的设备列表
      // 响应更新后的群组的设备列表: updatedThingList
      const data = {
        id: '5fc45473c6ec8400080aa9f9',
        deviceidList: ['1000d4f0f3']	// 设备id列表，必须最少包含群组的主设备deviceid，否则报错
      }
      return dispatchRequest(CN + '/v2/device/group/update', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    shareDev() {
      const data = {
        deviceidList: ['1000d4f0f3'],
        user: {
          countryCode: "+86",
          phoneNumber: "+8618059556779"
        },
        permit: 15,
        comment: 'from sadhu'
      }
      return dispatchRequest(CN + '/v2/device/share', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    changePermit() {
      const data = {
        deviceid: '1000d4f0f3',
        apikey: '9765de04-598a-4ca8-a7aa-e26c73a5d5f6',
        permit: 1
      }
      return dispatchRequest(CN + '/v2/device/share/permit', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    },
    cancelShare() {
      const params = {
        deviceid: '1000d4f0f3',
        apikey: '9765de04-598a-4ca8-a7aa-e26c73a5d5f6'
      }
      return dispatchRequest(CN + '/v2/device/share', {
        method: 'DELETE',
        headers: headersFactory('device'),
        params
      })
    },
    getDevHistory() {
      const params = {
        deviceid: '1000d4f0f3',
        // from	时间戳，精确到毫秒，表示从什么时间开始，获取更早之前的消息，不填则默认为当前时间
        // num	最多拉取的消息数量，1<= num <= 30，不填则默认为30
      }
      return dispatchRequest(CN + '/v2/device/history', {
        method: 'GET',
        headers: headersFactory('device'),
        params
      })
    },
    deleteDevHistory() {
      const params = {
        deviceid: '1000d4f0f3',
      }
      return dispatchRequest(CN + '/v2/device/history', {
        method: 'DELETE',
        headers: headersFactory('device'),
        params
      })
    },
    queryOTA() {
      /* OTA 只应用于固件升级吗。有些设备无升级信息 otaInfoList 是空数组 */
      const data = {
        deviceInfoList: [{
          deviceid: '1000d4f0f3',
          model: 'PSA-B01-GL', // 设备的模块型号
          version: '8' // 当前设备的固件版本号
        }],
      }
      return dispatchRequest(CN + '/v2/device/ota/query', {
        method: 'POST',
        headers: headersFactory('device'),
        data
      })
    }
  },
  family: {
    getFamily() {
      const params = {
        lang: 'cn'
      }
      return dispatchRequest(CN + '/v2/family', {
        method: 'GET',
        headers: headersFactory('family'),
        params
      })
    },
    addHouse() {
      const data = {
        name: 'new House',
        sort: 2, // 1 - 更小的序号， 2 - 更大
        roomNameList: ['one', 'tow'] // 为空则没房间
      }
      return dispatchRequest(CN + '/v2/family', {
        method: 'POST',
        headers: headersFactory('family'),
        data
      })
    },
    addRoom() {
      const data = {
        familyid: '5fc4b075132a4c00079435d5',
        name: 'new four',
        sort: 1, // 1 - 更小的序号， 2 - 更大
      }
      return dispatchRequest(CN + '/v2/family/room', {
        method: 'POST',
        headers: headersFactory('family'),
        data
      })
    },
    changeHouse() {
      // 当前只支持修改家庭名称
      const data = {
        id: '5fc4b075132a4c00079435d5', // 不填则为当前家庭
        name: 'new name'
      }
      return dispatchRequest(CN + '/v2/family', {
        method: 'PUT',
        headers: headersFactory('family'),
        data
      })
    },
    changeRoom() {
      // 当前只支持修改房间名称
      const data = {
        id: '5fc062d7a705f900084af948', // 不填则为当前房间
        name: 'newName'
      }
      return dispatchRequest(CN + '/v2/family/room', {
        method: 'PUT',
        headers: headersFactory('family'),
        data
      })
    },
    sortRoom() {
      // 客户端必须将家庭下的所有房间上传，统一排序
      const data = {
        familyid: '5fc062d7a705f900084af94a', // 不填则为当前家庭
        idList: ['5fc062d7a705f900084af947', '5fc062d7a705f900084af948'] // item 顺序即是排列顺序
      }
      return dispatchRequest(CN + '/v2/family/room/index', {
        method: 'POST',
        headers: headersFactory('family'),
        data
      })
    },
    deleteHouse() {
      const params = {
        id: '5fc4e378c59256000893a14a', // 待删除家庭 id
        deviceFamily: '5fc062d7a705f900084af94a', // 该家庭的设备要迁移的家庭 id
        switchFamily: '5fc062d7a705f900084af94a' // 删除家庭后要切换的 id
      }
      return dispatchRequest(CN + '/v2/family', {
        method: 'DELETE',
        headers: headersFactory('family'),
        params
      })
    },
    deleteRoom() {
      const params = {
        id: '5fc062d7a705f900084af948', // 待删除房间 id
      }
      return dispatchRequest(CN + '/v2/family/room', {
        method: 'DELETE',
        headers: headersFactory('family'),
        params
      })
    },
    sortThingInHouse() {
      // 客户端必须将家庭下的所有设备和群组上传，统一排序
      const data = {
        familyid: '5fc062d7a705f900084af94a', // 待排序设备所在家庭 id
        thingList: [ // 服务端按照列表的顺序对相应位置的id作排序
          {
            itemType: 1,
            id: '1000d4f0f3'
          },
          {
            itemType: 3,
            id: '5fc4b1845a5a2a0007ec8b12'
          },
          {
            itemType: 3,
            id: '5fc4b0e51dd83d00086499b4'
          },
          {
            itemType: 3,
            id: '5fc4b0785a5a2a0007ec8b0f'
          },
          {
            itemType: 3,
            id: '5fc45473c6ec8400080aa9f9'
          }
        ]
      }
      return dispatchRequest(CN + '/v2/family/thing/sort', {
        method: 'POST',
        headers: headersFactory('family'),
        data
      })
    },
    setThingInRoom() {
      /*
      客户端将房间原有的thing列表和调整后的thing列表传入，
      服务端据此计算出要从房间删除的thing，以及要添加到房间的thing。
      客户端应保证oldThingList的正确性，如果有遗漏项，可能导致从房间删除失败；
      如果其中一项不属于roomid所属的房间，服务端返回错误。
      */
     const data = {
       roomid: '5fc062d7a705f900084af947',
       oldThingList: [],
       newThingList: [
         {
           itemType: 3,
           id: '5fc4b0785a5a2a0007ec8b0f'
         }
       ]
     }

     return dispatchRequest(CN + '/v2/family/room/thing', {
       method: 'POST',
       headers: headersFactory('family'),
       data
     })
    },
    switchHouse() {
      const data = {
        id: '5fc062d7a705f900084af94a' // 切换家庭的 id
      }
      return dispatchRequest(CN + '/v2/family/current', {
        method: 'POST',
        headers: headersFactory('family'),
        data
      })
    }
  },
  message: {
    /* 407 - reason: appid 是应用的标识，应用方给你的，登录的时候带上，登录后能请求到的资源对应该 appid 有权限操作的资源 */
    getMessageList() {
      const params = {
        familyid: '5fc062d7a705f900084af94a', // 如果不填则为当前家庭
        from: '1606323142000', // 时间戳，精确到毫秒，表示从什么时间开始，获取更早之前的消息，不填则默认为当前时间
        num: 30 // 拉取数量，不填默认 30， 1 < num < 30
      }
      return dispatchRequest(CN + '/v2/message/read', {
        method: 'GET',
        headers: headersFactory('message'),
        params
      })
    }
  },
  controlDevice: {
    allotService() {
      return dispatchRequest(ALLOT_SERVER_CN, {
        method: 'GET',
        headers: headersFactory('controlDevice'),
        credentials: 'include'  
      })
    }
  }
}

/* websocket 测试 */

const firstData = {
  "action":"userOnline",
  "version":8,
  "ts":parseInt(new Date().getTime()/1000).toString(),
  "at":getEnv('at'),
  "userAgent":"app",
  "apikey":getEnv('user').apikey,
  "appid":"McFJj4Noke1mGDZCR1QarGW7P9Ycp0Vr",
  "nonce":"2plz69ax",
  "sequence":new Date().getTime().toString()
}
function appWS(data) {
  console.log('服务端推送：', data)
}
const ws = new WS('wss://cn-pconnect2.coolkit.cc:8080/api/ws', appWS, 'appServer')

// 握手
ws.connect(firstData)

// 更新设备状态
setTimeout(() => {
  ws.sendHandle({
    "action":"update",
    "deviceid":"1000d4f0f3",
    "apikey":"1c2e1b91-12ee-4f7e-8bfd-79db6bffe835",
    "userAgent":"app",
    "sequence": new Date().getTime().toString(),
    "ts":0,
    "params":{
        "switch": "off" // 单通道设备
    }
  })
}, 2000)

// 查询设备状态
setTimeout(() => {
  ws.sendHandle({
    "action":"query",
    "deviceid":"1000d4f0f3",
    "apikey":"1c2e1b91-12ee-4f7e-8bfd-79db6bffe835",
    "userAgent":"app",
    "sequence": new Date().getTime().toString(),
    "ts":0,
    "params": ['switch', 'fwVersion']
  })
}, 4000)

module.exports = asyncObj