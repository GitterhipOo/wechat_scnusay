// pages/index/index1.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        article: [],
        navH: 0,
        rotationList: [{
                imgurl: 'https://www.scnusay.cc/indexswiper/1.jpg',
            },
            {
                imgurl: 'https://news.scnu.edu.cn/media/image/2020/11/2020112537fb67.jpeg.v',
            },
            {
                imgurl: 'https://www.scnusay.cc/indexswiper/2.jpg'
            }

        ],

        sortList: [{
            icon: "https://www.scnusay.cc/icon/news.png",
            sortid: 1,
            text: "失物招领",
            jumpid: "lostthing"
        }, {
            icon: "https://www.scnusay.cc/icon/second-hand.png",
            sortid: 2,
            text: "闲置交易",
            jumpid: "shchange"
        }, {
            icon: "https://www.scnusay.cc/icon/love-mood.png",
            sortid: 3,
            text: "拼车同行",
            jumpid: "car"
        }, {
            icon: "https://www.scnusay.cc/icon/question-ask.png",
            sortid: 4,
            text: "队友招募",
            jumpid: "team"
        }, {
            icon: "https://www.scnusay.cc/icon/part-time-job.png",
            sortid: 5,
            text: "美食点评",
            jumpid: "food"
        }],
        swiperCurrent: 0
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this=this
        wx.request({
            //先是获取失物招领的
            url: 'https://www.scnusay.cc/scnunews/getnews.php',
            method: "GET",
            data: {},
            header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            success(res) {
                // console.log("我要来咯",res.data);
                for (var i = 0; i < res.data.length; i++) {
                    var para=[];
                    // 遍历p1到p20
                    if(res.data[i].p1 != null) para.push(res.data[i].p1);
                    if(res.data[i].p2 != null) para.push(res.data[i].p2);
                    if(res.data[i].p3 != null) para.push(res.data[i].p3);
                    if(res.data[i].p4 != null) para.push(res.data[i].p4);
                    if(res.data[i].p5 != null) para.push(res.data[i].p5);
                    if(res.data[i].p6 != null) para.push(res.data[i].p6);
                    if(res.data[i].p7 != null) para.push(res.data[i].p7);
                    if(res.data[i].p8 != null) para.push(res.data[i].p8);
                    if(res.data[i].p9 != null) para.push(res.data[i].p9);
                    if(res.data[i].p10 != null) para.push(res.data[i].p10);
                    if(res.data[i].p11 != null) para.push(res.data[i].p11);
                    if(res.data[i].p12 != null) para.push(res.data[i].p12);
                    if(res.data[i].p13 != null) para.push(res.data[i].p13);
                    if(res.data[i].p14 != null) para.push(res.data[i].p14);
                    if(res.data[i].p15 != null) para.push(res.data[i].p15);
                    if(res.data[i].p16 != null) para.push(res.data[i].p16);
                    if(res.data[i].p17 != null) para.push(res.data[i].p17);
                    if(res.data[i].p18 != null) para.push(res.data[i].p18);
                    if(res.data[i].p19 != null) para.push(res.data[i].p19);
                    if(res.data[i].p20 != null) para.push(res.data[i].p20);
                    //nwearray是用于插入的数组
                    var newarray = {
                        title:res.data[i].title,
                        para:para
                    }

                    // console.log(newarray)
                    _this.setData({
                        article: _this.data.article.concat(newarray),
                        //将数组插入article
                    })
                    //清除para
                    para = [];
                }
            }
        })
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
            url: '/pages/SecendHandChange/index?indexs=0',
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
            url: '/pages/foodreview/index?indexs=0',
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
        if (e.detail.source === 'touch') {
            this.setData({
                swiperCurrent: e.detail.current
            })
        }
    },

    jumpToArticle: function(e){
        console.log(e.currentTarget.dataset.index);
        var article = this.data.article;
        wx.setStorage({
            key: "article",
            data: article[e.currentTarget.dataset.index],
            //储存在缓存中带过去再删除
        })
        wx.navigateTo({
            url: '/pages/News/index',
        })
    }
})