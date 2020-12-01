const chai = require('chai')
const asyncObj = require('../src/asyncTest.js')
const expect = chai.expect


describe("酷宅登录后接口测试 \n", function() {
  this.timeout(0)
  before(() => console.info("开始测试"))
  
  describe("用户类接口测试", () => {
    describe("测试修改密码", function () {
      const api = asyncObj.user.changePwd()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试获取用户信息", function () {
      const api = asyncObj.user.getUserInfo()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data)
              .to.have.all.keys("user", "region")
          done()
        }).catch(err => done(err))
      })
      it("user 字段至少包含的 key", (done) => {
        api.then(res => {
            expect(res.data.user)
                .to.contains.all.keys("apikey","accountLevel");
            done();
        }).catch(err => done(err));
      })
    })

    describe("测试更新用户信息", function () {
      const api = asyncObj.user.changeUserInfo()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })

    describe.skip("测试刷新认证 Token", function () {
      const api = asyncObj.user.refreshToken()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data)
              .to.have.all.keys("at", "rt")
          done()
        }).catch(err => done(err))
      })
    })

    describe.skip("测试退出登录", function () {
      const api = asyncObj.user.signOut()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })

    describe.skip("测试注销账号", function () {
      const api = asyncObj.user.destroyAccount()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })
  })

  describe("首页类接口测试", () => {
    describe("测试获取首页信息", function () {
      const api = asyncObj.homePage.reqHome()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data)
              .to.have.all.keys("userInfo", "familyInfo", "thingInfo", "sceneInfo", "messageInfo")
          done()
        }).catch(err => done(err))
      })
    })
  })
  
  describe("设备类接口测试", () => {
    describe("测试获取 Things 列表", function () {
      const api = asyncObj.device.getThingsList()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data)
              .to.have.all.keys("thingList", "total")
          done()
        }).catch(err => done(err))
      })
      it("thingList 字段应当是一个数组", (done) => {
        api.then(res => {
          expect(res.data.thingList)
              .to.be.an("array")
          done()
        }).catch(err => done(err))
      })
      it("thingList 有值的话每个 item 应该包含的 key", (done) => {
        api.then(res => {
          if (res.data.thingList.length > 0) {
            expect(res.data.thingList[0])
              .to.have.all.keys("itemType", "itemData", "index")
          } else {
            expect(1).to.equal(1)
          }
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试获取指定 Thing", function () {
      const api = asyncObj.device.getChooseThing()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data)
              .to.have.all.keys("thingList")
          done()
        }).catch(err => done(err))
      })
      it("thingList 字段应当是一个数组", (done) => {
        api.then(res => {
          expect(res.data.thingList)
              .to.be.an("array")
          done()
        }).catch(err => done(err))
      })
      it("thingList 有值的话每个 item 应该包含的 key", (done) => {
        api.then(res => {
          if (res.data.thingList.length > 0) {
            expect(res.data.thingList[0])
              .to.have.all.keys("itemType", "itemData", "index")
          } else {
            expect(1).to.equal(1)
          }
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试获取设备或群组的状态", function () {
      const api = asyncObj.device.getThingStatus()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data)
              .to.have.all.keys("params")
          done()
        }).catch(err => done(err))
      })
      it("params 字段应当是一个对象", (done) => {
        api.then(res => {
          expect(res.data.params)
              .to.be.an("object")
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试更新设备或群组的状态", function () {
      const api = asyncObj.device.changeThingStatus()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试批量更新设备或群组的状态", function () {
      const api = asyncObj.device.changeBatchThingStatus()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('respList')
          done()
        }).catch(err => done(err))
      })
      it("respList 应该是一个数组", (done) => {
        api.then(res => {
          expect(res.data.respList).to.be.an('array')
          done()
        }).catch(err => done(err))
      })
      it("respList 每个 item 应该包含的 key", (done) => {
        api.then(res => {
          expect(res.data.respList[0]).to.have.all.keys('error', 'id', 'type')
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试添加 Wifi 设备", function () {
      const api = asyncObj.device.addWifiDev()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('itemType', 'itemData', 'index')
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试添加 GSM 设备", function () {
      const api = asyncObj.device.addGsm()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('itemType', 'itemData', 'index')
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试更新设备的名称/房间信息", function () {
      const api = asyncObj.device.updateInfo()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试删除设备", function () {
      const api = asyncObj.device.deleteDevice()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试修改设备标签", function () {
      const api = asyncObj.device.changeDeviceTags()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('updatedThing')
          done()
        }).catch(err => done(err))
      })
      it("updatedThing 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data.updatedThing).to.have.all.keys('itemType', 'itemData', 'index')
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试获取设备群组列表", function () {
      const api = asyncObj.device.getGroupList()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('groupList')
          done()
        }).catch(err => done(err))
      })
      it("groupList 每个 item 应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data.groupList[0]).to.have.all.keys('itemType', 'itemData', 'index')
          done()
        }).catch(err => done(err))
      })
      it("itemData 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data.groupList[0].itemData).to.have.all.keys('id', 'name', 'mainDeviceId', 'family', 'params')
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试新增设备群组", function () {
      const api = asyncObj.device.addGroup()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('itemType', 'itemData', 'index')
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试修改设备群组", function () {
      const api = asyncObj.device.changeGroup()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试删除设备群组", function () {
      const api = asyncObj.device.deleteGroup()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试更改群组状态", function () {
      const api = asyncObj.device.changeGroupStatus()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试群组新增设备", function () {
      const api = asyncObj.device.addDevInGroup()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('updatedThingList')
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试群组删除设备", function () {
      const api = asyncObj.device.deleteDevInGroup()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('updatedThingList')
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试更新群组设备列表", function () {
      const api = asyncObj.device.updateGroupsDevices()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('updatedThingList')
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试设备分享", function () {
      const api = asyncObj.device.shareDev()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('updatedThingList')
          done()
        }).catch(err => done(err))
      })
      it("itemData 字段必须包含 shareTo 属性", (done) => {
        api.then(res => {
          expect(res.data.updatedThingList[0].itemData)
            .to.contains.all.keys('shareTo')
          done()
        }).catch(err => done(err))
      })
      it("shareTo 字段必须包含 apikey 、permit 属性", (done) => {
        api.then(res => {
          expect(res.data.updatedThingList[0].itemData.shareTo)
            .to.contains.all.keys('apikey', 'permit')
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试修改设备分享的权限", function () {
      const api = asyncObj.device.changePermit()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('updatedThing')
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试取消设备分享", function () {
      const api = asyncObj.device.cancelShare()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('updatedThing')
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试获取设备的历史记录", function () {
      const api = asyncObj.device.getDevHistory()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('histories')
          done()
        }).catch(err => done(err))
      }) 
      it("histories 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.contains.all.keys('deviceid', 'request', 'opsTime')
          done()
        }).catch(err => done(err))
      })
      
    })
  
    describe("测试删除设备的历史记录", function () {
      const api = asyncObj.device.deleteDevHistory()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试查询设备的 OTA 信息", function () {
      const api = asyncObj.device.queryOTA()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('otaInfoList')
          done()
        }).catch(err => done(err))
      })
    })
  
  })

  describe("家庭和房间接口测试", () => {
    
    describe("测试获取家庭和房间列表", function () {
      const api = asyncObj.family.getFamily()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('currentFamilyId', 'familyList')
          done()
        }).catch(err => done(err))
      })
      it("familyList 每个 item 应该包含的 key", (done) => {
        api.then(res => {
          expect(res.data.familyList[0])
            .to.have.all.keys('apikey', 'id', 'name', 'index', 'roomList')
          done()
        }).catch(err => done(err))
      })
      it("如果有房间的话，roomList 每个 item 应该包含的 key", (done) => {
        api.then(res => {
          expect(res.data.familyList[0].roomList)
            .to.have.all.keys('id', 'name', 'index')
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试新增家庭", function () {
      const api = asyncObj.family.addHouse()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.contains.all.keys('id', 'index', 'name')
          done()
        }).catch(err => done(err))
      })
      it("如果有房间的话，roomList 每个 item 应该包含的 key", (done) => {
        api.then(res => {
          expect(res.data.roomList[0])
            .to.have.all.keys('id', 'name', 'index')
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试新增房间", function () {
      const api = asyncObj.family.addRoom()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应当包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.contains.all.keys('id', 'index', 'name')
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试修改家庭信息", function () {
      const api = asyncObj.family.changeHouse()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试修改房间信息", function () {
      const api = asyncObj.family.changeRoom()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试对房间作排序", function () {
      const api = asyncObj.family.sortRoom()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })
    
    describe.skip("测试删除家庭", function () {
      const api = asyncObj.family.deleteHouse()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })
  
    describe.skip("测试删除房间", function () {
      const api = asyncObj.family.deleteRoom()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })

    describe("测试对家庭下的Thing做排序", function () {
      const api = asyncObj.family.sortThingInHouse()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试设置房间的 Thing", function () {
      const api = asyncObj.family.setThingInRoom()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })
  
    describe("测试切换当前家庭", function () {
      const api = asyncObj.family.switchHouse()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段无数据", (done) => {
        api.then(res => {
          expect(res.data).to.be.empty
          done()
        }).catch(err => done(err))
      })
    })
  
  })

  describe("消息中心接口测试", () => {
    describe.skip("测试获取通知消息列表", function () {
      const api = asyncObj.message.getMessageList()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应该包含的 key", (done) => {
        api.then(res => {
          expect(res.data).to.have.all.keys('messageList')
          done()
        }).catch(err => done(err))
      })
      it("messageList 每个 item 应该包含的 key", (done) => {
        api.then(res => {
          expect(res.data.messageList[0])
            .to.have.all.keys('msgid', 'msgType', 'message', 'date')
          done()
        }).catch(err => done(err))
      })
    })

  })

  describe("设备管理与控制测试", () => {

    describe("测试分配服务", function () {
      const api = asyncObj.controlDevice.allotService()

      it("成功响应", (done) => {
        api.then(res => {
          expect(res.error).to.equal(0)
          done()
        }).catch(err => done(err))
      })
      it("接口应当返回一个 json 对象", (done) => {
        api.then(res => {
          expect(res).to.be.an("object")
          done()
        }).catch(err => done(err))
      })
      it("data 字段应该包含的 key", (done) => {
        api.then(res => {
          expect(res.data)
            .to.have.all.keys('IP', 'port', 'domain', 'error', 'reason')
          done()
        }).catch(err => done(err))
      })
    })
    
  })

  after(() => console.info('结束测试'))
})