// pages/ShareCar/index.js
var app = getApp()
var startX, endX; //首先创建2个变量 来记录触摸时的原点
var moveFlag = true; // 判断执行滑动事件
Page({

    
    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,
        swiperHeight:"1000px",
        current_Page: 0,
        heights: [],
        owner_Data: {
            owner_Openid: "ouctO4ypxLjQ_3t67gYI-urvPoQs",
        },
        //post0为拼车大厅信息
            post0:[            

            ],
            //post1为我的发布信息
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
            key: "sharecarsendPostValue",
            data: postValue
            //储存在缓存中带过去再删除
        })
        // 执行页面跳转
        wx.navigateTo({
          url: '/pages/ShareCar/detail'
        })
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
                postHeight+=484
            
        }
        if (postHeight == 0) postHeight = 300
        postHeight = postHeight +100;
        postHeight = postHeight + "rpx";
        console.log("计算页面高度触发")
        for (var i = 0; i < post.length; i++){
            if (post[i].photos.length > 0){
                postHeight+=720
            }
            else{ 
                postHeight+=500
            }
        }
        postHeight=postHeight+400;

        postHeight = postHeight+"rpx";

        this.setData({
            swiperHeight:postHeight,
        })
        console.log("高度赋值完成,计算高度为",postHeight)
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
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            navH: app.globalData.navHeight
          });
          var _this=this
        
          wx.request({
              url: 'https://www.scnusay.cc/sharecar/confirmlogin.php',
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
              url: 'https://www.scnusay.cc/sharecar/sharecarphoto/getdetail.php',
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
                        sharecar_topic: res.data[i].sharecar_topic, //标题
                        sharecar_time: res.data[i].sharecar_time, //出发时间
                        sharecar_number: res.data[i].sharecar_number, //人数
                        sharecar_detail: res.data[i].sharecar_detail, //详细内容
                        sharecar_space: res.data[i].sharecar_space, //所在校区
                        sharecar_from: res.data[i].sharecar_from,//出发地点
                        sharecar_go: res.data[i].sharecar_go,//目的地
                        sharecar_contact: res.data[i].sharecar_contact,//联系方式
                          // saled:res.data[i].
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
              url: 'https://www.scnusay.cc/sharecar/sharecarphoto/returnmysharecar.php',
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
                          sharecar_topic: res.data[i].sharecar_topic, //标题
                        sharecar_time: res.data[i].sharecar_time, //出发时间
                        sharecar_number: res.data[i].sharecar_number, //人数
                        sharecar_detail: res.data[i].sharecar_detail, //详细内容
                        sharecar_space: res.data[i].sharecar_space, //所在校区
                        sharecar_from: res.data[i].sharecar_from,//出发地点
                        sharecar_go: res.data[i].sharecar_go,//目的地
                        sharecar_contact: res.data[i].sharecar_contact,//联系方式
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
          this.getinfo()
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
                url: 'index',
              })
        }, 300)
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        console.log("触底事件触发")
        this.getSwiperItemHeight()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})