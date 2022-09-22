// pages/ShareCar/search/index.js
const app = getApp()
Page({

    //执行点击事件
 formSubmit: function (e) {

    //声明当天执行的
    var that = this;
  
    //获取表单所有name=keyword的值
    var formData = e.detail.value.keyword;
  
    //显示搜索中的提示
    wx.showLoading({
     title: '搜索中',
     icon: 'loading'
    })
  
    //向搜索后端服务器发起请求
    wx.request({
  
     //URL
     url: 'http://localhost/search.php?keyword=' + formData,
  
     //发送的数据
     data: formData,
  
     //请求的数据时JSON格式
     header: {
      'Content-Type':'application/json'
     },
  
     //请求成功
     success: function (res) {
  
      //控制台打印（开发调试用）
      console.log(res.data)
  
      //把所有结果存进数组
      that.setData({
       re: res.data,
      })
  
      //搜索成功后，隐藏搜索中的提示
      wx.hideLoading();
     }
    })
   },

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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

    }
})