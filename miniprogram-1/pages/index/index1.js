// pages/index/index1.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,
        rotationList:[
            {imgurl: 'https://img1.imgtp.com/2022/06/01/BgYTrOiQ.jpg',},
            {imgurl: 'https://news.scnu.edu.cn/media/image/2020/11/2020112537fb67.jpeg.v',},
            {imgurl: 'https://img1.imgtp.com/2022/06/01/vFZmZtBC.png'}
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
        text:"拼车同行",
        jumpid:"car"
      },{
        icon: "../../assets/images/sort/question-ask.png",
        sortid: 4,
        text:"队友招募",
        jumpid:"team"
      },{
        icon: "../../assets/images/sort/part-time-job.png",
        sortid: 5,
        text:"美食点评",
        jumpid:"food"
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
    car: function (e) {
      // 发起网络请求
      wx.navigateTo({
      // 开发者服务器接口地址
        url: '/pages/ShareCar/index',
      })
    },
    team: function (e) {
      // 发起网络请求
      wx.navigateTo({
      // 开发者服务器接口地址
        url: '/pages/team/team',
      })
    },
    food: function (e) {
      // 发起网络请求
      wx.navigateTo({
      // 开发者服务器接口地址
        url: '/pages/foodreview/index',
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