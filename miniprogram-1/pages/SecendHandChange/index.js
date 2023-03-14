// pages/SecendHandChange/index.js
var app = getApp()
Page({

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
            key: "sendPostValue",
            data: postValue
            //储存在缓存中带过去再删除
        })
        // 执行页面跳转
        wx.navigateTo({
          url: '/pages/SecendHandChange/detail'
        })
    },
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
        //post0为商品列表 lostthing_class:1  
        post0: [
            {   
                blogger_avatar: "https://www.scnusay.cc/icon/part-time-job.png",
                blogger_time: "2023年3月13日15:39:23",
                SHchange_topic: "出售顶级皮肤啦啦啦出售顶级皮肤啦啦啦出售顶级皮肤啦啦啦",
                SHchange_detail:"非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
                photos:["https://www.scnusay.cc/icon/part-time-job.png","https://www.scnusay.cc/icon/part-time-job.png","https://www.scnusay.cc/icon/part-time-job.png"],
                SHchange_class:"闲置",
                comments:235
            }   
        ],
        //post1为我的发布 lostthing_class:0
        post1: [
            {   
                blogger_avatar: "https://www.scnusay.cc/icon/part-time-job.png",
                blogger_time: "2023年3月13日15:39:23",
                SHchange_topic: "出售顶级皮肤啦啦啦出售顶级皮肤啦啦啦出售顶级皮肤啦啦啦",
                SHchange_detail:"非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦非常之顶级啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
                photos:["https://www.scnusay.cc/icon/part-time-job.png","https://www.scnusay.cc/icon/part-time-job.png","https://www.scnusay.cc/icon/part-time-job.png"],
                SHchange_class:"求购"
            }       
        ]
        
    },
    //通过计算post的数量获取页面长度
    getSwiperItemHeight:function(){
        var postHeight
        if (this.data.current_Page == 0){
            postHeight=(this.data.post0.length)*500+100+"rpx";
        }
        else{
            postHeight=(this.data.post1.length)*500+100+"rpx";
        }
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
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            navH: app.globalData.navHeight
          });
          this.getinfo()
        
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
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})