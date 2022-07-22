// pages/SecendHandChange/detail.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoid: 1,
        icon: "../../assets/images/sort/part-time-job.png",
        name: "hzm",
        time: "1小时前",
        infotitle: "熹园究极美食",
        infodetail:"非常之顶级",
        infoimage:["../../assets/images/sort/publish.png","../../assets/images/sort/test.jpeg"],
        areaname:"南海校区",
        lookup: 300,
        nice: 50,
        talk: 40
        
         
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            navH: app.globalData.navHeight
          });
    },
    logo: function (e) {
        // 发起网络请求
        wx.navigateTo({
        // 开发者服务器接口地址
          url: '/pages/index/index',
        })
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