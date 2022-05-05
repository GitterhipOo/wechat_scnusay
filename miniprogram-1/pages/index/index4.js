//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true 
  },
  //事件处理函数
  bindViewTap: function() {
  },
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    });
    var that=this;
    wx.getSetting({
      success:function(res){
          console.log(res);
          console.log(that.data.isHide);
        if (!res.authSetting['scope.userInfo']) {
            // 还未授权，显示授权按钮
            that.setData({
             isHide: true
            });
      }else {
        // 已授权，隐藏授权按钮，显示正文
        that.setData({
         isHide: false
        });
        console.log(that.data.isHide);
        }
      }
    })
},
logo: function (e) {
  // 发起网络请求
  wx.navigateTo({
  // 开发者服务器接口地址
    url: '/pages/index/index',
  })
},
enroll: function (e) {
  // 发起网络请求
  wx.navigateTo({
  // 开发者服务器接口地址
    url: '/pages/index/login',
  })
},
getUserProfile(e) {
  // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  wx.getUserProfile({
    desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      console.log(res)
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
    }
  })
}
})
