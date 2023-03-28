// pages/ShareCar/ReleaseInformation/index.js
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {   
        navH: 0, 
        postValue: { //打包发送的post数组
            //判断作者直接返回openid就行了我日
            blogger_time: "", //发布时间         
            team_time: "", //截止时间
            team_contact: "", //联系方式
            team_space: "", //所在校区       
            team_detail: "", //详情内容
            //photos: [], //放置于主要内容下方的图片
            // tags: ["其他", "生活用品", "夹心糖"], //标签
            readingtimes: 0, //阅读次数
            comments: 0, //评论数量
            favour: 0, //点赞数量
            had_favour: 0, //点赞判断
            // favour_src: "/assets/images/icon/unfavour.png", //点赞图标
        }
    },
    adInputChange: function (e) {
        let that = this;
        let info = e.currentTarget.dataset.info; //所在的具体位置
        that.setData({
            ['postValue.' + info]: e.detail.value,
        })
    },
    sendToServer() {
        var that = this;
        var postValue = this.data.postValue
        var blogger_information = this.data.blogger_information
        var date = new Date(); //创建时间对象
        var year = date.getFullYear(); //获取年      
        var month = date.getMonth() + 1; //获取月      
        var day = date.getDate(); //获取日      
        var hour = date.getHours(); //获取时      
        var minute = date.getMinutes(); //获取分      
        var second = date.getSeconds(); //获取秒
        var time = `${year}年${month}月${day}日${hour}时${minute}分${second}秒`; //当前时间
        //设置博主信息
        postValue.blogger_time = time;
        //设置图片内容
        //postValue.photos = JSON.stringify(this.data.imglist);
        postValue.photos = this.data.imglist;

        // 这里暂时使用本地缓存来传输数据，以后会使用网络请求来传输数据
        wx.setStorage({
            key: "teamsendPostValue",
            data: postValue
        })
        //
        //打包发送到服务器
        wx.request({
            url: 'https://www.scnusay.cc/team/teamdetailsave.php',
            method: "POST",
            data: {
                'openid': app.globalData.openid,
                //这是联系方式 得改个名字
                //判断作者直接返回openid就行了我日
                'blogger_time': that.data.postValue.blogger_time, //发布时间
                'team_topic': that.data.postValue.team_topic, //标题
                'team_contact': that.data.postValue.team_contact, //联系方式              
                'team_space': that.data.postValue.team_space, //所在校区            
                'team_time': that.data.postValue.team_time, //截止时间
                'team_detail': that.data.postValue.team_detail, //详细内容
                'specialcode': app.globalData.openid + year + month + day + hour + minute + second,
                // readingtimes: 0, //阅读次数
                // comments: 0, //评论数量
                // favour: 0, //点赞数量
                // had_favour: 0, //点赞判断 
                // 这几个不用在这个时候发给后面 但是后面要存起来 方便以后的判断
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            success(res) {
                console.log(res.data);
                if (res.data == "发布成功")
                    wx.showModal({
                        title: '提示',
                        content: '发布成功！',
                    })
            }
        })
        // 'photos': [], //放置于主要内容下方的图片 等request第一次结束以后再放进去
        //下面是上传图片到服务器
        //console.log(that.data.postValue.photos.length)
        //计算photo数组长度 方便上传
        // for (var i = 1; i <= that.data.postValue.photos.length; i++) {
        //     wx.uploadFile({
        //         filePath: that.data.postValue.photos[i - 1],
        //         //filePath: "C:/Users/林木/Documents/GitHub/wechat_scnusay/miniprogram-1/img/black.png", 
        //         name: 'file',
        //         url: 'https://www.scnusay.cc/team/teamphoto/saveteamphoto.php',
        //         header: {
        //             "Content-Type": "multipart/form-data"
        //         },
        //         formData: {
        //             'now': i,
        //             "openid": app.globalData.openid,
        //             'specialcode': app.globalData.openid + year + month + day + hour + minute + second + i,
        //             'specialcode_inmysqlname': app.globalData.openid + year + month + day + hour + minute + second,
        //             'length': that.data.postValue.photos.length,
        //             //+i是为了避免重名 无法存入多张照片
        //             //上传图片的数量一起传过去 方便判断放在数据库的哪个位置 但是注意分辨数据库里面的不同值
        //         },
        //         success: function (res) {
        //             console.log(res.data)
        //         },
        //         fail: function (res) {
        //             console.log(123456);
        //         }


        //     })
        // }


        wx.showToast({
            title: '正在跳转到首页', //提示内容
            icon: 'none' ,//提示图标
            duration:4000
        })
        wx.navigateTo({
            url: '/pages/team/team',
        })
    },
    // getForm:function(e){
    //         var that = this;
   
    //   },     
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(app.globalData.openid);
        this.setData({
            navH: app.globalData.navHeight
          });
        if (app.globalData.haslogin == false) {
            //take a message to tell user to login and jump to index4 page
            wx.showToast({
                title: '请先登录',
                icon: 'error',
                duration: 2000
            })
            //kill the current page process
            wx.navigateBack({
                delta: 0,
            })
        } else {
            console.log("您已登录，获得发布权限")
        }
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