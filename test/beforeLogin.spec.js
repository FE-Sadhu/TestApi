const chai = require('chai')
const asyncObj = require('../src/asyncTest.js')
const expect = chai.expect

describe("酷宅登录前接口测试", function() {
  this.timeout(0)

  before(() => console.info("开始测试"))

  describe("用户类接口测试", () => {
    describe("测试账号登录", () => {

      const api = asyncObj.user.pwdLogin()

      it("成功响应", (done) => {
        api.then((res) => {
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
                .to.have.all.keys("user", "at", "rt", "region");
            done();
        }).catch(err => done(err));
      })

      it("user 字段应当包含的 key", (done) => {
        api.then(res => {
            expect(res.data.user)
                .to.contains.all.keys("apikey","accountLevel");
            done();
        }).catch(err => done(err));
      })
    })
/* 登录前的每个登录相关请求都会改变 at 等信息，故集体跑测试时任选其一登录 */
    describe("测试账号注册", () => {
      const api = asyncObj.user.userRegister()

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
                .to.have.all.keys("user", "at", "rt", "region");
            done();
        }).catch(err => done(err));
      })

      it("user 字段应当包含的 key", (done) => {
        api.then(res => {
            expect(res.data.user)
                .to.contains.all.keys("apikey","accountLevel");
            done();
        }).catch(err => done(err));
      })
    })

    describe("测试验证码登录", () => {
      const api = asyncObj.user.verificationLogin()

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
                .to.have.all.keys("user", "at", "rt", "region");
            done();
        }).catch(err => done(err));
      })

      it("user 字段应当包含的 key", (done) => {
        api.then(res => {
            expect(res.data.user)
                .to.contains.all.keys("apikey", "accountLevel");
            done();
        }).catch(err => done(err));
      })
    })

    describe("测试发送验证码", () => {
      const api = asyncObj.user.sentVerification()

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

    describe("测试重置密码", () => {
      const api = asyncObj.user.resetPwd()

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
                .to.have.all.keys("user", "at", "rt", "region");
            done();
        }).catch(err => done(err));
      })

      it("user 字段应当包含的 key", (done) => {
        api.then(res => {
            expect(res.data.user)
                .to.contains.all.keys("apikey", "accountLevel");
            done();
        }).catch(err => done(err));
      })
    })
  })
  

  after(() => console.info('结束测试'))
})
