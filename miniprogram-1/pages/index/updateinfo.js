//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userphone:"",
    userschoolnumber:"",
  },
  //事件处理函数
  
  onLoad: function (options) {
    var that=this
    this.setData({
      navH: app.globalData.navHeight
    });
    wx.request({
      url: 'https://www.scnusay.cc/updateinfo/getnumberstowx.php',
      method:"POST",
      data:{
        'openid':app.globalData.openid
      },
        header: {
            'content-type': 'application/x-www-form-urlencoded'  
        },
        success(res){
            console.log(res.data);
            if(res.data=="noinfo")
            {
                that.setData({
                    userphone:"No phone",
                    userschoolnumber:"NO schoolnumber",
                })
            }
            else{
                that.setData({
                    userphone:res.data['userphone'],
                    userschoolnumber:res.data['scnu_number'],

                    })
            }
        }
        })
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
