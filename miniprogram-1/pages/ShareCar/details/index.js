Page({
    data: {
    
      //评论数据
      comment_list: [
        {
          comment_id: 1, //评论id
          comment_pr_id: 1, //评论文章所属id
          comment_user_avatar: 'https://s1.328888.xyz/2022/07/23/mH9Op.th.jpg', //评论用户头像(路径替换为你的图片路径)
          comment_user_name: '高飞', //评论人昵称
          comment_text: '去办理优待证是挺难的，但是办理了优待证之后福利特别好', //评论内容
          comment_time: '2020年8月18日', //评论时间
          reply_id: 0, //回复谁的评论，默认为0
          parent_id: 0, //评论所属评论id，默认为0
          reply_name: '' //回复评论用户的昵称 默认为''
        },
        {
          comment_id: 2,
          comment_pr_id: 1,
          comment_user_avatar: '/assets/images/sharecars/jpg4.jpg',
          comment_user_name: '张维默',
          comment_text: '去办理优待证是挺难的，但是办理了优待证之后福利特别好',
          comment_time: '2020年8月18日',
          reply_id: 0,
          parent_id: 0,
          reply_name: ''
        },
        {
          comment_id: 3,
          comment_pr_id: 1,
          comment_user_avatar: '/assets/images/sharecars/jpg6.jpg',
          comment_user_name: '张剑锋',
          comment_text: '去办理优待证是挺难的，但是办理了优待证之后福利特别好',
          comment_time: '2020年8月18日',
          reply_id: 0,
          parent_id: 0,
          reply_name: ''
        }
      ],
      
      //回复数据
      comment_list2: [
        {
          comment_id: 4,
          comment_pr_id: 1,
          comment_user_name: '张剑锋',
          comment_user_avatar: '/assets/images/sharecars/jpg6.jpg',
          comment_text: "大家快去办理吧!!!",
          comment_time: '2020年8月18日',
          reply_id: 3,
          parent_id: 3,
          reply_name: ''
        },
        {
          comment_id: 5,
          comment_pr_id: 1,
          comment_user_name: '沈非隆',
          comment_user_avatar: '/assets/images/sharecars/jpg3.jpg',
          comment_text: "办理优待证大概需要多长时间呢会不会需要特别长时间",
          comment_time: '2020年8月18日',
          reply_id: 3,
          parent_id: 3,
          reply_name: '张剑锋'
        }
      ],
  
      /*定义一些数据*/
      focus: false, //输入框是否聚焦
      placeholder: '写回复', //底部输入框占字符
      placeholder2: '说点什么，向拼主表达你的想法吧！', //顶部输入框占字符
      value: null, //顶部输入框内容
      comment_text: null, //底部评论框内容
  
      /*
       *以下初始化数据是用户点击任意一条评论或回复时需要设置的数据
       *然后将设置好的数据传递给评论时新创建的评论数据对象
      */
      now_reply_name: null, //当前点击的评论或回复评论的用户昵称
      now_reply_type: 0, //当前回复类型 默认为0 1为回复评论 2为回复回复
      now_parent_id: 0, //当前点击的评论或回复评论的所属评论id
      now_reply: 0, //当前点击的评论或回复评论的id
  
      //模拟用户信息
      userinfo: {
        nickName: '马飞', //用户昵称
        avatarUrl: '/images/assemblyNumber/discoveryDetails/per5.png' //用户头像
      }
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
          now_parent_id: pid, //当前点击的评论或回复评论所属id
          now_reply_type: type, //获取类型(1回复评论/2回复-回复评论)
      })
    },
    //获取输入框内容
    getCommentText(e) {
    var val = e.detail.value;
    this.setData({
      comment_text: val
    })
    },
    //底部输入框提交内容时触发
    confirm(e){
      //获取输入框输入的内容
      var comment_text = e.detail.value;
      //判断用户是否输入内容为空
      if (comment_text == '') {
        //用户评论输入内容为空时弹出
        wx.showToast({
         title: '请输入内容', //提示内容
         icon: 'none' //提示图标
       })
      } else {
          var date = new Date(); //创建时间对象
          var year = date.getFullYear(); //获取年      
          var month = date.getMonth() + 1; //获取月      
          var day = date.getDate(); //获取日      
          var hour = date.getHours(); //获取时      
          var minute = date.getMinutes(); //获取分      
          var second = date.getSeconds(); //获取秒      
          var time = `${year}年${month}月${day}日${hour}时${minute}分${second}秒`; //当前时间
          var comment_list = this.data.comment_list; //获评论数据
          var comment_list2 = this.data.comment_list2; //获取回复数据
          var comment_list_length = comment_list.length; //获取当前评论数组的长度
          var last_id = comment_list[comment_list_length - 1].comment_id; //获取最后一个评论的id
          var comment_list2_length = comment_list2.length; //获取回复数组的长度
          var last_id2 = comment_list2[comment_list2_length - 1].comment_id; //获取最后回复的id
          var new_id = last_id > last_id2 ? last_id + 1 : last_id2 + 1; //当前将要发表的评论的id
          var userinfo = this.data.userinfo; //获取当前的用户信息      
          var comment_user_name = userinfo.nickName //用户昵称      
          var comment_user_avatar = userinfo.avatarUrl //用户头像
          var reply_name = null; //回复评论用户的昵称
          var parent_id = 0; //评论所属哪个评论的id
          var reply_id = this.data.now_reply; //回复谁的评论id
          //通过回复谁的评论id判断现在是评论还是回复
          if(reply_id != 0) {
        //现在是回复
        var reply_type = this.data.now_reply_type; //回复类型
        //通过回复类型判断是回复评论还是回复回复
        if (reply_type == 1) {
          //回复评论
          parent_id = this.data.now_reply; //回复评论所属评论id
          reply_name = this.data.now_reply_name; //回复评论用户昵称
        } else {
          //回复回复
          parent_id = this.data.now_parent_id; //回复评论所属评论id
          reply_name = this.data.now_reply_name; //回复评论用户昵称
        }
          } else {
        //现在是评论
      }
      var comment_detail = {} //评论/回复对象
      comment_detail.comment_id = new_id; //评论Id      
      comment_detail.comment_user_name = comment_user_name; //用户昵称      
      comment_detail.comment_user_avatar = comment_user_avatar; //用户头像      
      comment_detail.comment_text = comment_text; //评论内容      
      comment_detail.comment_time = time; //评论时间      
      comment_detail.reply_id = reply_id; //回复谁的评论的id      
      comment_detail.parent_id = parent_id; //评论所属哪个评论id      
      comment_detail.reply_name = reply_name; //回复评论人的昵称
      //判断parent_id是否为0 为0就是评论 不为0就是回复
      if(comment_detail.parent_id > 0) {
        //回复
        comment_list2.unshift(comment_detail);
      } else {
        //评论
        comment_list.unshift(comment_detail);
      }
      //动态渲染
      ths.setData({
        //发表评论后将以下数据初始化 为下次发表评论做准备
        comment_text: null, //评论内容        
        now_reply: 0, //当前点击的评论id        
        now_reply_name: null, //当前点击的评论的用户昵称        
        now_reply_type: 0, //评论类型        
        now_parent_id: 0, //当前点击的评论所属哪个评论id        
        placeholder: "写回复", //输入框占字符
        //将加入新数据的数组渲染到页面        
        comment_list, //评论列表        
        comment_list2 //回复列表
      })
    }
    }
})