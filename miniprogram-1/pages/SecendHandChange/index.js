// pages/SecendHandChange/index.js
var app = getApp()
Page({

    godetail: function (e) {
        
        var id = e.currentTarget.dataset.id,
        name = e.currentTarget.dataset.name;
        console.log(id);
        console.log(name);
        // 执行页面跳转
        wx.navigateTo({
          url: '/pages/SecendHandChange/detail'
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,
        sortlist: [
            {
                sortid: 1,
                icon: "../../assets/images/sort/all.png",
                text: "全部",
                jump: "all"
            },
            {
                sortid: 2,
                icon: "../../assets/images/sort/book.png",
                text: "图书文具",
                jump: "book"
            },
            {
                sortid: 3,
                icon: "../../assets/images/sort/life.png",
                text: "生活用品",
                jump: "life"
            },
            {
                sortid: 4,
                icon: "../../assets/images/sort/computer.png",
                text: "电子产品",
                jump: "computer"
            },
            {
                sortid: 5,
                icon: "../../assets/images/sort/makeup.png",
                text: "化妆用品",
                jump: "makeup"
            },
            {
                sortid: 6,
                icon: "../../assets/images/sort/clothe.png",
                text: "服饰鞋包",
                jump: "clothe"
            },
            {
                sortid: 7,
                icon: "../../assets/images/sort/others.png",
                text: "其他",
                jump: "others"
            },
            {
                sortid: 8,
                icon: "../../assets/images/sort/publish.png",
                text: "我的发布",
                jump: "mypublish"
            }
        ],
        infolist: [
            {   
                infoid: 1,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "出售顶级皮肤啦啦啦",
                infodetail:"非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
                infoimage:"../../assets/images/sort/publish.png",
                infoprice: "￥9600",
                lookup: 300,
                nice: 50,
                talk: 40
            },
            {
                infoid: 2,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "出售顶级皮肤",
                infodetail:"非常之顶级",
                infoimage:"../../assets/images/sort/publish.png",
                infoprice: "￥20",
                lookup: 3,
                nice: 4,
                talk: 5
            },
            {
                infoid: 3,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "出售顶级皮肤",
                infodetail:"非常之顶级",
                infoimage:"../../assets/images/sort/publish.png",
                infoprice: "￥20",
                lookup: 3,
                nice: 4,
                talk: 5
            },
            {
                infoid: 4,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "出售顶级皮肤",
                infodetail:"非常之顶级",
                infoimage:"../../assets/images/sort/publish.png",
                infoprice: "￥20",
                lookup: 3,
                nice: 4,
                talk: 5
            },
            {
                infoid: 5,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "出售顶级皮肤",
                infodetail:"非常之顶级",
                infoimage:"../../assets/images/sort/publish.png",
                infoprice: "￥20",
                lookup: 3,
                nice: 4,
                talk: 5
            },
            {
                infoid: 6,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "出售顶级皮肤",
                infodetail:"非常之顶级",
                infoimage:"../../assets/images/sort/publish.png",
                infoprice: "￥20",
                lookup: 3,
                nice: 4,
                talk: 5
            }
        ]
    },
    gotopublish(){
        wx.navigateTo({
            url: '/pages/SecendHandChange/publish',
          })    
    },
    mypublish: function (e) {
        var id = e.currentTarget.dataset.id,
        name = e.currentTarget.dataset.name;
        console.log(id);
        console.log(name);
        // 执行页面跳转
        wx.navigateTo({
          url: '/pages/SecendHandChange/mypublish'
        })
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