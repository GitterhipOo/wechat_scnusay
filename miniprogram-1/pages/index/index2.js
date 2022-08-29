// pages/index/index2.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      hots_list:[{
        ordin_num:1,
        name:'耳机一副',
        url:'/pages/lostthing/details',
      },
      {
        ordin_num:2,
        name:'出售顶级皮肤',
        url:'/pages/SecendHandChange/detail',
      }, 
      {
        ordin_num:3,
        name:'小唐医院做核算',
        url:'/pages/ShareCar/details/index',
      },
      {
        ordin_num:4,
        name:'挑战杯初赛（A组）',
        url:'/pages/team/detail/index',
      },
      {
        ordin_num:5,
        name:'西园之终极美食',
        url:'/pages/foodreview/detail',
      },
    ]
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
    hots_more(){
      wx.navigateTo({
        url: '/pages/hots/index',
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

    }
})