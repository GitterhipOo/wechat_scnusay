var app = getApp()

Page({
    data: {
        navH: 0,
        swiperHeight:"1000px",
        //主人公数据
        blogger_list: [],
        //评论数据
        comment_list: [],
        //回复数据
        comment_list2: [],
        /*定义一些数据*/
        focus: false, //输入框是否聚焦
        placeholder: '写回复', //底部输入框占字符
        placeholder2: '说点什么，表达你的想法吧！', //顶部输入框占字符
        inputvalue: null, //顶部输入框内容
        comment_text: null, //底部评论框内容
        detail_specialcode:'', 
        /*
         *以下初始化数据是用户点击任意一条评论或回复时需要设置的数据
         *然后将设置好的数据传递给评论时新创建的评论数据对象
         */
        now_reply_name: null, //当前点击的评论或回复评论的用户昵称
        now_reply_type: 0, //当前回复类型 默认为0 1为回复评论 2为回复回复
        now_parent_id: 0, //当前点击的评论或回复评论的所属评论id
        now_reply: 0, //当前点击的评论或回复评论的id

    },
    //获得输入的内容
    inputCom:function(e){
	    this.setData({
	        inputvalue: e.detail.value
	    })
        console.log(this.data.inputvalue);
    },
    //点击用户评论或回复时触发
    replyComment(e) {
        var cid = e.currentTarget.dataset.cid; //当前点击的评论id
        var name = e.currentTarget.dataset.name; //当前点击的评论昵称
        var pid = e.currentTarget.dataset.pid; //当前点击的评论所属评论id
        var type = e.currentTarget.dataset.type; //当前回复类型
        this.setData({
            focus: true, //输入框获取焦点
            placeholder: '回复' + name + '：', //更改底部输入框占字符
            now_reply: cid, //当前点击的评论或回复评论id
            now_reply_name: name, //当前点击的评论或回复评论的用户名
            now_parent_id: pid, //当前点击的评论的id
            now_reply_type: type, //获取类型(1回复评论/2回复-回复评论)
        })
    },

    //底部输入框提交内容时触发
    confirm: function (e) {
        var _this = this;
        var regExp = /^[\u4e00-\u9fa5_a-zA-Z0-9，,.。！？、；‘’“”（）：《》【】]+$/;
        console.log(e)
        //获取输入框输入的内容
        var comment_text = this.data.inputvalue;
        var specialcode= this.data.blogger_list.specialcode
        //判断用户是否输入内容为空
        if (comment_text == '') {
            //用户评论输入内容为空时弹出
            wx.showToast({
                title: '请输入内容', //提示内容
                icon: 'none' //提示图标
            })
        } else if(comment_text==null)
        {
            //用户评论输入内容为空时弹出
            wx.showToast({
                title: '请输入内容', //提示内容
                icon: 'none' //提示图标
            })
        }else if (!regExp.test(comment_text)) {
            // 用户评论输入内容不符合正则表达式时弹出
            wx.showToast({
              title: '请输入合法内容',
              icon: 'none'
            });
          }else if(comment_text.length>100){
            wx.showToast({
              title: '输入内容过长',
              icon: 'none'
            });
          }
        else
        {
            var date = new Date(); //创建时间对象
            var year = date.getFullYear(); //获取年      
            var month = date.getMonth() + 1; //获取月      
            var day = date.getDate(); //获取日      
            var hour = date.getHours(); //获取时      
            var minute = date.getMinutes(); //获取分      
            var second = date.getSeconds(); //获取秒      
            var time = `${year}年${month}月${day}日${hour}时${minute}分${second}秒`; //当前时间

            var reply_name = this.data.now_reply_name; //回复评论用户昵称
            var parent_id = this.data.now_parent_id; //评论所属哪个评论的id

            // ↑shit code
            //对于每个评论，都有自己的id，和parentid为0，评论的回复parentid 应该为评论的id，如果一个回复的parent为0，但是type为2，那么要修改他的parentid为父评论的id
            // //对于楼中楼来说，同样要一个parentid，一个楼层内的所有楼中楼的parentid应该一样，再通过在wxml中显示回复目标评论的昵称和发布的时间来区分，这个功能是通过replyname这个值来实现的
            if(this.data.now_reply_type==0){
            parent_id=0}
            else if(this.data.now_reply_type==1){
                parent_id=this.data.now_reply//这个是回复评论的，所以他的parentid和评论一样
            }
            else if(this.data.now_reply_type==2){
                //现在是回复一个回复，他的parentid应该和它回复的对象的parentid一样，这样就能归类到同一个下面
                parent_id=this.data.now_parent_id
            
            }


            wx.request({
                url: 'https://www.scnusay.cc/team/teamdetailcomment.php',
                data: {
                    //发送type parent_id reply_name comment_text comment_time openid specialcode 7个参数
                    type: this.data.now_reply_type,
                    parent_id: parent_id,
                    reply_name: this.data.now_reply_name,
                    comment_text: comment_text,
                    comment_time: time,
                    openid: app.globalData.openid,
                    specialcode: specialcode
                    /*
                    now_reply: cid, //当前点击的评论或回复评论id
            now_reply_name: name, //当前点击的评论或回复评论的用户名
            now_parent_id: pid, //当前点击的评论或回复评论所属id
            now_reply_type: type, //获取类型(1回复评论/2回复-回复评论)
                    */
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                success(res) {
                    console.log(res.data)
                    wx.request({
                        url: 'https://www.scnusay.cc/team/getwhatisendcommentdetail.php',
                        method: 'POST',
                        data: {
                            comment_time: time,
                        },
                        //ust the utf-8 code in the header
                        header: {
                            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                        },
                        success: function (res) {
                            console.log(res.data);
                            for (var i = 0; i < res.data.length; i++) {
                                var newarray = {
                                    comment_id:res.data[i].comment_id,
                                    comment_user_avatar:res.data[i].comment_user_avatar,
                                    comment_user_name:res.data[i].comment_user_name,
                                    comment_text:res.data[i].comment_text,
                                    comment_time:res.data[i].comment_time,
                                    parent_id: res.data[i].parent_id,
                                    reply_name: res.data[i].reply_name,
                                    specialcode: res.data[i].specialcode,
                                    openid: res.data[i].openid,
                                    type: res.data[i].type,
                                }
                            //divice the data into the two parts use the res.data.type
                            if(res.data[i].type==0)
                            {
                                _this.setData({
                                comment_list: _this.data.comment_list.concat(newarray),
                                })
                            }
                            else if(res.data[i].type!=0)
                            {
                                _this.setData({
                                    comment_list2: _this.data.comment_list2.concat(newarray),
                                })
                            }
                        }
                        wx.showToast({
                            title: '发布成功',
                            icon: 'none'
                          });
                        
                    }
                    })
                    _this.setData({
                
                        //发表评论后将以下数据初始化 为下次发表评论做准备
                        inputvalue: null, //评论内容        
                        now_reply: 0, //当前点击的评论id        
                        now_reply_name: null, //当前点击的评论的用户昵称        
                        now_reply_type: 0, //评论类型        
                        now_parent_id: 0, //当前点击的评论所属哪个评论id        
                        placeholder: "写回复", //输入框占字符
                        //将加入新数据的数组渲染到页面        
                    })
                }
            })
            
            //动态渲染
           
        }
    },


    //点赞功能
    //返回commentid数据，再根据commentid能否访问/具体数字来判断点赞操作
    //点赞功能阉割

    previewImg: function (e) {
        console.log(e.currentTarget.dataset.photoindex);
        var index = e.currentTarget.dataset.photoindex;
        var imgArr = this.data.blogger_list.photos;
        wx.previewImage({
            current: imgArr[index], //当前图片地址
            urls: imgArr, //所有要预览的图片的地址集合 数组形式
            success: function (res) {},
            fail: function (res) {},
            complete: function (res) {},
        })
    }, //点击图片预览的功能





    //生命周期函数--监听页面加载
    onLoad: function (options) {
        var _this = this;
        this.setData({
            navH: app.globalData.navHeight
          });
        wx.getStorage({
            key: 'teamsendPostValue',
            success: function (res) {
                console.log(res.data)
                _this.setData({
                    blogger_list: res.data,
                    detail_specialcode : res.data.specialcode
                })
                console.log("缓存已经拿出")
                wx.request({
                    url: 'https://www.scnusay.cc/team/getcommentdetail.php',
                    method: 'POST',
                    data: {
                        specialcode: _this.data.detail_specialcode
                    },
                    //ust the utf-8 code in the header
                    header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    success: function (res) {
                        console.log(res.data);
                        for (var i = 0; i < res.data.length; i++) {
                            var newarray = {
                                comment_id:res.data[i].comment_id,
                                comment_user_avatar:res.data[i].comment_user_avatar,
                                comment_user_name:res.data[i].comment_user_name,
                                comment_text:res.data[i].comment_text,
                                comment_time:res.data[i].comment_time,
                                parent_id: res.data[i].parent_id,
                                reply_name: res.data[i].reply_name,
                                specialcode: res.data[i].specialcode,
                                openid: res.data[i].openid,
                                type: res.data[i].type,
                            }
                        //divice the data into the two parts use the res.data.type
                        if(res.data[i].type==0)
                        {
                            _this.setData({
                            comment_list: _this.data.comment_list.concat(newarray),
                            })
                        }
                        else if(res.data[i].type!=0)
                        {
                            _this.setData({
                                comment_list2: _this.data.comment_list2.concat(newarray),
                            })
                        }
                    }
                }
                })
            }
        })
       
        //将本次传过来的本地缓存的key对应的缓存清理掉，实现每次点击都是不一样的内容
        var photos = _this.data.blogger_list;
        
        // console.log(photos);
        // for (i = photos.size() - 1; i >= 0; i--) {
        //     if (photos[i] != null)
        //         break;
        //     photos.pop();
        // }
        // console.log(photos);
        // this.setData({
        //     "blogger_list.photos": photos
        // })

                //get all the comment data form the server
        console.log("get the specialcode为"+this.data.detail_specialcode);
        console.log("now begin request");

        
        wx.removeStorageSync('teamsendPostValue')
    },

})