// pages/lostthing/index.js
//暂定将标签第一个设置为大致地址，详细地址将进行隐瞒
//使用函数直接插入地址
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        top_using_res: wx.getMenuButtonBoundingClientRect(),
        windowInfo: wx.getWindowInfo(),
        sortlist: [{
                sortid: 1,
                icon: "../../assets/images/sort/all.png",
                text: "全部",
                jump: "all",
                chosen_judge: "#fff"
            },
            {
                sortid: 2,
                icon: "../../assets/images/sort/book.png",
                text: "图书文具",
                jump: "book",
                chosen_judge: "#fff"
            },
            {
                sortid: 3,
                icon: "../../assets/images/sort/life.png",
                text: "生活用品",
                jump: "life",
                chosen_judge: "#fff"
            },
            {
                sortid: 4,
                icon: "../../assets/images/sort/computer.png",
                text: "电子产品",
                jump: "computer",
                chosen_judge: "#fff"
            },
            {
                sortid: 5,
                icon: "../../assets/images/sort/makeup.png",
                text: "化妆用品",
                jump: "makeup",
                chosen_judge: "#fff"
            },
            {
                sortid: 6,
                icon: "../../assets/images/sort/clothe.png",
                text: "服饰鞋包",
                jump: "clothe",
                chosen_judge: "#fff"
            },
            {
                sortid: 7,
                icon: "../../assets/images/sort/others.png",
                text: "其他",
                jump: "others",
                chosen_judge: "#fff"
            },
            {
                sortid: 8,
                icon: "../../assets/images/sort/publish.png",
                text: "我的发布",
                jump: "mypublish",
                chosen_judge: "#fff"
            }
        ],
        navH: 0,
        tags: [{
            "src": "/assets/images/sort/news.png",
            "tag_Desc": "文具",
            "id": "1",
        }, {
            "src": "/assets/images/sort/news.png",
            "tag_Desc": "文具",
            "id": "2",
        }, {
            "src": "/assets/images/sort/news.png",
            "tag_Desc": "文具",
            "id": "3",
        }, {
            "src": "/assets/images/sort/news.png",
            "tag_Desc": "文具",
            "id": "4",
        }, {
            "src": "/assets/images/sort/news.png",
            "tag_Desc": "文具",
            "id": "5",
        }, {
            "src": "/assets/images/sort/news.png",
            "tag_Desc": "文具",
            "id": "6",
        }, {
            "src": "/assets/images/sort/news.png",
            "tag_Desc": "文具",
            "id": "7",
        }, {
            "src": "/assets/images/sort/news.png",
            "tag_Desc": "文具",
            "id": "8",
        }, ],
        post: [{
                blogger_id: 1, //文章所属id
                blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
                blogger_name: "xhiming", //博主昵称
                blogger_time: "1661857644662", //发布时间的时间戳、这里需要修改
                lostthing_topic: "700出帅哥一只", //标题
                lostthing_time: "1661857644662", //丢失时间的时间戳、这里需要修改
                lostthing_class: "失物求寻", //发布类别（不需要可以不填充
                lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
                lostthing_space: "南海校区", //
                lostthing_space_detail: "G253与G252之间的交界处",
                lostthing_contact: "12312311231",
                photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
                tags: ["图书文具", "生活用品", "夹心糖"], //标签
                readingtimes: 49, //阅读次数
                comments: 5, //评论数量
                favour: 20, //点赞数量
                had_favour: 0, //点赞判断
                favour_src: "/assets/images/icon/unfavour.png", //点赞图标
            },
            {
                blogger_id: 2, //文章所属id
                blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
                blogger_name: "zhiming", //博主昵称
                blogger_time: "1661857644662", //发布时间的时间戳、这里需要修改
                lostthing_topic: "帅哥一只", //标题
                lostthing_time: "1661857644662", //丢失时间的时间戳、这里需要修改
                lostthing_class: "失物求寻", //发布类别（不需要可以不填充
                lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
                lostthing_space: "南海校区", //
                lostthing_space_detail: "G253与G252之间的交界处",
                lostthing_contact: "12312311231",
                photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
                tags: ["图书文具", "生活用品", "夹心糖"], //标签
                readingtimes: 49, //阅读次数
                comments: 5, //评论数量
                favour: 20000, //点赞数量
                had_favour: 0, //点赞判断
                favour_src: "/assets/images/icon/unfavour.png", //点赞图标
            },
        ],

        //轮播图的照片
        photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"],
    },
    jumpToSearch: function () {
        wx.navigateTo({
            url: '/pages/lostthing/search',
        })
    },
    //跳转至详情页面
    jumptodetails: function (e) {
        console.log(e);
        let index=e.currentTarget.dataset.index
        let postValue=this.data.post[index]
        wx.setStorage({
            key: "sendPostValue",
            data: postValue
        })
        wx.navigateTo({
            url: '/pages/lostthing/details',
        })
    },
    //分类选择功能
    ///////根据选取的序号判断内容，并将选取的模块颜色设置为#eee
    class_choose: function (e) {
        var chosennum = e.currentTarget.dataset.sortid - 1
        for (var i = 0; i < 8; i = i + 1) {
            if (chosennum !== i) {
                console.log(this.data.sortlist[i].chosen_judge)
                this.setData({
                    ['sortlist[' + i + '].chosen_judge']: "#fff",
                })
            } else {
                this.setData({
                    ['sortlist[' + i + '].chosen_judge']: "#eee"
                })
            }
        }
    },

    //点赞功能
    //返回commentid数据，再根据commentid能否访问/具体数字来判断点赞操作
    favourMe: function (e) {
        var that = this
        let blogger_id = e.currentTarget.dataset.id - 1 //帖子ID
        if (this.data.post[blogger_id].had_favour == 0) {
            console.log(1)
            this.setData({
                ['post[' + blogger_id + '].favour']: that.data.post[blogger_id].favour + 1,
                ['post[' + blogger_id + '].favour_src']: "/assets/images/icon/favour.png",
                ['post[' + blogger_id + '].had_favour']: 1
            })
        } else {
            this.setData({
                ['post[' + blogger_id + '].favour']: that.data.post[blogger_id].favour - 1,
                ['post[' + blogger_id + '].favour_src']: "/assets/images/icon/unfavour.png",
                ['post[' + blogger_id + '].had_favour']: 0
            })
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
    onShareAppMessage: function () {}

})