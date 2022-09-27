// pages/SecendHandChange/publish.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        productid:0,   
        title:"",
        info:"",
        addr:'' ,
        username:"",
        tip:"",
        navH: 0,
        imglist :[],
        shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
        selectDatas: ['南海校区', '大学城校区', '石牌校区','汕尾校区'], //下拉列表的数据
        indexs: 0, //选择的下拉列 表下标,
        dis:false,
        count: 3, //最多储存图片
        countNow: 0, //当前储存图片数量
    },
    getAddress:function(){
        var that=this;
        app.getPermission(that);    //传入that值可以在app.js页面直接设置内容    
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
      category: this.data.selectDatas[Indexs]
    });

  },
  titleblur(e) {
    this.setData({
      title: e.detail.value
    })
  },
  infoblur(e) {
    this.setData({
      info: e.detail.value
    })
  },
  usernameblur(e) {
    this.setData({
      username: e.detail.value
    })
  },
  tipblur(e) {
    this.setData({
      tip: e.detail.value
    })
  },
  formsubmit(e) {
    let that = this
    if (e.detail.value.title === "") {
      wx.showToast({
        title: '请输入标题',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    }  else if (e.detail.value.info === "") {
      wx.showToast({
        title: '请说说看法',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.addr === "") {
      wx.showToast({
        title: '请输入地址',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else {
      let params = {
        username: e.detail.value.username,
        tip: e.detail.value.tip,
        title: e.detail.value.title,
        addr: e.detail.value.addr,
        info: e.detail.value.info,
        category: e.detail.value.category,
      }
      wx.showModal({
        title: '提示',
        content: '确定分享',
        success(res) {
          if (res.confirm) {
            that.sureRelease(params); //发布
            that.setData({
              dis: true,
            })
          }
        }
      })
    }
  },
  //确认发布
  sureRelease(params) {
    let that = this
    app.addProduct(params).then(res => {
      that.data.params.productID = res.data.productID;
      that.data.params.bannerFile = res.data.bannerFile;
      that.data.params.contentFile = res.data.contentFile;
      for (var i = 0; i < that.data.banner.length; i++) {
        wx.uploadFile({
          url: app.globalData.baseUrl + '/wechat/release/addProductPhoto',
          filePath: that.data.banner[i],
          name: 'banner',
          formData: {
            'parameters': JSON.stringify(that.data.params)
          },
        })
        if (that.data.banner.length === i + 1) {
          for (var j = 0; j < that.data.detail.length; j++) {
            if (that.data.detail.length === j + 1) {
              that.data.params.check = true
            }
            wx.uploadFile({
              url: app.globalData.baseUrl + '/wechat/release/addProductPhoto',
              filePath: that.data.detail[j],
              name: 'detail',
              formData: {
                'parameters': JSON.stringify(that.data.params)
              },
              success: function(res) {
                if (JSON.parse(res.data).state === 1) {
                  wx.showToast({
                    title: '分享成功',
                    icon: "none",
                    duration: 2000,
                    mask: true,
                    success() {
                      setTimeout(function() {
                        wx.navigateBack({
                          delta: 0,
                        })
                      }, 1000);
                    }
                  })
                } else {
                  wx.showToast({
                    title: '商品发布失败，请稍后再试',
                    icon: "none",
                    duration: 2000,
                    mask: true,
                    success() {
                      setTimeout(function() {
                        wx.navigateBack({
                          delta: 0,
                        })
                      }, 1000);
                    }
                  })
                }
              },
              fail: function(res) {
                if (JSON.parse(res.errMsg) === "request:fail socket time out timeout:6000") {
                  wx.showToast({
                    title: '请求超时，请稍后再试！',
                    icon: "none",
                    duration: 2000,
                    mask: true,
                    success() {
                      setTimeout(function() {
                        wx.navigateBack({
                          delta: 0,
                        })
                      }, 1000);
                    }
                  })
                }
              }
            })
          }
        }
      }
    })
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