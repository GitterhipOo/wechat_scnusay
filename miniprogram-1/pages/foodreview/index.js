// pages/foodreview/index.js
var app = getApp()
Page({
    godetail: function (e) {
        
        var id = e.currentTarget.dataset.id,
        name = e.currentTarget.dataset.name;
        console.log(id);
        console.log(name);
        // 执行页面跳转
        wx.navigateTo({
          url: '/pages/foodreview/detail'
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,
        shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
        selectDatas: ['南海校区', '石牌校区', '大学城校区','汕尾校区'], //下拉列表的数据
        indexs: 0, //选择的下拉列 表下标,
        isloading:false,
        infolist: [
            {   
                infoid: 1,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "熹园究极美食哈哈哈哈",
                infodetail:"非常之顶级顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶大大大大大大顶顶顶顶顶",
                infoimage:"../../assets/images/sort/publish.png",
                areaname:"南海校区",
                lookup: 300,
                nice: 50,
                talk: 40
            },
            {
                infoid: 2,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "熹园究极美食",
                infodetail:"非常之顶级",
                infoimage:"../../assets/images/sort/publish.png",
                areaname:"南海校区",
                lookup: 3,
                nice: 4,
                talk: 5
            },
            {
                infoid: 3,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "熹园究极美食",
                infodetail:"非常之顶级",
                infoimage:"../../assets/images/sort/publish.png",
                areaname:"南海校区",
                lookup: 3,
                nice: 4,
                talk: 5
            },
            {
                infoid: 4,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "熹园究极美食",
                infodetail:"非常之顶级",
                infoimage:"../../assets/images/sort/publish.png",
                areaname:"南海校区",
                lookup: 3,
                nice: 4,
                talk: 5
            },
            {
                infoid: 5,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "熹园究极美食",
                infodetail:"非常之顶级",
                infoimage:"../../assets/images/sort/publish.png",
                areaname:"南海校区",
                lookup: 3,
                nice: 4,
                talk: 5
            },
            {
                infoid: 6,
                icon: "../../assets/images/sort/part-time-job.png",
                name: "hzm",
                time: "1小时前",
                infotitle: "熹园究极美食",
                infodetail:"非常之顶级",
                infoimage:"../../assets/images/sort/publish.png",
                areaname:"南海校区",
                lookup: 3,
                nice: 4,
                talk: 5
            }
        ]
    },  
    search: function (e) {
        var id = e.currentTarget.dataset.id,
        name = e.currentTarget.dataset.name;
        console.log(id);
        console.log(name);
        // 执行页面跳转
        wx.reLaunch({
          url: '/pages/foodreview/index'
        })
    },
    selectTaps() {
        this.setData({
          shows: !this.data.shows,
        });
      },
      // 点击下拉列表
      optionTaps(e) {
        let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
        console.log(Indexs)
        this.setData({
          indexs: Indexs,
          shows: !this.data.shows
        });
        wx.reLaunch({
            url: '/pages/foodreview/index?indexs='+this.data.indexs
          })
      },
      gotopublish(){
        wx.navigateTo({
            url: '/pages/foodreview/publish',
          })    
    },getinfo(){
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let Indexs = JSON.parse(options.indexs);
        this.setData({
            navH: app.globalData.navHeight,
            indexs: Indexs
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
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if(this.data.isloading) return
        this.getinfo()
        console.log('触发了上拉触底实践')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})