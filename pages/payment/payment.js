// pages/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    flags: false,
    type: '',
    answer: '',
    id: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var types = options.name
    var id = options.id
    var that = this;
    that.setData({
      name: types,
      id: id,
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
  getflag: function (e) {
    console.log(e.target.dataset.text)
    this.setData({
      flag: !this.data.flag,
      flags: !this.data.flags,
    })
  },
  getflags: function (e) {
    console.log(e.target.dataset.text)
    this.setData({
      flags: !this.data.flags,
      flag: !this.data.flag,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goPayment: function () {
    var that = this
    wx.login({
      success(res) {
        wx.request({
          url: 'https://www.liangzixiaoying.cn/pay/initiate',
          data: {
            'code': res.code,
            'messageId': that.data.id
          },
          method: "POST",
          header: {
            'content-type': 'application/json',
            'cookie': wx.getStorageSync("sessionid")
          },
          success(res) {
            var payModel = res.data.extend.orderReturn;
            wx.requestPayment({
              'timeStamp': payModel.timeStamp,
              'nonceStr': payModel.nonceStr,
              'package': payModel.p_package,
              'signType': 'MD5',
              'paySign': payModel.paySign,
              'success': function (res) {
                console.log(res)
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.navigateTo({
                  url: `../all/all?id=${that.data.id}`,
                })
              },
              'fail': function (res) {
              }
            })
          }
        })

      }
    })
  },
})