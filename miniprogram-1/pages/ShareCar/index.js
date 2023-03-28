// pages/ShareCar/index.js
Page({

    
    /**
     * 页面的初始数据
     */
    data: {
            like: [],
            likeList: [],
            id: '',//数据的id
            isClick: false,
            likeStorage: [],//缓存
            likeId: '',//缓存ID
            data_index:[
                {
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',
                    blogger_name: '黄志敏黄志敏黄志敏',
                    blogger_time: '11小时前发布',
                    ShareCar_title: '小塘医院做核酸',
                    ShareCar_time: '2022年9月1日',
                    ShareCar_space: '南海校区',
                    ShareCar_spot: '北门门口',
                    ShareCar_contact: '18823828238',
                    ShareCar_class: 'AA制',
                    ShareCar_people: '4人',
                    readingtimes: 49, //阅读次数
                    comments: 5, //评论数量
                    favour: 20, //点赞数量
                    had_favour: 0, //点赞判断
                    had_collection:0,//收藏判断
                },{
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',
                    blogger_name: '1447523',
                    blogger_time: '1小时前发布',
                    ShareCar_title: '零度网吧5黑CF',
                    ShareCar_time: '2022年9月32日',
                    ShareCar_space: '南海校区',
                    ShareCar_spot: 'A栋201',
                    ShareCar_contact: '13423212311',
                    ShareCar_class: '面基协商',
                    ShareCar_people: '3人',
                    readingtimes: 49, //阅读次数
                    comments: 5, //评论数量
                    favour: 20, //点赞数量
                    had_favour: 0, //点赞判断
                    had_collection:0,//收藏判断
                },{
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',
                    blogger_name: '黄志敏qwee',
                    blogger_time: '11小时前发布',
                    ShareCar_title: '小塘医院看病',
                    ShareCar_time: '2022年9月1日',
                    ShareCar_space: '南海校区',
                    ShareCar_spot: '北门门口',
                    ShareCar_contact: '18823828238',
                    ShareCar_class: '包车请客',
                    ShareCar_people: '2人',
                    readingtimes: 49, //阅读次数
                    comments: 5, //评论数量
                    favour: 20, //点赞数量
                    had_favour: 0, //点赞判断
                    had_collection:0,//收藏判断
                },{
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',
                    blogger_name: '黄志敏与uZI',
                    blogger_time: '3小时前发布',
                    ShareCar_title: '去佛山西站',
                    ShareCar_time: '2022年9月5日',
                    ShareCar_space: '南海校区',
                    ShareCar_spot: '南门门口',
                    ShareCar_contact: '18823828238',
                    ShareCar_class: '自驾顺风车',
                    ShareCar_people: '1人',
                    readingtimes: 49, //阅读次数
                    comments: 5, //评论数量
                    favour: 20, //点赞数量
                    had_favour: 0, //点赞判断
                    had_collection:0,//收藏判断
                },{
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',
                    blogger_name: '黄敏黄敏黄敏',
                    blogger_time: '11小时前发布',
                    ShareCar_title: '青年旅馆睡觉',
                    ShareCar_time: '2022年9月1日',
                    ShareCar_space: '南海校区',
                    ShareCar_spot: '北门门口',
                    ShareCar_contact: '18823828238',
                    ShareCar_class: 'AA制',
                    ShareCar_people: '4人',
                    readingtimes: 49, //阅读次数
                    comments: 5, //评论数量
                    favour: 20, //点赞数量
                    had_favour: 0, //点赞判断
                    had_collection:0,//收藏判断
                }
            ]

            
    },
    calling: function () {
        // var pnumber = this.data.data_index.ShareCar_contact;
        wx.makePhoneCall({
        phoneNumber: '18823828238',
        success: function () {
        console.log("拨打电话成功！")
        },
        fail: function () {
        console.log("拨打电话失败！")
        }
        })
        },
    GOTO:function(){
        wx.navigateTo({
          url: './details/details',
        })
    },
    like:function(){
        if(!this.data.isClick == true){
            // let likeData = this.data.likeStorage;
            // likeData.push({
            //   likeid:likeData.length,
            //   id:this.data.like.id
            // })
            // wx.setStorageSync('likeData', likeData);
            // wx.setStorageSync('id', this.data.like.id);
            wx.showToast({
              title: '已收藏',
            });
          }else{
            wx.showToast({
              title: '已取消收藏',
            })
<<<<<<< Updated upstream
          }
          this.setData({
            isClick:!this.data.isClick
          })
=======
        }
        else {
            wx.navigateTo({
                url: '/pages/ShareCar/publish',
            })
            console.log("login 状态为" + app.globalData.haslogin)
            console.log("您已登录，获得发布权限")
        }
    },
    gotosearch: function (e) {
        console.log("点击去发布")
            wx.navigateTo({
                url: '/pages/ShareCar/search',
            })

    },
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
                postHeight+=500
            
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
            tabstylelost="color: #10b1b1";
            tabstylemy="color: grey";
        }
        else{
            tabstylelost="color: grey";
            tabstylemy="color: #10b1b1";
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
            tabstylelost="color: #10b1b1";
            tabstylemy="color: grey";
        }
        else{
            tabstylelost="color: grey";
            tabstylemy="color: #10b1b1";
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
                                    url: 'https://www.scnusay.cc/sharecar/sharecarphoto/deletemysharecarpost.php',
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
                                                        url: '/pages/ShareCar/index',
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
>>>>>>> Stashed changes
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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