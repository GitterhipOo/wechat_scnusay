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
                {     
                    blogger_name:"11122",                
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',                  
                    blogger_time: '2023年3月22日10:25分11秒',
                    team_topic: '零度网吧5黑1316546487899878979456546546546565446565465',                  
                    team_space: '南海校区', 
                    team_time:"",//截止日期
                    team_contact:"",//联系方式
                    team_detail:"帮转 #互联网+队员招募核心词：阿尔茨海默症筛查 游戏设计 健康管理系统👥团队简述：本团队已完成项目框架搭建，具备合理的商业运营模式，完成游戏demo制作，项目计划书已完成初稿，处于完善阶段。 项目已获得国家级大创立项。项目负责人曾获数模省二等奖、美国大学生数学建模比赛(MCM)特等奖提名奖、连续两年保持绩点第一并获校级综合奖学金一等奖。项目成员曾独立主持校级大创项目，并有互联网+银、铜奖等创赛奖项经历。  项目有丰富资源，导师团队阵容强大，配置合理。已获得来自心理学院、经管学院、创业学院的优秀老师指导。导师经验丰富，为人和善亲切，曾多次指导同学参加挑战杯省级、大创国家级、省级比赛等。   现诚招募：【技术人员】1人 💧具备能力：进行网页/软件开发、能够做出基础交互页面、进行ui设计💧工作内容：依据目前产品需求，负责基于网页/软件的健康系统开发、ui设计部分💧相关要求：态度认真，协作沟通能力强，近期时间充裕，认真负责，不拖ddl 💧软院、计算机等学院优先考虑，20级、21级学生优先🛎 有意者请直接发简历至邮箱📪Joshuazsy@163.com请备注AD筛查+年级+专业姓名，有相关作品的可以发送辅证资料）📍截止日期：2023.3.25 24:00",
                    readingtimes: 49, //阅读次数
                    comments: 5, //评论数量
                    favour: 20, //点赞数量
                }
            ],
            //post1为我的发布信息
            post1: [ { 
                blogger_name:"11122",                
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',                  
                    blogger_time: '2023年3月22日10:25分11秒',
                    team_topic: '零度网吧5黑1316546487899878979456546546546565446565465',                  
                    team_space: '南海校区', 
                    team_time:"",//截止日期
                    team_contact:"",//联系方式
                    team_detail:"帮转 #互联网+队员招募核心词：阿尔茨海默症筛查 游戏设计 健康管理系统👥团队简述：本团队已完成项目框架搭建，具备合理的商业运营模式，完成游戏demo制作，项目计划书已完成初稿，处于完善阶段。 项目已获得国家级大创立项。项目负责人曾获数模省二等奖、美国大学生数学建模比赛(MCM)特等奖提名奖、连续两年保持绩点第一并获校级综合奖学金一等奖。项目成员曾独立主持校级大创项目，并有互联网+银、铜奖等创赛奖项经历。  项目有丰富资源，导师团队阵容强大，配置合理。已获得来自心理学院、经管学院、创业学院的优秀老师指导。导师经验丰富，为人和善亲切，曾多次指导同学参加挑战杯省级、大创国家级、省级比赛等。   现诚招募：【技术人员】1人 💧具备能力：进行网页/软件开发、能够做出基础交互页面、进行ui设计💧工作内容：依据目前产品需求，负责基于网页/软件的健康系统开发、ui设计部分💧相关要求：态度认真，协作沟通能力强，近期时间充裕，认真负责，不拖ddl 💧软院、计算机等学院优先考虑，20级、21级学生优先🛎 有意者请直接发简历至邮箱📪Joshuazsy@163.com请备注AD筛查+年级+专业姓名，有相关作品的可以发送辅证资料）📍截止日期：2023.3.25 24:00",
                    readingtimes: 49, //阅读次数
                    comments: 5, //评论数量
                    favour: 20, //点赞数量
            }],
            
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
          url: '/pages/team/detail'
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
                url: '/pages/team/publish',
            })
            console.log("login 状态为" + app.globalData.haslogin)
            console.log("您已登录，获得发布权限")
        }
    },
    gotosearch: function (e) {
        console.log("点击去发布")
            wx.navigateTo({
                url: '/pages/team/search',
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
            tabstylelost="color: #e2a22a";
            tabstylemy="color: black";
        }
        else{
            tabstylelost="color: black";
            tabstylemy="color: #e2a22a";
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
            tabstylelost="color: #e2a22a";
            tabstylemy="color: black";
        }
        else{
            tabstylelost="color: black";
            tabstylemy="color: #e2a22a";
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
                                                        url: '/pages/team/index',
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
                    //   var tempPhoto = []
                    //   if (res.data[i].photo1 != null) {
                    //       tempPhoto.push(res.data[i].photo1)
                    //   }
                    //   if (res.data[i].photo2 != null) {
                    //       tempPhoto.push(res.data[i].photo2)
                    //   }
                    //   if (res.data[i].photo3 != null) {
                    //       tempPhoto.push(res.data[i].photo3)
                    //   }
                      //nwearray是用于插入的数组
                      var newarray = {
                        blogger_id: res.data[i].id,
                        blogger_Openid: res.data[i].openid,
                        blogger_avatar: res.data[i].imgurl, //头像
                        blogger_name: res.data[i].name, //博主昵称
                        blogger_time: res.data[i].blogger_time, //发布时间的时间戳、这里需要修改
                        team_topic: res.data[i].team_topic, //标题
                        team_time: res.data[i].team_time, //出发时间
                        team_detail: res.data[i].team_detail, //详细内容
                        team_contact: res.data[i].team_contact,//联系方式
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
                    //   var tempPhoto = []
                    //   if (res.data[i].photo1 != null) {
                    //       tempPhoto.push(res.data[i].photo1)
                    //   }
                    //   if (res.data[i].photo2 != null) {
                    //       tempPhoto.push(res.data[i].photo2)
                    //   }
                    //   if (res.data[i].photo3 != null) {
                    //       tempPhoto.push(res.data[i].photo3)
                    //   }
                      var newarray = {
                          blogger_id: res.data[i].id,
                          blogger_Openid: res.data[i].openid,
                          blogger_avatar: res.data[i].imgurl, //头像
                          blogger_name: res.data[i].name, //博主昵称
                          blogger_time: res.data[i].blogger_time, //发布时间的时间戳、这里需要修改
                          sharecar_topic: res.data[i].sharecar_topic, //标题
                          team_time: res.data[i].team_time, //出发时间
                        team_detail: res.data[i].team_detail, //详细内容
                        team_space: res.data[i].team_space, //所在校区                   
                        team_contact: res.data[i].team_contact,//联系方式
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