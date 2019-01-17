//app.js
App({
  data:{
    linksDataList:'',
    sourceDates:'',
    linksDataListS: '',
    sourceDatesS: '',
    chart:null,
    pubUserId:'',
  },
  onLaunch: function (ops) {
    console.log(ops.query, ops)
    // 展示本地存储能力
    wx.setStorageSync('message', ops.query)
    console.log(wx.getStorageSync('message'))
    // 登录
    wx.login({
      success: res => {
        wx.setStorageSync("code", res.code)

      }
    })
    // 登录
    wx.login({
      success: res => {
        wx.setStorageSync("code", res.code)
        // console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: "https://www.liangzixiaoying.cn/login",
          data: {
            'code': res.code,
          },
          method: "POST",
          success(res) {
            console.log(res)
            wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
            // console.log(wx.getStorageSync("sessionid"))
          },
          fail: function () {
            console.log("登陆失败")
          },
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})