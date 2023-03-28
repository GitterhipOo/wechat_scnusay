//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ishide:false,
    openidget:false,
    headimgurl:"https://s1.328888.xyz/2022/10/13/8y8ZI.png",
    username:"",
    doihaveinfo:false,
  },
  //事件处理函数
  bindViewTap: function() {
  },
  onLoad: function (options) {
      console.log("global.openid为"+app.globalData.openid)
      var that=this
    this.setData({
      navH: app.globalData.navHeight,
    });
    // onload时候查询服务器是否有对应的头像
    //如果没有 havainfo为假 引导用户登录页面
    //如果有 havainfo为真  进入用户主页
    wx.request({
        url: 'https://www.scnusay.cc/login/onload.php',
        method:"POST",
        data:{
            'openid':app.globalData.openid
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded'  
          },
        success(res){
            console.log(res.data);
            //app.globalData.headurl=res.data
            console.log(res.data['user_imgurl']);
            //后面返回的json
            app.globalData.headurl=res.data['user_imgurl'];
            app.globalData.wxname=res.data['user_wxname'];

            that.setData({
                headimgurl:app.globalData.headurl,
                username:app.globalData.wxname,
                doihaveinfo:true,
                
            })
            
            //同步返回的数据到全局数据里面 作为用户的头像储存
        }
    })
},
onShow:function(){
    this.onLoad();
},
logo: function (e) {
  // 发起网络请求
  wx.navigateTo({
  // 开发者服务器接口地址
    url: '/pages/index/index',
  })
},
enroll: function (e) {

  wx.navigateTo({
    // 开发者服务器接口地址
      url: '/pages/updatewxinfo/updatewxinfo',
    })
},
userknow:function(e){
    wx.navigateTo({
        // 开发者服务器接口地址
          url: '/pages/userknow/userknow',
        })
},
contactus:function(e){
    wx.navigateTo({
        // 开发者服务器接口地址
          url: '/pages/index/contactus',
        })
},
aboutus:function(e){
    wx.navigateTo({
        // 开发者服务器接口地址
          url: '/pages/index/aboutus',
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
,
updateinfo:function(e){
    wx.navigateTo({
      url: '/pages/index/updateinfo',
    })
},
User_Privacy:function(e){
    wx.navigateTo({
      url: '/pages/index/userprivacy',
    })
}
})
