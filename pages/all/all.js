// pages/my/my.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuTapCurrent: "1",
    flag: false,
    text: "获取验证码",
    height: "",
    hn: true,
    allMsg: {},
    Dwidth: '',
    Dheight: '',
    date: '',
    dateStr: [],
    hide: true,
    msg: {},
    question: '',
    answer: '',
    anaId: '',
    prurl: [],
    url: '',
    shareData: {},
    analyses: [],
    analysess: [],
    analysesConc: [],
    analysesConcs: [],
    analysesConcss: [],
    analysesChild: [],
    analysesChilds: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id;
    if (id) {
      wx.getSystemInfo({
        success: function (res) {

          console.log(res);
          console.log(res.model);
          console.log(res.pixelRatio);
          console.log(res.windowWidth);
        }
      });
      wx.request({
        url: `https://www.liangzixiaoying.cn/test/doTestByMsgId/${id}`,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync("sessionid")
        },
        success(res) {
          that.setData({
            hidden: false,
            allMsg: res.data.extend.testResult,
            anaId: res.data.extend.testResult.anaId,
            dateStr: res.data.extend.testResult.birthday.split("/"),
            analyses: res.data.extend.testResult.analyses[0].content,
            analysess: res.data.extend.testResult.analyses[1].content,
          })

          if (res.data.extend.testResult.analysesConc) {
            that.setData({
              analysesConc: res.data.extend.testResult.analysesConc[0].content,
              analysesConcs: res.data.extend.testResult.analysesConc[1].content,
              analysesConcss: res.data.extend.testResult.analysesConc[2].content,
              analysesChild: res.data.extend.testResult.analysesChild[0].content,
              analysesChilds: res.data.extend.testResult.analysesChild[1].content,
            })
          }
          getApp().data.sourceDatesS = res.data.extend.testResult.sourceDates,
            getApp().data.linksDataListS = res.data.extend.testResult.linksDataList
          that.init
          wx.setStorageSync('keys', that.data.allMsg)
          wx.request({
            url: `https://www.liangzixiaoying.cn/test/shareTest/${res.data.extend.testResult.anaId}`,
            header: {
              'content-type': 'application/json',
              'cookie': wx.getStorageSync("sessionid")
            },
            method: "GET",
            success(res) {
              that.setData({
                shareData: res.data.extend.shareData
              })

              let promise = new Promise(function (resolve, reject) {
                wx.getImageInfo({
                  src: '../../image/share4.png',
                  success: function (res) {
                    console.log(res)
                    that.setData({
                      url: res.path
                    })
                    resolve(res);
                  }
                })
              });
              //主要就是计算好各个图文的位置
              Promise.all([
                promise
              ]).then(res => {
                const ctx = wx.createCanvasContext('shareImg')
                //主要就是计算好各个图文的位
                ctx.drawImage('../../' + that.data.url, 0, 0, 750, 1334)
                ctx.setTextAlign('center')
                ctx.setFontSize(30)
                ctx.setFillStyle('#000000')
                ctx.fillText(that.data.shareData.numName, 370, 252)
                ctx.setFontSize(300)
                ctx.setFillStyle('#000000')
                ctx.fillText(that.data.shareData.number, 370, 550)
                ctx.setTextAlign('left')
                ctx.setFontSize(36)
                ctx.setFillStyle('#000000')
                ctx.fillText(that.data.shareData.title, 125, 650)
                ctx.setFontSize(25)
                ctx.setFillStyle('#000000')
                ctx.setTextAlign('left')
                ctx.fillText(that.data.shareData.content[0], 125, 700)
                ctx.fillText(that.data.shareData.content[1], 125, 730)
                if (that.data.shareData.content[2]) {
                  ctx.fillText(that.data.shareData.content[2], 125, 760)
                }
                if (that.data.shareData.content[3]) {
                  ctx.fillText(that.data.shareData.content[3], 125, 790)
                }
                if (that.data.shareData.content[4]) {
                  ctx.fillText(that.data.shareData.content[4], 125, 820)
                }
                ctx.setFontSize(20)
                ctx.setTextAlign('center')
                ctx.setFillStyle('#72AB9C')
                ctx.fillText(that.data.allMsg.userName, 110, 1018)
                ctx.stroke()
                ctx.draw()
              })
            }
          })
        }
      })
    } else {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            Dwidth: res.windowWidth,
            Dheight: res.windowHeight
          })
        }
      });
      that.setData({
        msg: wx.getStorageSync('MSG')
      })
      wx.request({
        url: "https://www.liangzixiaoying.cn/test/doTest",
        data: {
          "userName": that.data.msg.userName,
          "birthday": that.data.msg.birthdayStr,
          "gender": that.data.msg.gender,
          "userNamePinyin": that.data.msg.userNamePinyin,
          "status": that.data.msg.status,
          "id": that.data.msg.id,
        },
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync("sessionid")
        },
        method: "POST",
        success(res) {
          that.setData({
            hidden: false,
            allMsg: res.data.extend.testResult,
            anaId: res.data.extend.testResult.anaId,
            dateStr: res.data.extend.testResult.birthday.split("/"),
            analyses: res.data.extend.testResult.analyses[0].content,
            analysess: res.data.extend.testResult.analyses[1].content,
          })
          if (res.data.extend.testResult.analysesConc) {
            that.setData({
              analysesConc: res.data.extend.testResult.analysesConc[0].content,
              analysesConcs: res.data.extend.testResult.analysesConc[1].content,
              analysesConcss: res.data.extend.testResult.analysesConc[2].content,
              analysesChild: res.data.extend.testResult.analysesChild[0].content,
              analysesChilds: res.data.extend.testResult.analysesChild[1].content,
            })
          }
          getApp().data.sourceDatesS = res.data.extend.testResult.sourceDates,
            getApp().data.linksDataListS = res.data.extend.testResult.linksDataList
          wx.request({
            url: `https://www.liangzixiaoying.cn/test/shareTest/${res.data.extend.testResult.anaId}`,
            header: {
              'content-type': 'application/json',
              'cookie': wx.getStorageSync("sessionid")
            },
            method: "GET",
            success(res) {
              that.setData({
                shareData: res.data.extend.shareData
              })

              let promise = new Promise(function (resolve, reject) {
                wx.getImageInfo({
                  src: '../../image/share4.png',
                  success: function (res) {
                    console.log(res)
                    that.setData({
                      url: res.path
                    })
                    resolve(res);
                  }
                })
              });
              //主要就是计算好各个图文的位置
              Promise.all([
                promise
              ]).then(res => {
                const ctx = wx.createCanvasContext('shareImg')
                //主要就是计算好各个图文的位
                ctx.drawImage('../../' + that.data.url, 0, 0, 750, 1334)
                ctx.setTextAlign('center')
                ctx.setFontSize(30)
                ctx.setFillStyle('#000000')
                ctx.fillText(that.data.shareData.numName, 370, 252)
                ctx.setFontSize(300)
                ctx.setFillStyle('#000000')
                ctx.fillText(that.data.shareData.number, 370, 550)
                ctx.setTextAlign('left')
                ctx.setFontSize(36)
                ctx.setFillStyle('#000000')
                ctx.fillText(that.data.shareData.title, 125, 650)
                ctx.setFontSize(25)
                ctx.setFillStyle('#000000')
                ctx.setTextAlign('left')
                ctx.fillText(that.data.shareData.content[0], 125, 700)
                ctx.fillText(that.data.shareData.content[1], 125, 730)
                if (that.data.shareData.content[2]) {
                  ctx.fillText(that.data.shareData.content[2], 125, 760)
                }
                if (that.data.shareData.content[3]) {
                  ctx.fillText(that.data.shareData.content[3], 125, 790)
                }
                if (that.data.shareData.content[4]) {
                  ctx.fillText(that.data.shareData.content[4], 125, 820)
                }
                ctx.setFontSize(25)
                ctx.setTextAlign('left')
                ctx.setFillStyle('#72AB9C')
                ctx.fillText(that.data.msg.userName, 110, 1018)
                ctx.stroke()
                ctx.draw()
              })
            }
          })

        },
        fail: function () {
          console.log("登陆失败")
        },
      })
    }
    that.init

  },
  getContent: function (e) {
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
  menuTap: function (e) {
    var current = e.currentTarget.dataset.current;//获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent: current
    });
    // if (e.currentTarget.dataset.current == 0){
    //   setTimeout(this.getData, 500);
    // }
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
    wx.switchTab({
      url: '../my/my',
    })
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
  goShen: function () {
    this.setData({
      menuTapCurrent: 1
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '赶快来测一测吧',
      path: '/pages/login/login',
      success: function (res) {
      }
    }
  },
  goPay: function () {
    var that = this
    var id = that.data.msg.id;
    wx.navigateTo({
      url: `../payment/payment?id=${id}&name=${that.data.msg.userName}`,
    })
  },
  goProficient: function () {
    wx.switchTab({
      url: '../proficient/proficient',
    })
  },
  getImage: function () {
    var that = this
    wx.showLoading({
      title: '努力生成中...',
      success: function (e) {
        console.log(e)
      }
    })
  },
})
