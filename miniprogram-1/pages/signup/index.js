// pages/signup/index.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username:"",
        password:"",
        passwordAck:"",
        userphone:"",
        scnu_number:"",
        result1:"",
    },
    enroll: function (e) {
        // 发起网络请求
        wx.navigateBack({
            // 返回上 1 页
            delta: 1
        })
      },
      regist:function(e){
          console.log(e);
        var that = this;
        if(that.data.username == ''){
          wx.showModal({
            title: '提示',
            content: '请输入用户名',
            showCancel:false,
            success (res) {
            }
          })
        }else if(that.data.password == ''){
          wx.showModal({
            title: '提示',
            content: '请输入密码',
            showCancel:false,
            success (res) {
            }
          })
        }else if(that.data.passwordAck == ''){
          wx.showModal({
            title: '提示',
            content: '请再次输入密码',
            showCancel:false,
            success (res) {
            }
          })
        }else if(that.data.passwordAck != that.data.password){
          wx.showModal({
            title: '提示',
            content: '两次密码输入不一致',
            showCancel:false,
            success (res) {
            }
          })
        }else if(that.data.userphone== ''){
          wx.showModal({
            title: '提示',
            content: '请输入手机号码',
            showCancel:false,
            success (res) {
            }
          })
        }else if(that.data.scnu_number == ''){
          wx.showModal({
            title: '提示',
            content: '请输入学号',
            showCancel:false,
            success (res) {
            }
          })
        }else if(that.data.userphone.length != 11){
          wx.showModal({
            title: '提示',
            content: '手机号位数不正确，请重新输入',
            showCancel:false,
            success (res) {
            }
          })
        }else if(that.data.scnu_number.length != 11){
          wx.showModal({
            title: '提示',
            content: '学号不合法',
            showCancel:false,
            success (res) {
            }
          })
          // post提交模块
        }
        else
        {
wx.request({
  url: 'https://www.scnusay.cc/signup/signup.php',
  method:"POST",
  data:{
    'username':e.detail.value.username,
    'password':e.detail.value.password,
    'passwordAck':e.detail.value.passwordAck,
    'userphone':e.detail.value.userphone,
    'scnu_number':e.detail.value.scnu_number,
  },
  header: {
    'content-type': 'application/x-www-form-urlencoded'  
  },
  success(res){
      console.log(res.data);
      if ("注册成功!" == res.data) {
        wx.showModal({
          title: '提示',
          content: '注册成功! 即将返回登录页面!',
        })
        
        setTimeout(function () {
          //要延时执行的代码
          wx.navigateBack({
            // 返回上 1 页
            delta: 1
        })
        }, 1500) //延迟时间 这里是1秒
        
      }else if("注册失败,请核对手机号码以及学号!" == res.data) {
        wx.showModal({
          title: '提示',
          content: '注册失败! 点击重新注册!',
        })
      }  
    }
  })
      }
    },

          
// 同步输入框内东西到全局数组
      usernameInput:function(e){
        // 获取 input 输入框的值
        this.data.username = e.detail.value;
      },
      passwordInput:function(e){
        // 获取 input 输入框的值
        this.data.password = e.detail.value;
      },
      passwordInputAck:function(e){
        // 获取 input 输入框的值
        this.data.passwordAck = e.detail.value;
      },
      phoneInput:function(e){
        // 获取 input 输入框的值
        this.data.userphone = e.detail.value;
      },
      scnuNumberInput:function(e){
        // 获取 input 输入框的值
        this.data.scnu_number = e.detail.value;
      }
})