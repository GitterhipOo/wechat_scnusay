// pages/SecendHandChange/detail.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,
        icon: "../../assets/images/sort/part-time-job.png",
        name: "hzm",
        pubtime: "1小时前",
        infotitle: "出售顶级皮肤",
        infodetail:"非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
        infoimage:["../../assets/images/sort/publish.png",],
        infoprice: "￥9600",
        lookup: 300,
        nice: 300,
        talk: 50,
        hasChange:false,
        show:false,
    },
    gopraise: function (e){
        var that = this;
        var hasChange = that.data.hasChange;
    if (hasChange !== undefined) {
      var onum = parseInt(that.data.nice);
      console.log(hasChange);
      if (hasChange == 'true') {
        that.data.nice = (onum - 1);
        that.data.hasChange = 'false';
        that.data.show = false;
      } else {
        that.data.nice = (onum + 1);
        that.data.hasChange = 'true';
        that.data.show = true;
      }
      this.setData({
        nice: that.data.nice,
        hasChange: that.data.hasChange,
        show:that.data.show
      })
    };
    },
   gopreview: function (e){
            var current = e.target.dataset.src;
            var imgList = [];
            console.log(e.target.dataset.src)
            for (let i = 0; i < this.data.infoimage.length; i++) {
            imgList.push(this.data.infoimage[i]);
            }
            wx.previewImage({
            current: current,//当前点击的图片链接
            urls: imgList,//图片数组
            
            })
            
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {      
        this.setData({
            navH: app.globalData.navHeight
          })
          wx.showShareMenu({
            withShareTicket: true
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
    onShareAppMessage: function (res) {
        var that = this;
        console.log(JSON.stringify(that.data.array))
        return {
          title:that.data.infotitle,
          path:'pages/detail/detail?array=' + JSON.stringify(that.data.array),
          imageUrl:that.data.infoimage
        }
      }
})