// pages/index/index1.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,
        rotationList:[
          {imgurl: 'https://s3.bmp.ovh/imgs/2022/03/0f8829adabf4e19d.png',},
          {imgurl: 'https://s3.bmp.ovh/imgs/2022/03/22262d3399effd84.png',},
          {imgurl: 'https://s3.bmp.ovh/imgs/2022/03/bdccd8c92ff84d1e.png'}
        ],
        
    sortList:[
      {
        icon: "../../assets/images/sort/news.png",
        sortid: 1,
        text:"失物招领",
        jumpid:"lostthing"
      },{
        icon: "../../assets/images/sort/second-hand.png",
        sortid: 2,
        text:"闲置交易",
        jumpid:"shchange"
      },{
        icon: "../../assets/images/sort/love-mood.png",
        sortid: 3,
        text:"影见华师",
        jumpid:"photo"
      },{
        icon: "../../assets/images/sort/question-ask.png",
        sortid: 4,
        text:"疑问互答",
        jumpid:"AaQ"
      },{
        icon: "../../assets/images/sort/part-time-job.png",
        sortid: 5,
        text:"华师要闻",
        jumpid:"news"
      }
    ],
        swiperCurrent: 0
    },

   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        navH: app.globalData.navHeight
      });
    },
    lostthing: function (e) {
      // 发起网络请求
      wx.navigateTo({
      // 开发者服务器接口地址
        url: '/pages/lostthing/index',
      })
    },
    shchange: function (e) {
      // 发起网络请求
      wx.navigateTo({
      // 开发者服务器接口地址
        url: '/pages/SecendHandChange/index',
      })
    },
    photo: function (e) {
      // 发起网络请求
      wx.navigateTo({
      // 开发者服务器接口地址
        url: '/pages/TakePhoto/index',
      })
    },
    AaQ: function (e) {
      // 发起网络请求
      wx.navigateTo({
      // 开发者服务器接口地址
        url: '/pages/AskAndQuestion/index',
      })
    },
    news: function (e) {
      // 发起网络请求
      wx.navigateTo({
      // 开发者服务器接口地址
        url: '/pages/News/index',
      })
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
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    swiperChange: function (e) {
        if (e.detail.source === 'touch'){
          this.setData({
            swiperCurrent: e.detail.current
          })
        }
      },
      
})