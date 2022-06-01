// pages/index/index2.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noramalData: [{
            "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
            "CoverHeight": 467,
            "CoverWidth": 350,
            "title":"为什么图书馆又漏水啊！！"
          },
          {
            "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
            "CoverHeight": 371,
            "CoverWidth": 672,
            "title":"为什么图书馆又漏水啊！！"
          },
          {
            "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
            "CoverHeight": 571,
            "CoverWidth": 672,
            "title":"为什么图书馆又漏水啊！！"
          },
          {
            "Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
            "CoverHeight": 671,
            "CoverWidth": 672,
            "title":"为什么图书馆又漏水啊！！"
          }
        ],
      
        leftList: [],
        rightList: [],
        leftHight: 0,
        rightHight: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
          navH: app.globalData.navHeight
        });
        var that = this;
        var allData = that.data.noramalData;
        //定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
        var leftH = that.data.leftHight;
        var rightH = that.data.rightHight;
        var leftData = [];
        var rightData = [];
        for (let i = 0; i < allData.length; i++) {
          var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth));
          allData[i].CoverHeight = currentItemHeight + "rpx";//因为xml文件中直接引用的该值作为高度，所以添加对应单位
          if (leftH == rightH || leftH < rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
            leftData.push(allData[i]);
            leftH += currentItemHeight;
          } else {
            rightData.push(allData[i]);
            rightH += currentItemHeight;
          }
        }
      
        //更新左右两栏的数据以及累计高度
        that.setData({
          leftHight: leftH,
          rightHight: rightH,
          leftList: leftData,
          rightList: rightData
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

    }
})