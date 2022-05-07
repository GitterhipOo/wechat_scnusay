//logs.js
var util = require('../../utils/util.js')
var app = getApp()
var openid
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ishide:false,
    openidget:false,
  },
  //事件处理函数
  bindViewTap: function() {
  },
  onLoad: function (options) {
      var that=this
    this.setData({
      navH: app.globalData.navHeight
    });
    // onload时候自动发送code 拿到openid
    wx.login({
      success(res){
          if(res.code)
          {
            console.log('code为'+res.code+'\n')
              wx.request({
                url: 'https://www.scnusay.cc/login/login.php',
                method:"POST",
                data:{
                    code:res.code
                },
                header: { 
                    "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
                },
                success(res){
                    console.log(res.data);
                    openid=res.data;
                    console.log(openid);
                }
              })
          }else{
              console.log('登陆失败！'+res.errMsg)
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
//   跳转去更新资料的页面
wx.getUserProfile({
    desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      console.log(res)
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
      wx.showModal({
        title:'授权成功',
        content:'已同步您的微信头像及昵称',
        showCancel:false
      })
    //   onload 已经拿到了openid
    //   
      wx.request({
        url: 'https://www.scnusay.cc/login/login.php',
        method:"POST",
        data:{
            'user_imgurl':res.userInfo.avatarUrl,
            'user_wxname':res.userInfo.nickName,
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded'  
          },
          success(res){
              console.log(res.data);
          }
      })
    }
  })
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
