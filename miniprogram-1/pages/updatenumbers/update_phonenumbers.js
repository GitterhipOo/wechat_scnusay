// pages/updatenumbers/update_phonenumbers.js
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userphone:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    update_phonenumber:function(){

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    update_phonenumber:function(e){
        console.log(e);
        var that = this;
        if(that.data.userphone== ''){
          wx.showModal({
            title: '提示',
            content: '请输入手机号码',
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
        } else
        {
        wx.request({
        url: 'https://www.scnusay.cc/signup/signup.php',
        method:"POST",
        data:{
            'userphone':e.detail.value.userphone,
            'openid':app.globalData.openid
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
      }},
    
    phoneInput:function(e){
        // 获取 input 输入框的值
        this.data.userphone = e.detail.value;
      },
})