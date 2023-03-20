// pages/SecendHandChange/index.js
var app = getApp()
Page({


    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,
        swiperHeight:"1000px",
        //页面切换相关数据
        current_Page: 0,
        photocou: 0, //用户上传图片的数量    
        // height: '',
        heights: [],
        owner_Data: {
            owner_Openid: "ouctO4ypxLjQ_3t67gYI-urvPoQs",
        },
              
        isloading:false,  
        //post0为商品列表 secendhand_class:1  
        post0: [],
        //post1为我的发布 secendhand_class:0
        post1: [],
        
    },
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
            key: "secendhandsendPostValue",
            data: postValue
            //储存在缓存中带过去再删除
        })
        // 执行页面跳转
        wx.navigateTo({
          url: '/pages/SecendHandChange/detail'
        })
    },
    //通过计算post的数量获取页面长度
    getSwiperItemHeight:function(){
        var postHeight = 0
        var post
        if (this.data.current_Page == 0){
            post = this.data.post0
        }
        else{
            post = this.data.post1
        }
        console.log(post)
        for (var i = 0; i < post.length; i++){
            if (post[i].photos.length > 0){
                postHeight+=500
            }
            else{
                postHeight+=300
            }
        }
        postHeight=postHeight+300;
        postHeight = postHeight + "rpx";
        console.log("计算页面高度触发")
        this.setData({
            swiperHeight:postHeight,
        })
        console.log("高度赋值完成")
    },
    // 点击标签判断
    clicktab: function (e) {
        //点击标签切换swiper
        var pag = e.currentTarget.dataset.current;
        console.log("点击标签的数据为" + e.currentTarget.dataset.current)
        this.getSwiperItemHeight()
        this.setData({
            current_Page: pag
        })
        var tabstylelost
        var tabstylemy
        if (this.data.current_Page == 0){
            tabstylelost="color: #9bd3d3";
            tabstylemy="color: black";
        }
        else{
            tabstylelost="color: black";
            tabstylemy="color: #9bd3d3";
        }
        this.setData({
            tabstylelost:tabstylelost,
            tabstylemy: tabstylemy,
        })
    },
    //滑动swiperItem修改currentPag
    changeswiper(e){ 
        this.setData({
            current_Page: e.detail.current
        })
        console.log("切换触发")
        this.getSwiperItemHeight()
        var tabstylelost
        var tabstylemy
        if (this.data.current_Page == 0){
            tabstylelost="color: #9bd3d3";
            tabstylemy="color: black";
        }
        else{
            tabstylelost="color: black";
            tabstylemy="color: #9bd3d3";
        }
        this.setData({
            tabstylelost:tabstylelost,
            tabstylemy: tabstylemy,
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
                            if (res.cancel) {
                            }
                            if (res.confirm) {
                                //console.log("选择菜蛋对应的specialcode为"+menupostValue)
                                wx.request({
                                    url: 'https://www.scnusay.cc/SecendHandDetail/SecendHandDetailPhoto/deletemysecendhandpost.php',
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
                                                if (res.cancel) {

                                                }
                                                if (res.confirm) {
                                                    wx.navigateTo({
                                                        url: '/pages/SecendHandChange/index',
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
            },

            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //let _this=this
        var _this=this
        
        wx.request({
            url: 'https://www.scnusay.cc/SecendHandDetail/confirmlogin.php',
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
                }
                else {
                    console.log("未登录")
                    console.log("login 状态为" + app.globalData.haslogin)
                }

            }
        })
        //onload的时候需要从服务器获取数据,包括获取我的和失物招领的
        wx.request({
            //先是获取失物招领的
            url: 'https://www.scnusay.cc/SecendHandDetail/SecendHandDetailPhoto/getdetail.php',
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
                        secendhand_topic: res.data[i].secendhand_topic, //标题
                        secendhand_time: res.data[i].secendhand_time, //丢失时间的时间戳、这里需要修改
                        secendhand_class: res.data[i].secendhand_class, //发布类别（不需要可以不填充
                        secendhand_detail: res.data[i].secendhand_detail, //主要内容
                        secendhand_space: res.data[i].secendhand_space, //
                        secendhand_space_detail: res.data[i].secendhand_space_detail,
                        secendhand_contact: res.data[i].secendhand_contact,
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
            url: 'https://www.scnusay.cc/SecendHandDetail/SecendHandDetailPhoto/returnmysecendhand.php',
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
                        secendhand_topic: res.data[i].secendhand_topic, //标题
                        secendhand_time: res.data[i].secendhand_time, //丢失时间的时间戳、这里需要修改
                        secendhand_class: res.data[i].secendhand_class, //发布类别（不需要可以不填充
                        secendhand_detail: res.data[i].secendhand_detail, //主要内容
                        secendhand_space: res.data[i].secendhand_space, //
                        secendhand_space_detail: res.data[i].secendhand_space_detail,
                        secendhand_contact: res.data[i].secendhand_contact,
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





        this.setData({
            navH: app.globalData.navHeight
          });
          this.getinfo()
        



    },
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
        }
        else {
            wx.navigateTo({
                url: '/pages/SecendHandChange/publish',
            })
            console.log("login 状态为" + app.globalData.haslogin)
            console.log("您已登录，获得发布权限")
        }
    },
    gotosearch: function (e) {
        console.log("点击去发布")
            wx.navigateTo({
                url: '/pages/SecendHandChange/search',
            })

    },


    logo: function (e) {
        // 发起网络请求
        wx.navigateTo({
        // 开发者服务器接口地址
          url: '/pages/index/index',
        })
      },
    getinfo(){
        this.setData({
            isloading:true
        })
        wx.showLoading({
          title: '数据加载中',
        })
        wx.request({
          url: '',
          method:'GET',
          success: ({data:res}) => {
              console.log(res)
              this.setData({
                  infolist: [...this.data.infolist,...res.data]
              })
          },
          complete: () => {
            wx.hideLoading()
                this.setData({
                    isloading:false
                })
              
          }
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
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(this.data.isloading) return
        this.getinfo()
        console.log('触发了上拉触底实践')
        this.getSwiperItemHeight()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})