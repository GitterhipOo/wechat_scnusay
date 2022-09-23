// pages/lostthing/index.js
//暂定将标签第一个设置为大致地址，详细地址将进行隐瞒
//使用函数直接插入地址
var app = getApp();
var startX, endX; //首先创建2个变量 来记录触摸时的原点
var moveFlag = true; // 判断执行滑动事件
Page({

    /**
     * 页面的初始数据
     */
    data: {
        top_using_res: wx.getMenuButtonBoundingClientRect(),
        windowInfo: wx.getWindowInfo(),
        navH: 0,
        height: '',
        heights: [],
        //post0为捡到物品，其中lostthing_class = 2
        owner_Data:{
            owner_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
        },
        post0: [{
            blogger_id: 1, //文章所属id
            blogger_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
            blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
            blogger_name: "xhiming", //博主昵称
            blogger_time: "2022年9月20日", //发布时间的时间戳、这里需要修改
            lostthing_topic: "700出帅哥一只22222", //标题
            lostthing_time: "2022年9月20日", //丢失时间的时间戳、这里需要修改
            lostthing_class: "2", //发布类别（不需要可以不填充
            lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
            lostthing_space: "南海校区", //
            lostthing_space_detail: "G253与G252之间的交界处",
            lostthing_contact: "12312311231",
            photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
            readingtimes: 49, //阅读次数
            comments: 5, //评论数量
            favour: 20, //点赞数量
            had_favour: 0, //点赞判断
            favour_src: "/assets/images/icon/unfavour.png", //点赞图标
        },
        {
            blogger_id: 2, //文章所属id
            blogger_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
            blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
            blogger_name: "zhiming", //博主昵称
            blogger_time: "2022年9月20日", //发布时间的时间戳、这里需要修改
            lostthing_topic: "帅哥一只1a", //标题
            lostthing_time: "2022年9月20日", //丢失时间的时间戳、这里需要修改
            lostthing_class: "2", //发布类别（不需要可以不填充
            lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
            lostthing_space: "南海校区", //
            lostthing_space_detail: "G253与G252之间的交界处",
            lostthing_contact: "12312311231",
            photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
            readingtimes: 49, //阅读次数
            comments: 5, //评论数量
            favour: 20000, //点赞数量
            had_favour: 0, //点赞判断
            favour_src: "/assets/images/icon/unfavour.png", //点赞图标
        },
    ],
        //post1为丢失物品，其中lostthing_class = 1
        post1: [{
                blogger_id: 1, //文章所属id
                blogger_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
                blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
                blogger_name: "xhiming", //博主昵称
                blogger_time: "2022年9月20日", //发布时间的时间戳、这里需要修改
                lostthing_topic: "700出2帅哥一只", //标题
                lostthing_time: "2022年9月20日", //丢失时间的时间戳、这里需要修改
                lostthing_class: "1", //发布类别（不需要可以不填充
                lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
                lostthing_space: "南海校区", //
                lostthing_space_detail: "G253与G252之间的交界处",
                lostthing_contact: "12312311231",
                photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
                readingtimes: 49, //阅读次数
                comments: 5, //评论数量
                favour: 20, //点赞数量
                had_favour: 0, //点赞判断
                favour_src: "/assets/images/icon/unfavour.png", //点赞图标
            },
            {
                blogger_id: 2, //文章所属id
                blogger_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
                blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
                blogger_name: "zhiming", //博主昵称
                blogger_time: "2022年9月20日", //发布时间的时间戳、这里需要修改
                lostthing_topic: "帅哥一22222", //标题
                lostthing_time: "2022年9月20日", //丢失时间的时间戳、这里需要修改
                lostthing_class: "1", //发布类别（不需要可以不填充
                lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
                lostthing_space: "南海校区", //
                lostthing_space_detail: "G253与G252之间的交界处",
                lostthing_contact: "12312311231",
                photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
                readingtimes: 49, //阅读次数
                comments: 5, //评论数量
                favour: 20000, //点赞数量
                had_favour: 0, //点赞判断
                favour_src: "/assets/images/icon/unfavour.png", //点赞图标
            },
            {
                blogger_id: 2, //文章所属id
                blogger_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
                blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
                blogger_name: "zhiming", //博主昵称
                blogger_time: "2022年9月20日", //发布时间的时间戳、这里需要修改
                lostthing_topic: "帅哥一22222", //标题
                lostthing_time: "2022年9月20日", //丢失时间的时间戳、这里需要修改
                lostthing_class: "1", //发布类别（不需要可以不填充
                lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
                lostthing_space: "南海校区", //
                lostthing_space_detail: "G253与G252之间的交界处",
                lostthing_contact: "12312311231",
                photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
                readingtimes: 49, //阅读次数
                comments: 5, //评论数量
                favour: 20000, //点赞数量
                had_favour: 0, //点赞判断
                favour_src: "/assets/images/icon/unfavour.png", //点赞图标
            },
            {
                blogger_id: 2, //文章所属id
                blogger_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
                blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
                blogger_name: "zhiming", //博主昵称
                blogger_time: "2022年9月20日", //发布时间的时间戳、这里需要修改
                lostthing_topic: "帅哥一22222", //标题
                lostthing_time: "2022年9月20日", //丢失时间的时间戳、这里需要修改
                lostthing_class: "1", //发布类别（不需要可以不填充
                lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
                lostthing_space: "南海校区", //
                lostthing_space_detail: "G253与G252之间的交界处",
                lostthing_contact: "12312311231",
                photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
                readingtimes: 49, //阅读次数
                comments: 5, //评论数量
                favour: 20000, //点赞数量
                had_favour: 0, //点赞判断
                favour_src: "/assets/images/icon/unfavour.png", //点赞图标
            },
            {
                blogger_id: 2, //文章所属id
                blogger_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
                blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
                blogger_name: "zhiming", //博主昵称
                blogger_time: "2022年9月20日", //发布时间的时间戳、这里需要修改
                lostthing_topic: "帅哥一22222", //标题
                lostthing_time: "2022年9月20日", //丢失时间的时间戳、这里需要修改
                lostthing_class: "1", //发布类别（不需要可以不填充
                lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
                lostthing_space: "南海校区", //
                lostthing_space_detail: "G253与G252之间的交界处",
                lostthing_contact: "12312311231",
                photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
                readingtimes: 49, //阅读次数
                comments: 5, //评论数量
                favour: 20000, //点赞数量
                had_favour: 0, //点赞判断
                favour_src: "/assets/images/icon/unfavour.png", //点赞图标
            },
            {
                blogger_id: 2, //文章所属id
                blogger_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
                blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
                blogger_name: "zhiming", //博主昵称
                blogger_time: "2022年9月20日", //发布时间的时间戳、这里需要修改
                lostthing_topic: "帅哥一22222", //标题
                lostthing_time: "2022年9月20日", //丢失时间的时间戳、这里需要修改
                lostthing_class: "1", //发布类别（不需要可以不填充
                lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
                lostthing_space: "南海校区", //
                lostthing_space_detail: "G253与G252之间的交界处",
                lostthing_contact: "12312311231",
                photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
                readingtimes: 49, //阅读次数
                comments: 5, //评论数量
                favour: 20000, //点赞数量
                had_favour: 0, //点赞判断
                favour_src: "/assets/images/icon/unfavour.png", //点赞图标
            },
            {
                blogger_id: 2, //文章所属id
                blogger_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
                blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
                blogger_name: "zhiming", //博主昵称
                blogger_time: "2022年9月20日", //发布时间的时间戳、这里需要修改
                lostthing_topic: "帅哥一22222", //标题
                lostthing_time: "2022年9月20日", //丢失时间的时间戳、这里需要修改
                lostthing_class: "1", //发布类别（不需要可以不填充
                lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
                lostthing_space: "南海校区", //
                lostthing_space_detail: "G253与G252之间的交界处",
                lostthing_contact: "12312311231",
                photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
                readingtimes: 49, //阅读次数
                comments: 5, //评论数量
                favour: 20000, //点赞数量
                had_favour: 0, //点赞判断
                favour_src: "/assets/images/icon/unfavour.png", //点赞图标
            },
            {
                blogger_id: 2, //文章所属id
                blogger_Openid:"ouctO4ypxLjQ_3t67gYI-urvPoQs",
                blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
                blogger_name: "zhiming", //博主昵称
                blogger_time: "2022年9月20日", //发布时间的时间戳、这里需要修改
                lostthing_topic: "帅哥一22222", //标题
                lostthing_time: "2022年9月20日", //丢失时间的时间戳、这里需要修改
                lostthing_class: "1", //发布类别（不需要可以不填充
                lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
                lostthing_space: "南海校区", //
                lostthing_space_detail: "G253与G252之间的交界处",
                lostthing_contact: "12312311231",
                photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
                readingtimes: 49, //阅读次数
                comments: 5, //评论数量
                favour: 20000, //点赞数量
                had_favour: 0, //点赞判断
                favour_src: "/assets/images/icon/unfavour.png", //点赞图标
            },
        ],
        //页面切换相关数据
        current_Page: 0,
    },
    jumpToSearch: function () {
        wx.navigateTo({
            url: '/pages/lostthing/search',
        })
    },
    //跳转至详情页面
    jumptodetails: function (e) {
        console.log(e);
        let index = e.currentTarget.dataset.index
        let postValue = this.data.post[index]
        wx.setStorage({
            key: "sendPostValue",
            data: postValue
        })
        wx.navigateTo({
            url: '/pages/lostthing/details',
        })
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
    //触底刷新功能
    onReachBottom: function () {
        this.setData({
            curPage: this.data.curPage + 1
        });
        this.getGoodsList(0, true)
    },
    onPullDownRefresh: function () {
        this.setData({
            curPage: 1
        });
        this.getGoodsList(0)
        wx.stopPullDownRefresh()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this
        setTimeout(function () { //异步
            var query = wx.createSelectorQuery();
            query.selectAll('.list').boundingClientRect()
            query.exec((res) => {
                console.log(res)
                var listHeight = res[0][0].height
                console.log(res[0][0].height)
                _this.setData({
                    heights: res[0],
                    height: listHeight + 40 +'px'
                })
            })
        }, 100)
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    /**
     * 详情与售后左滑右滑事件
     */
    changeswiper: function (e) {
        var _this = this;
        console.log(e.detail.current)
        setTimeout(function () { //异步
            var query = wx.createSelectorQuery(); //模仿dom获取组件的高度
            query.selectAll('.list').boundingClientRect()
            query.exec((res) => {
                console.log(res)
                var listHeight = res[0][e.detail.current].height
                console.log(res[0][e.detail.current].height)
                _this.setData({
                    height: listHeight + 20 + 'px'
                })
            })
        }, 800)
    },

    clicktab: function(e){
        var pag = e.currentTarget.dataset.current;
        this.setData({
            current_Page:pag
        })
    }
})