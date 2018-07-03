//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scan: function(token) {
    var that = this;
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    var tex = '支付宝到账，100000，元';
    var tok = token;
    var cuid = app.globalData.appId;
    innerAudioContext.src = 'https://tsn.baidu.com/text2audio?tex=' + tex + '&lan=zh&cuid=' + cuid + '&ctp=1&tok=' + tok;
    innerAudioContext.onPlay(() => {
      console.log(tex);
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    // wx.scanCode({
    //   success: (res) => {;
    //     wx.showModal({
    //       title: '提示',
    //       content: res.result,
    //       success: function (res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定')
    //         } else if (res.cancel) {
    //           console.log('用户点击取消')
    //         }
    //       }
    //     });
    //   },
    //   fail: (res) => {
    //     wx.showToast({
    //       title: '失败',
    //       icon: 'success',
    //       duration: 2000
    //     });
    //   }
    // })
  },
  getBaiduToken: function() {
    var that = this;
    var client_id = app.globalData.appKey;
    var client_secret = app.globalData.secretKey;
    wx.request({
      url: 'https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
      success: function(res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.scan(res.data.access_token);
        }
      }
    })
  }
})