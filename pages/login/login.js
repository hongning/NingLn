const app = getApp();
// pages/login/login.js
Page({
  data: {
    items: [
      { name: '1', value: '男', checked:false},
      { name: '2', value: '女', checked:false},
    ],
    value:'',
    vaule1:'',
    gender:'',
    birthday:'',
    userName:'',
    status:0,
    id:null
  },
  goIndex:function(){
    var that = this
    wx.request({
      url: "https://www.liangzixiaoying.cn/test/doTest",
      data: { 
        "userName": that.data.userName,
        "birthday": that.data.value,
        "gender":that.data.gender,
        "userNamePinyin":that.data.value1,
        "status": that.data.status,
        "id": that.data.id
       },
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      method: "POST",
      success(res) {
        wx.setStorageSync("content", res.data.extend.testResult)
        if(res.data.code == 200){
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        }else{
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          wx.navigateTo({
            url: '../index/index?date=' + that.data.value,
          })
        }
      },
         fail: function (res) {
        console.log(121,res)
      }, 
    })
  },
  listenerpinInput:function(e){
    var that = this
    that.setData({
      value1: e.detail.value
    })
  },
  listenernameInput:function(e){
    var that = this
    wx.request({
      url: "https://www.liangzixiaoying.cn/test/getPinYin",
      data: { "userName": e.detail.value} ,
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      method:"POST",
      success(res){
        that.setData({
          value1: res.data.extend.mingUserMessage.userNamePinyin,
          userName: e.detail.value 
        })

      },
      fail: function (res) {
        console.log(res)
      }, 
    })
  },
  listenerdateInput:function(e){
    wx.hideKeyboard()
    var that = this
    that.setData({
      birthday: e.detail.value
    })
  },
  getDate:function(e){
    var that = this
    that.setData({
      value: e.detail.value
    })
   
  },
  radioChange:function(e){
    wx.hideKeyboard();
    console.log(e.detail.value)
    this.setData({
      gender: e.detail.value
    })
  },
  goAbout:function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  goProficient:function(){
    wx.switchTab({
      url: '../proficient/proficient',
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '赶快来测一测吧',
      path: '/pages/login/login',
      success: function (res) {
      }
    }
  },
  onShow: function () {
    if (app.data.pubUserId!=""){
      var userID = app.data.pubUserId;
      app.data.pubUserId="";
      var that = this;
      wx.request({
        url: `https://www.liangzixiaoying.cn/test/doTestByMsgId/${userID}`,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync("sessionid")
        },
        success(res) {
          console.log(res);
          var up1 = "items[" + 0 + "].checked";
          var up2 = "items[" + 1 + "].checked";
          if (res.data.extend.testResult.gender==1){
            that.setData({
              [up1]: true,
              [up2]: false,
            })
          } else if (res.data.extend.testResult.gender == 2){
            that.setData({
              [up1]: false,
              [up2]: true,
            })
          }
          var abc=res.data.extend.testResult.birthday.split("/").join("-");
          that.setData({
            userName: res.data.extend.testResult.userName,
            value1: res.data.extend.testResult.userNamePinyin,
            value: abc,
            status: res.data.extend.testResult.status,
            gender: res.data.extend.testResult.gender,
            id: res.data.extend.testResult.messageId
          })
        }
      })    
    }
  }
})