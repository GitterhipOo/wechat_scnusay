// pages/lostthing/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,
        firstname:"丢失校园卡",
        good_name:"可爱的我",
        pickup_time:"2022/5/23",
        pickup_position:"西饼屋",
        pickup_remark:"v我50",
        banners:[{
          "url":"https://s1.328888.xyz/2022/08/02/OF0gj.jpg",//大图地址
          "userUrl":"https://s1.328888.xyz/2022/08/02/OF8Ay.jpg",//头像
          "name":"鼠标一只",
          "id":"1",
          "desc":"我的鼠标在西饼屋里落下了，可以帮我找找吗",//简介
          "goods_Type":"lost"
        },{
          "url":"https://s1.328888.xyz/2022/08/02/OFCvw.jpg",
          "userUrl":"https://s1.328888.xyz/2022/08/02/OF8Ay.jpg",
          "name":"可爱的手机架",
          "id":"2",
          "desc":"我有一个可爱的手机架，可是他不见了呜呜呜",
          "goods_Type":"lost"
        },{
          "url":"https://s1.328888.xyz/2022/08/02/OF5Ah.jpg",
          "userUrl":"https://s1.328888.xyz/2022/08/02/OF8Ay.jpg",
          "name":"小小的蓝牙耳机",
          "id":"3",
          "desc":"我放弃了我的保研名额，这个耳机是谁的啊",
          "goods_Type":"find"
        }],
        tags:[{
          "src":"/assets/images/sort/news.png",
          "tag_Desc":"文具",
          "id":"1",
        },{
          "src":"/assets/images/sort/news.png",
          "tag_Desc":"文具",
          "id":"2",
        },{
          "src":"/assets/images/sort/news.png",
          "tag_Desc":"文具",
          "id":"3",
        },{
          "src":"/assets/images/sort/news.png",
          "tag_Desc":"文具",
          "id":"4",
        },{
          "src":"/assets/images/sort/news.png",
          "tag_Desc":"文具",
          "id":"5",
        },{
          "src":"/assets/images/sort/news.png",
          "tag_Desc":"文具",
          "id":"6",
        },{
          "src":"/assets/images/sort/news.png",
          "tag_Desc":"文具",
          "id":"7",
        },{
          "src":"/assets/images/sort/news.png",
          "tag_Desc":"文具",
          "id":"8",
        },],
        post:[{
          "profile":"https://s1.328888.xyz/2022/08/02/OF8Ay.jpg",
          "desc":"700出帅哥一只",
          "time":"39分钟前",
          "way":"失物求寻",
          "more_Infor":"我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗",
          "contact_Phone":"1101101110",
          "contact_Wechat":"akai1111s1ad21"
        },{
          "profile":"https://s1.328888.xyz/2022/08/02/OF8Ay.jpg",
          "desc":"700出帅哥一只",
          "time":"39分钟前",
          "way":"失物求寻",
          "more_Infor":"我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗",
          "contact_Phone":"1101101110",
          "contact_Wechat":"akai1111s1ad21"
        }],
        photos:["https://s1.328888.xyz/2022/08/05/ul86C.jpg","https://img1.imgtp.com/2022/08/05/q23HbBwo.jpg"],
    },
    jumpToSearch:function(){
      wx.navigateTo({
        url: '/pages/lostthing/search',
      })
    },
    
    jumptonews(){
      wx.navigateTo({
        url: '/pages/lostthing/details',
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