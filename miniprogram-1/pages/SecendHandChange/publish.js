// pages/SecendHandChange/publish.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,  
        count: 3, //最多储存图片
        countNow: 0, //当前储存图片数量
        imglist :[],
        shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
        selectDatas: ['生活用品', '图书文具', '电子产品','化妆用品','服装鞋饰','其他'], //下拉列表的数据
        indexs: 0, //选择的下拉列 表下标,
        dis:false,
        postValue: { //打包发送的post数组
            //判断作者直接返回openid就行了我日
            blogger_time: "", //发布时间
            SHchange_title: "", //标题
            SHchange_info: "", //物品信息
            SHchange_price:"",//价格
            SHchange_category: " ", //分类
            SHchange_username: "", //姓名
            SHchange_tip: "", //备注
            photos: [], //放置于主要内容下方的图片
            readingtimes: 0, //阅读次数
            comments: 0, //评论数量
            favour: 0, //点赞数量
            had_favour: 0, //点赞判断
           // favour_src: "/assets/images/icon/unfavour.png", //点赞图标
        },
    },
    img_w_show() {
        var count = this.data.count
        var _this = this;
        if (_this.data.countNow == count) {
            wx.showToast({
                title: '最多上传' + count + '张图片噢！',
                icon: 'error',
                duration: 500 //持续的时间
            })
        } else 
        {
            wx.chooseMedia({
              count: 3,
              mediaType:['image'],
              sourceType:['album','camera'],
              sizeType:['compressed'],
              camera: 'back',
              success(res) {

                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 500
                  })

                  console.log(res)
                     var tempFilePaths = res.tempFiles[0].tempFilePath
                        _this.setData({
                            countNow: _this.data.countNow + 1,
                            imglist: _this.data.imglist.concat(tempFilePaths)
                        })
                console.log("暂时路径为"+res.tempFiles[0].tempFilePath)
                console.log("大小为"+res.tempFiles[0].size)
              },
            })

        }
    },
    
  // 预览图片
  previewImg: function(e) {
 
  },
  // 点击删除
  deleteImg(e) {
    var _this = this;
    var imgList = _this.data.imglist
    let index = e.target.dataset.index //当前点击元素索引
    console.log(index)
    wx.showModal({
        title: '删除确认',
        content: '是否删除该图片',
        success: function (res) {
            if (res.confirm) { //这里是点击了确定以后
                if (imgList.length >= 1) { //执行删除操作，规避splice函数的特性
                    imgList.splice(index, 1);
                    console.log(imgList)
                    _this.setData({
                        imglist: imgList,
                        countNow: _this.data.countNow - 1
                    })
                } else {
                    _this.setData({
                        imglist: [],
                        countNow: _this.data.countNow - 1
                    })
                }
            } else { //这里是点击了取消以后
                console.log('用户点击取消')
            }
        }
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
      shows: !this.data.shows,
      ['postValue.SHchange_category']: this.data.selectDatas[Indexs]
    });

  },
  //更新数据
  adInputChange: function (e) {
    let that = this;
    let info = e.currentTarget.dataset.info; //所在的具体位置
    that.setData({
        ['postValue.' + info]: e.detail.value,
    })
},
        //打包数据发送
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
                key: "sendPostValue",
                data: postValue
            })
            //
            //打包发送到服务器
            wx.request({
              url: 'https://www.scnusay.cc/lostdetail/lostdetailsave.php',
                method:"POST",
                data:{
                    'openid':app.globalData.openid,
                       //这是联系方式 得改个名字
                      //判断作者直接返回openid就行了我日
                    'blogger_time':that.data.postValue.blogger_time, //发布时间
                    'lostthing_topic':that.data.postValue.lostthing_topic, //标题
                    'lostthing_time':that.data.postValue.lostthing_time, //丢失时间，以字符串直接储存
                    'lostthing_class':  that.data.postValue.lostthing_class, //发布类别（不需要可以不填充
                    'lostthing_detail':that.data.postValue. lostthing_detail, //主要内容
                    'lostthing_space':that.data.postValue.lostthing_space, //丢失地点
                    'lostthing_space_detail':that.data.postValue.lostthing_space_detail, //丢失详细地址
                    'lostthing_contact':that.data.postValue.lostthing_contact, //联系方式
                    'specialcode':app.globalData.openid+year+month+day+hour+minute+second,
                // readingtimes: 0, //阅读次数
                // comments: 0, //评论数量
                // favour: 0, //点赞数量
                // had_favour: 0, //点赞判断 
                // 这几个不用在这个时候发给后面 但是后面要存起来 方便以后的判断
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'  
                },
                success(res){
                    console.log(res.data);
                    if(res.data=="发布成功")
                    wx.showModal({
                        title: '提示',
                        content: '发布成功！',
                      })
                }
            })
            // 'photos': [], //放置于主要内容下方的图片 等request第一次结束以后再放进去
            //下面是上传图片到服务器
            console.log(that.data.postValue.photos.length)
            //计算photo数组长度 方便上传
            for(var i=1;i<=that.data.postValue.photos.length;i++){
                wx.uploadFile({
                  filePath: that.data.postValue.photos[i-1],
                 //filePath: "C:/Users/林木/Documents/GitHub/wechat_scnusay/miniprogram-1/img/black.png", 
                  name: 'file',
                  url: 'https://www.scnusay.cc/lostdetail/lostdetailphoto/savelostphoto.php',
                  header: {
                    "Content-Type": "multipart/form-data"
                  },
                  formData:{
                      'now':i,
                      "openid":app.globalData.openid,
                      'specialcode':app.globalData.openid+year+month+day+hour+minute+second+i,
                      'specialcode_inmysqlname':app.globalData.openid+year+month+day+hour+minute+second,
                      'length':that.data.postValue.photos.length,
                      //+i是为了避免重名 无法存入多张照片
                      //上传图片的数量一起传过去 方便判断放在数据库的哪个位置 但是注意分辨数据库里面的不同值
                  },
                  success:function(res){
                    console.log(res.data)
                  },
                  fail:function(res){
                      console.log(123456);
                  }
    
                  
                })
            }
    
    
            wx.showToast({
                title: '正在跳转到详情页面', //提示内容
                icon: 'none' //提示图标
            })
            wx.navigateTo({
              url: '/pages/lostthing/details',
            })
            // wx.navigateBack({
            //     // 返回上 1 页
            //     delta: 1
            // })
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