// pages/active/active.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content_active:{},
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  goWeb : function (){
   wx.navigateTo({
     url: '../gogo/gogo',
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://www.liangzixiaoying.cn/activity/show',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        WxParse.wxParse('content_active', 'html', res.data.extend.mingActivity.content, that, 5)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  makePhoneCall: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: "18910379279",
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
  copyTBL: function (e) {
    var self = this;
    wx.setClipboardData({
      data: "love-is-space",
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    });
  },
})