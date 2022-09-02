// pages/updatenumbers/update_phonenumbers.js
var app=getApp();
Page({
    data: {
        userphone:"",
        schoolnumber:"",
    },
    phoneInput:function(e){
        // 获取 input 输入框的值
        if(e.detail.value){
                this.data.userphone=e.detail.value
        }
      },
      schoolnumberInput:function(e){
        console.log(e.detail.value)
        // 获取 input 输入框的值
        if(e.detail.value){
                this.data.schoolnumber=e.detail.value
        }
      },
    update_phonenumber:function(e){  
        console.log(e);
        console.log(this.data.schoolnumber);
        var that = this;
        if(that.data.userphone== ''){
          wx.showModal({
            title: '提示',
            content: '请输入手机号码',
            showCancel:false,
            success (res) {
            }
          })
        }else if(that.data.userphone.length != 11)
        {
          wx.showModal({
            title: '提示',
            content: '手机号位数不正确，请重新输入',
            showCancel:false,
            success (res) {
            }
          })
        } else if(that.data.schoolnumber== ''){
            wx.showModal({
              title: '提示',
              content: '请输入学号',
              showCancel:false,
              success (res) {
              }
            })
          }else if(that.data.schoolnumber.length != 11)
          {
            wx.showModal({
              title: '提示',
              content: '学号位数不正确，请重新输入',
              showCancel:false,
              success (res) {
              }
            })
          } 
        {
        wx.request({
        url: 'https://www.scnusay.cc/signup/changephone.php',
        method:"POST",
        data:{
            'userphone':that.data.userphone,
            'schoolnumber':that.data.schoolnumber,
            'openid':app.globalData.openid
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'  
        },
  success(res){
      console.log(res.data);
      if ("注册成功!" == res.data) {
        wx.showModal({
          title: '提示',
          content: '注册成功! 即将返回授权页面!',
        })
        
        setTimeout(function () {
          //要延时执行的代码
          wx.navigateBack({
            // 返回上 1 页
            delta: 1
        })
        }, 1500) //延迟时间 这里是1秒
        
      }else if("更新个人信息失败,请核对手机号码与学号!" == res.data) {
        wx.showModal({
          title: '提示',
          content: '更新个人信息失败,请核对手机号码与学号！',
        })
      }  
    }
  })
      }},
    

})