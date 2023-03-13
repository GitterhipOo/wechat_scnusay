
App({
    globalData: {
        openid:"null000",
        headurl:"",
        wxname:"",
        haslogin:false,
      userInfo: null,
      navHeight: 0,
      tags: [{
        text:"表白墙"
      },{
        text:"二手交易"
      }],
      meta: {}
    },
    getPermission:function(obj){
        wx.chooseLocation({
          success: function (res) {    
              obj.setData({
                  addr: res.address      //调用成功直接设置地址
              })                
          },
          fail:function(){
              wx.getSetting({
                  success: function (res) {
                      var statu = res.authSetting;
                      if (!statu['scope.userLocation']) {
                          wx.showModal({
                              title: '是否授权当前位置',
                              content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                              success: function (tip) {
                                  if (tip.confirm) {
                                      wx.openSetting({
                                          success: function (data) {
                                              if (data.authSetting["scope.userLocation"] === true) {
                                                  wx.showToast({
                                                      title: '授权成功',
                                                      icon: 'success',
                                                      duration: 1000
                                                  })
                                                  //授权成功之后，再调用chooseLocation选择地方
                                                  wx.chooseLocation({
                                                      success: function(res) {
                                                          obj.setData({
                                                              addr: res.address
                                                          })
                                                      },
                                                  })
                                              } else {
                                                  wx.showToast({
                                                      title: '授权失败',
                                                      icon: 'success',
                                                      duration: 1000
                                                  })
                                              }
                                          }
                                      })
                                  }
                              }
                          })
                      }
                  },
                  fail: function (res) {
                      wx.showToast({
                          title: '调用授权窗口失败',
                          icon: 'success',
                          duration: 1000
                      })
                  }
              })
          }
      })        
     },
    onLaunch: function (t) {
        var that=this
       // 获取顶部栏信息
       wx.getSystemInfo({
        success: res => {
          //导航高度
          this.globalData.navHeight = res.statusBarHeight;
        }, fail(err) {
          console.log(err);
        }
      })
      wx.login({
        success(res){
            if(res.code)
            {
              console.log('code为'+res.code+'\n')
                wx.request({
                  url: 'https://www.scnusay.cc/login/login.php',
                  method:"POST",
                  data:{
                      code:res.code
                  },
                  header: { 
                      "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
                  },
                  success(res){
                    
                      //console.log(res.data);
                      that.globalData.openid=res.data;
                      console.log('全局数据的openid为'+that.globalData.openid)
                  }
  
                })
            }else{
                console.log('登陆失败！'+res.errMsg)
            }
        }
      });


    //   查询服务器有无头像
    },
    
    
  })