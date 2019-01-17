// pages/ proficient/ proficient.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:"http://liangzixiaoying.cn/mingxinImg/20180531143220.jpg",
    imgalist: ["http://liangzixiaoying.cn/mingxinImg/20180531143220.jpg"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  makePhoneCall: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: "13146269580",
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
  copyTBL: function (e) {
    var self = this;
    wx.setClipboardData({
      data: "a13146269580",
      success: function (res) {
        // self.setData({copyTip:true}),  
        wx.showToast({
          title: '复制成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    });
  }  ,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgalist // 需要预览的图片http链接列表  
    })
  } 
})