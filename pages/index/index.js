// pages/my/my.js
import * as echarts from '../../ec-canvas/echarts';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuTapCurrent: "0",
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    flag: false,
    text: "获取验证码",
    height: "",
    hn: true,
    allMsg: {},
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
    analyses: '',
    analysess: '',
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
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          Dwidth: res.windowWidth,
          Dheight: res.windowHeight
        })
      }
    });
    that.setData({
      allMsg: wx.getStorageSync('content'),
      dateStr: wx.getStorageSync('content').birthday.split("/"),
      analyses: wx.getStorageSync('content').analyses[0].content,
      analysess: wx.getStorageSync('content').analyses[1].content,
    })
    if (wx.getStorageSync('content').analysesConc) {
      that.setData({
        analysesConc: wx.getStorageSync('content').analysesConc[0].content,
        analysesConcs: wx.getStorageSync('content').analysesConc[1].content,
        analysesConcss: wx.getStorageSync('content').analysesConc[2].content,
        analysesChild: wx.getStorageSync('content').analysesChild[0].content,
        analysesChilds: wx.getStorageSync('content').analysesChild[1].content,
      })
    }
    wx.request({
      url: `https://www.liangzixiaoying.cn/test/shareTest/${wx.getStorageSync('content').anaId}`,
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
          ctx.fillText('我', 150, 1018)
          ctx.stroke()
          ctx.draw()
        })
      }
    })

  },
  getContent: function (e) {
    console.log(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.ecComponent = this.selectComponent('#mychart-dom-pie');
    setTimeout(this.getData, 500);
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
  },
  goTwo: function () {
    var that = this
    that.setData({
      menuTapCurrent: "1"
    });
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
    var id = wx.getStorageSync('content').messageId;
    wx.navigateTo({
      url: `../payment/payment?id=${id}&name=${wx.getStorageSync('content').userName}`,
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
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 750,
      height: 1334,
      destWidth: 1500,
      destHeight: 2668,
      canvasId: 'shareImg',
      success: function (res) {
        var ary = []
        ary.push(res.tempFilePath)
        console.log(ary)
        that.setData({
          prurl: ary,
        })
        wx.hideLoading()
        wx.previewImage({
          urls: that.data.prurl // 需要预览的图片http链接列表  
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  getData() {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // 设置参数
      chart.setOption({
        color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 25,
            // roam: true,
            label: {
              normal: {
                show: true
              }
            },
            // edgeSymbol: ['circle', 'arrow'],
            // edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            data: wx.getStorageSync('content').sourceDates,
            circular: {
              rotateLabel: false
            },
            layout: 'circular',
            force: {
              initLayout: 'circular'
            },
            // links: [],
            links: wx.getStorageSync('content').linksDataList,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          }
        ]
      });
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  }

})
