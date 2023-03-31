// pages/talking/send.js
var app = getApp()
Page({

    data: {
        imglist: [], //照片暂时的存放区域
        count: 3, //最多储存图片
        countNow: 0, //当前储存图片数量
        current_Page: 0, //当前所在的图片位置
        array_Space: ['石牌', '大学城', '南海', '汕尾'],
        array_Tag: ['其他', '图书文具', '生活用品', '电子产品', '化妆用品', '服装鞋包'],
        talking_Time_Binding: "丢失",
        space: 0, //地点绑定的初始值
        tag: 0, //分类绑定的初始值
        spaceColor: "#afeeee",
        tagColor: "#afeeee",


        postValue: { //打包发送的post数组
            //判断作者直接返回openid就行了我日
            blogger_time: "", //发布时间
            talking_topic: "", //标题
            talking_time: "", //丢失时间，以字符串直接储存
            talking_class: "失物招领", //发布类别（不需要可以不填充
            talking_detail: "", //主要内容
            talking_space: "石牌", //丢失地点
            talking_space_detail: "", //丢失详细地址
            talking_contact: "", //联系方式
            photos: [], //放置于主要内容下方的图片
            // tags: ["其他", "生活用品", "夹心糖"], //标签
            readingtimes: 0, //阅读次数
            comments: 0, //评论数量
            favour: 0, //点赞数量
            had_favour: 0, //点赞判断
            // favour_src: "/assets/images/icon/unfavour.png", //点赞图标
        },



    },
    onLoad: function (options) {
        console.log(app.globalData.openid);
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
    //添加照片功能
    img_w_show() {
        var count = this.data.count
        var _this = this;
        if (_this.data.countNow == count) {
            wx.showToast({
                title: '最多上传' + count + '张图片噢！',
                icon: 'error',
                duration: 500 //持续的时间
            })
        } else {
            wx.chooseMedia({
                count: _this.data.count - _this.data.countNow,
                mediaType: ['image'],
                sourceType: ['album', 'camera'],
                sizeType: ['compressed'],
                camera: 'back',
                success(res) {

                    wx.showLoading({
                        title: '上传图片中',
                    })

                    console.log(res)
                    var tempFilesPaths = []
                    for (var i = 0; i < res.tempFiles.length; i++)
                        tempFilesPaths.push(res.tempFiles[i].tempFilePath)
                    _this.setData({
                        current_Page: _this.data.countNow,
                        countNow: _this.data.countNow + tempFilesPaths.length,
                        imglist: _this.data.imglist.concat(tempFilesPaths)
                    })
                    console.log("暂时路径为" + res.tempFiles[0].tempFilePath)
                    console.log("大小为" + res.tempFiles[0].size)
                    wx.hideLoading()
                },
            })
        }
    },

    // 预览图片
    previewImg: function (e) {
        console.log(e)
        wx.previewImage({
          urls: [e.currentTarget.dataset.url],
        })
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
    // //绑定“way”值为“寻找失主”并设置变量
    // bindPickerChange_Way: function (e) {
    //     console.log('way发送选择改变，携带值为', e.detail.value)
    //     if (e.detail.value) {
    //         this.setData({
    //             ['postValue.way']: "寻找失主",
    //             talking_Time_Binding: "拾得"
    //         })
    //     } else {
    //         this.setData({
    //             ['postValue.way']: "失物求寻",
    //             talking_Time_Binding: "丢失"
    //         })
    //     }
    // },
    //选择器，实现修改“地点、分类”后变换颜色为黑色
    bindPickerChange_Space: function (e) {
        // console.log('space发送选择改变，携带值为', e.detail.value);
        let temp = this.data.array_Space[e.detail.value];
        let space = e.detail.value;
        this.setData({
            space: space,
            ['postValue.talking_space']: temp,
            spaceColor: '#000',
        })
    },
    //选择器，实现修改“地点、分类”后变换颜色为黑色
    bindPickerChange_Tag: function (e) {
        // console.log('Tag发送选择改变，携带值为', e.detail.value)
        let temp = this.data.array_Tag[e.detail.value];
        let tag = e.detail.value;
        this.setData({
            tag: tag,
            ['postValue.tags[0]']: temp,
            tagColor: '#000',
        })
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
            url: 'https://www.scnusay.cc/talking/talkingdetailsave.php',
            method: "POST",
            data: {
                'openid': app.globalData.openid,
                //这是联系方式 得改个名字
                //判断作者直接返回openid就行了我日
                'blogger_time': that.data.postValue.blogger_time, //发布时间
                'talking_topic': that.data.postValue.talking_topic, //标题
                'talking_time': that.data.postValue.talking_time, //丢失时间，以字符串直接储存
                'talking_class': that.data.postValue.talking_class, //发布类别（不需要可以不填充
                'talking_detail': that.data.postValue.talking_detail, //主要内容
                'talking_space': that.data.postValue.talking_space, //丢失地点
                'talking_space_detail': that.data.postValue.talking_space_detail, //丢失详细地址
                'talking_contact': that.data.postValue.talking_contact, //联系方式
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
        console.log(that.data.postValue.photos.length)
        //计算photo数组长度 方便上传
        for (var i = 1; i <= that.data.postValue.photos.length; i++) {
            wx.uploadFile({
                filePath: that.data.postValue.photos[i - 1],
                //filePath: "C:/Users/林木/Documents/GitHub/wechat_scnusay/miniprogram-1/img/black.png", 
                name: 'file',
                url: 'https://www.scnusay.cc/talking/talkingphoto/savetalkingphoto.php',
                header: {
                    "Content-Type": "multipart/form-data"
                },
                formData: {
                    'now': i,
                    "openid": app.globalData.openid,
                    'specialcode': app.globalData.openid + year + month + day + hour + minute + second + i,
                    'specialcode_inmysqlname': app.globalData.openid + year + month + day + hour + minute + second,
                    'length': that.data.postValue.photos.length,
                    //+i是为了避免重名 无法存入多张照片
                    //上传图片的数量一起传过去 方便判断放在数据库的哪个位置 但是注意分辨数据库里面的不同值
                },
                success: function (res) {
                    console.log(res.data)
                },
                fail: function (res) {
                    console.log(123456);
                }


            })
        }


        wx.showToast({
            title: '正在返回首页', //提示内容
            icon: 'none' ,//提示图标
            duration:2000
        })
        wx.showModal({
          title: '发布成功',
          content: '即将返回首页',
          showCancel:false,
          complete: (res) => {
            if (res.cancel) {
              
            }
        
            if (res.confirm) {
                wx.reLaunch({
                    url: 'index3',
                  })
            }
          }
        })

        // wx.navigateBack({
        //     // 返回上 1 页
        //     delta: 1
        // })
    }
})