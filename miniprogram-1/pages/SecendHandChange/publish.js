// pages/SecendHandChange/publish.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,
        imglist :[],
        shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
        selectDatas: ['生活用品', '图书文具', '电子产品','化妆用品','服装鞋饰','其他'], //下拉列表的数据
        indexs: 0, //选择的下拉列 表下标,
    },
    img_w_show(){
        var _this=this;
        wx.chooseImage({
          count: 3, // 默认3
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            _this.setData({
              imglist: _this.data.imglist.concat(tempFilePaths)
            })
          }
        })
      },
    
  // 预览图片
  previewImg: function(e) {
 
  },
  // 点击删除
  deleteImg(e) {
 
  },
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });

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