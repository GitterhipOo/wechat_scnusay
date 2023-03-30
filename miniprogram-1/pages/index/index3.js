// pages/talking/index.js
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
        haslogin: '',
        swiperHeight: "1000px",
        //页面切换相关数据
        current_Page: 0,
        photocou: 0, //用户上传图片的数量
        top_using_res: wx.getMenuButtonBoundingClientRect(),
        windowInfo: wx.getWindowInfo(),
        navH: 0,
        // height: '',
        heights: [],
        owner_Data: {
            owner_Openid: "ouctO4ypxLjQ_3t67gYI-urvPoQs",
        },
        //post0为捡到物品
        post0: [],
        //post1为丢失物品，其中talking_class = 1
        post1: [],
        //post1为私人发布内容，根据时间排
        hasMoreData: true,
        isRefreshing: false,
        isLoadingMoreData: false

    },
    jumpToSearch: function () {
        wx.navigateTo({
            url: '/pages/index/index3search',
        })
        //点击搜索跳转
    },

    //通过计算post的数量获取页面长度
    getSwiperItemHeight: function () {
        var postHeight = 0
        var post
        if (this.data.current_Page == 0) {
            post = this.data.post0
        } else {
            post = this.data.post1
        }
        console.log(post)
        for (var i = 0; i < post.length; i++) {
            if (post[i].photos.length > 0) {
                postHeight += 763
            } else {
                postHeight += 255
            }
        }
        postHeight = postHeight +400;
        postHeight = postHeight + "rpx";
        this.setData({
            swiperHeight: postHeight,
        })
        console.log("高度赋值完成,计算高度为", postHeight)
    },

    //跳转至详情页面
    jumptodetails: function (e) {
        console.log(e);
        var that = this
        let index = e.currentTarget.dataset.index
        console.log("index值为" + index)
        //滑动以后判断当前页面是什么的辨识
        console.log('current_page(判断当前是哪种类型)为' + that.data.current_Page)
        //这里需要拼接字符串post(0/1)
        if (that.data.current_Page == 0) {
            var postValue = that.data.post0[index]
        } else if (that.data.current_Page == 1)
            var postValue = that.data.post1[index]
        //通过if判断现在是post0还是post1
        console.log(postValue)
        wx.setStorage({
            key: "talkingsendPostValue",
            data: postValue
            //储存在缓存中带过去再删除
        })
        wx.navigateTo({
            url: '/pages/index/index3detail',
        })
    },

    postmenu: function (e) {
        console.log(e);
        var that = this
        let index = e.currentTarget.dataset.index
        console.log("点击菜单的index值为" + index)
        var menudeletevalue
        //滑动以后判断当前页面是什么的辨识
        console.log('current_page(判断当前是我的还是失物招领)为' + that.data.current_Page)
        if (that.data.current_Page == 0) {
            var menupostValue = that.data.post0[index].specialcode
        } else if (that.data.current_Page == 1)
            var menupostValue = that.data.post1[index].specialcode
        //从已经放好的数组中获取对应的specialcode
        console.log("选择菜蛋对应的specialcode为" + menupostValue)

        wx.showActionSheet({
            itemList: ['删除', '已解决'],
            success: function (res) {
                if (res.tapIndex == 0) {
                    wx.showModal({
                        title: '删除',
                        content: '是否删除内容',
                        complete: (res) => {
                            if (res.cancel) {}
                            if (res.confirm) {
                                //console.log("选择菜蛋对应的specialcode为"+menupostValue)
                                wx.request({
                                    url: 'https://www.scnusay.cc/talking/talkingphoto/deletemytalkingpost.php',
                                    method: "POST",
                                    data: {
                                        'menupostValue': menupostValue,
                                    },
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                                    },
                                    success(res) {
                                        wx.showModal({
                                            title: '删除成功',
                                            content: '发布内容已删除',
                                            complete: (res) => {
                                                if (res.cancel) {}
                                                if (res.confirm) {
                                                    wx.reLaunch({
                                                        url: 'index3',
                                                      })
                                                }
                                            }
                                        })

                                    },
                                })
                            }
                        }
                    })
                }
                //点击已解决
                // if (res.tapIndex == 1) {
                //     wx.showModal({
                //         title: '已解决',
                //         content: '确认已解决问题',
                //         complete: (res) => {
                //             //如果用户点击了取消，那么就不执行任何操作，如果用户点击了确定，那么就执行下面的操作
                //             if (res.cancel) {
                //             }
                //             if (res.confirm) {
                //             //发起wx.quest的post请求，传递id至https://www.scnusay.cc/lostdetail/lost_had_solved.php
                //                 wx.request({
                //                     url: 'https://www.scnusay.cc/lostdetail/lost_had_solved.php',
                //                     method: "POST",
                //                     data: {
                //                         'menupostValue': menupostValue,
                //                     },
                //                     header: {
                //                         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                //                     },
                //                     success(res) {
                //                         console.log("已解决问题，修改内容")
                //                         wx.navigateTo({
                //                             url: '/pages/talking/index',
                //                         })

                //                     }
                //             })
                //             }
                //         }
                //     })
                // }
            },

            fail: function (res) {
                console.log(res.errMsg)

            }
        })
    },
    //点赞功能
    favourMe: function (e) {
        //返回commentid数据，再根据commentid能否访问/具体数字来判断点赞操作
        var that = this
        console.log(e);
        let blogger_id = e.currentTarget.dataset.id - 1; //帖子ID
        let talkingClass = e.currentTarget.dataset.class;
        let index = e.currentTarget.dataset.index;
        if (talkingClass == 0) //
            if (['this.data.post' + talkingClass + '[' + index + '].had_favour'] == 0) {
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
        console.log("触底事件触发")
        this.getSwiperItemHeight()

    },
    onPullDownRefresh: function () {
        if (this.data.isRefreshing || this.data.isLoadingMoreData) {
            return
        }
        this.setData({
            isRefreshing: true,
            hasMoreData: true
        })
        //wait for 1 second
        setTimeout(() => {
            wx.reLaunch({
                url: 'index3',
              })
        }, 300)
        
        
    },


    // 点击标签判断
    clicktab: function (e) {
        //点击标签切换swiper
        var pag = e.currentTarget.dataset.current;
        console.log("点击标签的数据为" + e.currentTarget.dataset.current)
        this.setData({
            current_Page: pag
        })
        var tabstylelost
        var tabstylemy
        if (this.data.current_Page == 0) {
            tabstylelost = "background-color: rgb(186 , 204, 217)";
            tabstylemy = "background-color: white";
        } else {
            tabstylelost = "background-color: white";
            tabstylemy = "background-color: rgb(186 , 204, 217)";
        }
        this.setData({
            tabstylelost: tabstylelost,
            tabstylemy: tabstylemy,
        })
    },

    // getSwiperItemHeight: function () {
    //     var postHeight
    //     if (this.data.current_Page == 0) {
    //         postHeight = (this.data.post0.length) * 400 + 600 + "rpx";
    //     }
    //     else {
    //         postHeight = (this.data.post1.length) * 400 + 600 + "rpx";
    //     }
    //     console.log("计算页面高度触发")
    //     this.setData({
    //         swiperHeight: postHeight,
    //     })
    //     console.log("高度计算完成")
    // },
    gotosend: function (e) {
        console.log("点击去发布")
        if (app.globalData.haslogin === false) {
            //出现可选择弹窗提醒用户未登录，如果用户点击确定，则跳转至登录页面，否则不跳转
            wx.showModal({
                title: '提示',
                content: '您还未登录，是否前往登录？',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        wx.switchTab({
                            url: '/pages/index/index4',
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.navigateTo({
                url: '/pages/index/index3post',
            })
            console.log("login 状态为" + app.globalData.haslogin)
            console.log("您已登录，获得发布权限")
        }
    },

    //滑动swiperItem修改currentPag
    changeswiper(e) {
        this.setData({
            current_Page: e.detail.current
        })
        console.log("切换触发")
        this.getSwiperItemHeight()
        var tabstylelost
        var tabstylemy
        if (this.data.current_Page == 0) {
            tabstylelost = "background-color: rgb(186 , 204, 217)";
            tabstylemy = "background-color: white";
        } else {
            tabstylelost = "background-color: white";
            tabstylemy = "background-color: rgb(186 , 204, 217)";
        }
        this.setData({
            tabstylelost: tabstylelost,
            tabstylemy: tabstylemy,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this
        wx.request({
            url: 'https://www.scnusay.cc/talking/confirmlogin.php',
            method: "POST",
            data: {
                'openid': app.globalData.openid
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            success(res) {
                //set the globaldata haslogin true
                if (res.data != '0') {
                    console.log(res.data)
                    app.globalData.haslogin = true;
                    _this.setData({
                        haslogin: true
                    })
                    console.log("确认登陆");
                } else {
                    console.log("未登录")
                    console.log("login 状态为" + app.globalData.haslogin)
                }

            }
        })
        //onload的时候需要从服务器获取数据,包括获取我的和失物招领的
        wx.request({
            //先是获取失物招领的
            url: 'https://www.scnusay.cc/talking/talkingphoto/getdetail.php',
            method: "GET",
            data: {},
            header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            success(res) {
                console.log(res.data);
                for (var i = 0; i < res.data.length; i++) {
                    //for是根据数据的长度插入新数组
                    //如果photo1为null，则不保存到tempPhoto中，photo2,photo3同理
                    var tempPhoto = []
                    if (res.data[i].photo1 != null) {
                        tempPhoto.push(res.data[i].photo1)
                    }
                    if (res.data[i].photo2 != null) {
                        tempPhoto.push(res.data[i].photo2)
                    }
                    if (res.data[i].photo3 != null) {
                        tempPhoto.push(res.data[i].photo3)
                    }
                    //nwearray是用于插入的数组
                    var newarray = {
                        blogger_id: res.data[i].id,
                        blogger_Openid: res.data[i].openid,
                        blogger_avatar: res.data[i].imgurl, //头像
                        blogger_name: res.data[i].name, //博主昵称
                        blogger_time: res.data[i].blogger_time, //发布时间的时间戳、这里需要修改
                        talking_topic: res.data[i].talking_topic, //标题
                        talking_time: res.data[i].talking_time, //丢失时间的时间戳、这里需要修改
                        talking_class: res.data[i].talking_class, //发布类别（不需要可以不填充
                        talking_detail: res.data[i].talking_detail, //主要内容
                        talking_space: res.data[i].talking_space, //
                        talking_space_detail: res.data[i].talking_space_detail,
                        talking_contact: res.data[i].talking_contact,
                        talking_hadsolved: res.data[i].had_solved,
                        photos: tempPhoto, //图片
                        readingtimes: res.data[i].readingtimes, //阅读次数
                        comments: 5, //评论数量
                        favour: res.data[i].favour, //点赞数量
                        had_favour: 0, //点赞判断
                        specialcode: res.data[i].specialcode,
                    }
                    _this.setData({
                        post0: _this.data.post0.concat(newarray),
                        //将数组插入post0
                    })
                }
            }
        })

        //然后获取我的
        wx.request({
            url: 'https://www.scnusay.cc/talking/talkingphoto/returnmytalking.php',
            method: "POST",
            data: {
                'openid': app.globalData.openid
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            success(res) {
                console.log(res.data);
                for (var i = 0; i < res.data.length; i++) {
                    //for是根据数据的长度插入新数组
                    //nwearray是用于插入的数组

                    //如果photo1为null，则不保存到tempPhoto中，photo2,photo3同理
                    var tempPhoto = []
                    if (res.data[i].photo1 != null) {
                        tempPhoto.push(res.data[i].photo1)
                    }
                    if (res.data[i].photo2 != null) {
                        tempPhoto.push(res.data[i].photo2)
                    }
                    if (res.data[i].photo3 != null) {
                        tempPhoto.push(res.data[i].photo3)
                    }
                    var newarray = {
                        blogger_id: res.data[i].id,
                        blogger_Openid: res.data[i].openid,
                        blogger_avatar: res.data[i].imgurl, //头像
                        blogger_name: res.data[i].name, //博主昵称
                        blogger_time: res.data[i].blogger_time, //发布时间的时间戳、这里需要修改
                        talking_topic: res.data[i].talking_topic, //标题
                        talking_time: res.data[i].talking_time, //丢失时间的时间戳、这里需要修改
                        talking_class: res.data[i].talking_class, //发布类别（不需要可以不填充
                        talking_detail: res.data[i].talking_detail, //主要内容
                        talking_space: res.data[i].talking_space, //
                        talking_hadsolved: res.data[i].had_solved,
                        talking_space_detail: res.data[i].talking_space_detail,
                        talking_contact: res.data[i].talking_contact,
                        // photos: [res.data[i].photo1, res.data[i].photo2, res.data[i].photo3], //放置于主要内容下方的图片
                        photos: tempPhoto,
                        readingtimes: res.data[i].readingtimes, //阅读次数
                        comments: 5, //评论数量
                        favour: res.data[i].favour, //点赞数量
                        had_favour: 0, //点赞判断
                        specialcode: res.data[i].specialcode,
                    }
                    _this.setData({
                        post1: _this.data.post1.concat(newarray),
                        //将数组插入post0
                    })
                }
            }
        })
        //request the server whether the user had login



        this.setData({
            navH: app.globalData.navHeight
        });

    },
    logo: function (e) {
        //跳转去首页
        wx.navigateTo({
            url: '/pages/index/index3',
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

})