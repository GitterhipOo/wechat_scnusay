Page({
    data: {
        //主人公数据
        blogger_list: [{

            pr_id: 1, //文章所属id
            blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg', //博主头像(路径替换为你的图片路径)
            blogger_name: '黄志敏黄志敏', //博主昵称
            bloger_time: '11小时前', //发布时间
            lostthing_topic: '耳机一副', //标题
            lostthing_time: '2022年9月1日',
            lostthing_space: '南海校区', //大致地址
            lostthing_space_detail: 'G252林杨超床下桌子', //详细地址
            lostthing_contact: '18823828238',
            lostthing_class: '文具', //分类
            lostthing_detail: '我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗' //详情内容
        }],
        //评论数据
        comment_list: [{
                comment_id: 1, //评论id
                comment_pr_id: 1, //评论文章所属id
                comment_user_avatar: 'https://s1.328888.xyz/2022/07/23/mH9Op.th.jpg', //评论用户头像(路径替换为你的图片路径)
                comment_user_name: '高飞', //评论人昵称
                comment_text: '去办理优待证是挺难的，但是办理了优待证之后福利特别好', //评论内容
                comment_time: '2020年8月18日', //评论时间
                reply_id: 0, //回复谁的评论，默认为0
                parent_id: 0, //评论所属评论id，默认为0
                reply_name: '', //回复评论用户的昵称 默认为''
                favour: 20,
                had_favour: 0,
                favour_src: "/assets/images/icon/unfavour.png"
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
                reply_name: '',
                favour: 20,
                had_favour: 0,
                favour_src: "/assets/images/icon/unfavour.png"
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
                reply_name: '',
                favour: 20,
                had_favour: 0,
                favour_src: "/assets/images/icon/unfavour.png"
            }
        ],

        //回复数据
        comment_list2: [{
                comment_id: 4,
                comment_pr_id: 1,
                comment_user_name: '张剑锋',
                comment_user_avatar: '/assets/images/sharecars/jpg6.jpg',
                comment_text: "大家快去办理吧!!!",
                comment_time: '2020年8月18日',
                reply_id: 3,
                parent_id: 3,
                reply_name: '',
                favour: 20,
                had_favour: 0,
                favour_src: "/assets/images/icon/unfavour.png"
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
                reply_name: '张剑锋',
                favour: 20,
                had_favour: 0,
                favour_src: "/assets/images/icon/unfavour.png"
            }
        ],

        /*定义一些数据*/
        focus: false, //输入框是否聚焦
        placeholder: '写回复', //底部输入框占字符
        // placeholder2: '说点什么，向拼主表达你的想法吧！', //顶部输入框占字符
        value: null, //顶部输入框内容
        comment_text: null, //底部评论框内容
        favour: 20, //点赞数
        had_favour: 0, //用户是否点赞判断
        favour_src: "/assets/images/icon/unfavour.png", //地址
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
    confirm(e) {
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
            if (reply_id != 0) {
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
            if (comment_detail.parent_id > 0) {
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
    },
    //点赞功能
    //返回commentid数据，再根据commentid能否访问/具体数字来判断点赞操作
    favourMe: function (e) {
        var that = this
        let commentid = e.currentTarget.dataset.id
        let reply = e.currentTarget.dataset.reply
        if (commentid == null) { //如果不是评论区
            if (that.data.had_favour == 0) {
                this.setData({
                    favour: that.data.favour + 1,
                    favour_src: "/assets/images/icon/favour.png",
                    had_favour: 1
                })
            } else {
                this.setData({
                    favour: that.data.favour - 1,
                    favour_src: "/assets/images/icon/unfavour.png",
                    had_favour: 0
                })
            }
        } else {
            commentid=parseInt(commentid)-1
            if (reply == 0) { //评论区
                if (that.data.comment_list[commentid].had_favour == 0) {
                    this.setData({
                        // 这里需要把点赞的数据上传给服务器
                        ['comment_list[' + commentid + '].favour_src']: "/assets/images/icon/favour.png",
                        ['comment_list[' + commentid + '].favour']: that.data.comment_list[commentid].favour + 1,
                        ['comment_list[' + commentid + '].had_favour']: 1
                    })
                } else {
                    this.setData({
                        ['comment_list[' + commentid + '].favour_src']: "/assets/images/icon/unfavour.png",
                        ['comment_list[' + commentid + '].favour']: that.data.comment_list[commentid].favour - 1,
                        ['comment_list[' + commentid + '].had_favour']: 0
                    })
                }
            } else { //回复区
                commentid=commentid-that.data.comment_list.length
                if (this.data.comment_list2[commentid].had_favour == 0) {
                    this.setData({
                        // 这里需要把点赞的数据上传给服务器
                        ['comment_list2[' + commentid + '].favour_src']: "/assets/images/icon/favour.png",
                        ['comment_list2[' + commentid + '].favour']: this.data.comment_list2[commentid].favour + 1,
                        ['comment_list2[' + commentid + '].had_favour']: 1
                    })
                } else {
                    this.setData({
                        ['comment_list2[' + commentid + '].favour_src']: "/assets/images/icon/unfavour.png",
                        ['comment_list2[' + commentid + '].favour']: this.data.comment_list2[commentid].favour - 1,
                        ['comment_list2[' + commentid + '].had_favour']: 0
                    })
                }
            }
        }
    }
})