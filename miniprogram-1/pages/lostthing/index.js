// pages/lostthing/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      top_using_res:wx.getMenuButtonBoundingClientRect(),
      windowInfo: wx.getWindowInfo(),
      sortlist: [
          {
              sortid: 1,
              icon: "../../assets/images/sort/all.png",
              text: "全部",
              jump: "all",
              chosen_judge:"#fff"
          },
          {
              sortid: 2,
              icon: "../../assets/images/sort/book.png",
              text: "图书文具",
              jump: "book",
              chosen_judge:"#fff"
          },
          {
              sortid: 3,
              icon: "../../assets/images/sort/life.png",
              text: "生活用品",
              jump: "life",
              chosen_judge:"#fff"
          },
          {
              sortid: 4,
              icon: "../../assets/images/sort/computer.png",
              text: "电子产品",
              jump: "computer",
              chosen_judge:"#fff"
          },
          {
              sortid: 5,
              icon: "../../assets/images/sort/makeup.png",
              text: "化妆用品",
              jump: "makeup",
              chosen_judge:"#fff"
          },
          {
              sortid: 6,
              icon: "../../assets/images/sort/clothe.png",
              text: "服饰鞋包",
              jump: "clothe",
              chosen_judge:"#fff"
          },
          {
              sortid: 7,
              icon: "../../assets/images/sort/others.png",
              text: "其他",
              jump: "others",
              chosen_judge:"#fff"
          },
          {
              sortid: 8,
              icon: "../../assets/images/sort/publish.png",
              text: "我的发布",
              jump: "mypublish",
              chosen_judge:"#fff"
          }
      ],
        navH: 0,
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
        post: [{
            profile: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
            desc: "700出帅哥一只", //标题
            time: "1661857644662", //时间戳、这里需要
            way: "失物求寻", //发布类别（不需要可以不填充
            more_Infor: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
            photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
            tags: ["图书文具", "生活用品", "夹心糖"], //标签
            readingtimes: 49, //阅读次数
            favour: 20, //点赞数量
            had_favour: 0,
            favour_src: "/assets/images/icon/unfavour.png",
            comments: 5, //评论数量
            postid: 1, //文章在数据库中存储的位置
        },
        {
          profile: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
          desc: "70出帅哥一只", //标题
          time: "0", //时间戳、这里需要
          way: "失物求寻", //发布类别（不需要可以不填充
          more_Infor: "我在南海这里丢失抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
          photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
          tags: ["图书文具", "生活用品", "夹心糖"], //标签
          readingtimes: 49, //阅读次数
          favour: 20, //点赞数量
          had_favour: 0,
          favour_src: "/assets/images/icon/unfavour.png",
          comments: 5, //评论数量
          postid: 1, //文章在数据库中存储的位置
      }],

        //轮播图的照片
        photos:["https://s1.328888.xyz/2022/08/29/CzMYU.png","https://s1.328888.xyz/2022/08/29/CzgoR.png","https://s1.328888.xyz/2022/08/29/Czf0B.png"],
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
    //分类选择功能
    ///////根据选取的序号判断内容，并将选取的模块颜色设置为#eee
    class_choose:function(e){
      var chosennum=e.currentTarget.dataset.sortid-1
      for(var i=0;i<8;i=i+1){
        if(chosennum!==i){
          console.log(this.data.sortlist[i].chosen_judge)
          this.setData({
            ['sortlist[' + i + '].chosen_judge']:"#fff",
          })
        }
        else{
          this.setData({
            ['sortlist[' + i + '].chosen_judge']:"#eee"
          })
        }
      }
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