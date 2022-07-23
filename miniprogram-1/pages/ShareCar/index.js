// pages/ShareCar/index.js
Page({

    
    /**
     * 页面的初始数据
     */
    data: {
            
    },
    calling: function () {
        wx.makePhoneCall({
        phoneNumber: '13927433111',
        success: function () {
        console.log("拨打电话成功！")
        },
        fail: function () {
        console.log("拨打电话失败！")
        }
        })
        },
    GOTO:function(){
        wx.navigateTo({
          url: '../ShareCar/details/index',
        })
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