//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {

  },
  //事件处理函数
  
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    });
},
update_phonenumber:function(){
      wx.navigateTo({
        url: '/pages/updatenumbers/update_phonenumbers',
      })  
},
update_schoolnumber:function(){
    wx.navigateTo({
      url: '/pages/updatenumbers/update_schoolnumber',
    })  
}

})
