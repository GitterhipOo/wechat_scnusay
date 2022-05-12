
App({
    globalData: {
        openid:"null000",
        headurl:"",
        wxname:"",
      userInfo: null,
      navHeight: 0,
      tags: [{
        text:"表白墙"
      },{
        text:"二手交易"
      }],
      meta: {}
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
      
    },
    
  })