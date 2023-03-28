// //logs.js
// var util = require('../../utils/util.js')
// var app = getApp()
// const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
// Page({
//   data: {
//     userInfo: {},
//     hasUserInfo: false,
//     user_imgurl:defaultAvatarUrl,
//     user_wxname:"",
//     theme: wx.getSystemInfoSync().theme,
//   },
//   onChooseAvatar(e) {
//     const { avatarUrl } = e.detail 
//     this.setData({
//       avatarUrl,
//     })
//   },
//   //事件处理函数
//   bindViewTap: function() {
//   },
//   onLoad: function (options) {
//       var that=this
//     this.setData({
//       navH: app.globalData.navHeight
//     });
//     wx.onThemeChange((result) => {
//         this.setData({
//           theme: result.theme
//         })
//       })
//     if (wx.getUserProfile) {
//       this.setData({
//         canIUseGetUserProfile: true
//       })
// }
// },
// signup: function (e) {
//     // 发起网络请求
//     wx.navigateTo({
//     // 开发者服务器接口地址
//       url: '/pages/signup/index',
//     })
//   },
// getUserProfile(e) {
//   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
//   wx.getUserProfile({
//     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
//     success: (res) => {
//     app.globalData.haslogin=true;
//     //已经登录成功
//       console.log(res)
//       this.setData({
//         userInfo: res.userInfo,
//         hasUserInfo: true
//       })
//       wx.showModal({
//         title:'授权成功',
//         content:'已同步您的微信头像及昵称',
//         showCancel:false
//       })
//       wx.request({
//         url: 'https://www.scnusay.cc/signup/saveimgandname.php',
//         method:"POST",
//         data:{
//             'user_imgurl':res.userInfo.avatarUrl,
//             'user_wxname':res.userInfo.nickName,
//             'openid':app.globalData.openid
//         },
//         header: {
//             'content-type': 'application/x-www-form-urlencoded'  
//           },
//           success(res){
//               console.log(res.data);
//           }
//       })
//     }
//   })
// },
// })
const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({
  data: {
    user_wxname: "",
    avatarUrl: defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,
  },
  onLoad() {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
  },
  inputCom: function (e) {
    this.setData({
      user_wxname: e.detail.value
    })
    console.log(this.data.inputvalue);
  },

  confirmlogin: function (e) {
    if (this.data.user_wxname == '') {
      //用户评论输入内容为空时弹出
      wx.showToast({
        title: '请输入内容', //提示内容
        icon: 'none' //提示图标
      })
    } else if (this.data.user_wxname == null) {
      //用户评论输入内容为空时弹出
      wx.showToast({
        title: '请输入内容', //提示内容
        icon: 'none' //提示图标
      })
    } else if (this.data.user_wxname.length > 15) {
      wx.showToast({
        title: '输入内容过长',
        icon: 'none'
      });
    } else {
      wx.uploadFile({
        filePath: this.data.avatarUrl,
        name: 'file',
        url: 'https://www.scnusay.cc/signup/saveimgandname.php',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          'user_wxname': this.data.user_wxname,
          "openid": app.globalData.openid,

        },
        success: function (res) {
          console.log(res.data)
          wx.showModal({
            title: '授权成功',
            content: '已同步您的微信头像及昵称',
            showCancel: false
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index3',
            })
          }, 1000)


        },
        fail: function (res) {
          console.log(123456);
        }
      })

      // wx.request({
      //   url: 'https://www.scnusay.cc/signup/saveimgandname.php',
      //   method: "POST",
      //   data: {
      //     //'user_imgurl':res.userInfo.avatarUrl,

      //     'user_wxname': this.data.user_wxname,
      //     'openid': app.globalData.openid
      //   },
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded'
      //   },
      //   success(res) {
      //     console.log(res.data);
      //     wx.showModal({
      //       title: '授权成功',
      //       content: '已同步您的微信头像及昵称',
      //       showCancel: false
      //     })
      //   }
      // })
    }
  },

  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
  }
})
