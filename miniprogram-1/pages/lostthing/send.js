// pages/lostthing/send.js
Page({

    data: {
        imglist: [],
        count: 3,
        countNow: 0, //当前储存图片数量
        array_Space: ['石牌', '大学城', '南海', '汕尾'],
        array_Tag: ['其他', '图书文具', '生活用品', '电子产品', '化妆用品', '服装鞋包'],
        space: 0,
        tag: 0,
        spaceColor: "#afeeee",
        tagColor: "#afeeee",

        postValue: { //打包发送的post数组
            blogger_id: 1, //文章所属id
            blogger_avatar: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
            blogger_name: "xhiming", //博主昵称
            blogger_time: "1661857644662", //发布时间的时间戳、这里需要修改
            lostthing_topic: "700出帅哥一只", //标题
            lostthing_time: "1661857644662", //丢失时间的时间戳、这里需要修改
            lostthing_class: "失物求寻", //发布类别（不需要可以不填充
            lostthing_detail: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
            lostthing_space: "南海校区", //
            lostthing_space_detail: "",
            lostthing_contact: "12312311231",
            photos: [], //放置于主要内容下方的图片
            tags: ["图书文具", "生活用品", "夹心糖"], //标签
            readingtimes: 49, //阅读次数
            comments: 5, //评论数量
            favour: 20, //点赞数量
            had_favour: 0, //点赞判断
            favour_src: "/assets/images/icon/unfavour.png", //点赞图标
        }

    },
    //添加照片功能
    img_w_show() {
        var _this = this;
        if (_this.data.countNow == 3) {
            wx.showToast({
                title: '最多上传三张图片',
                icon: 'error',
                duration: 500//持续的时间
              })
        } else {
            wx.chooseImage({
                // count: 3, // 默认3
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePaths = res.tempFilePaths
                    _this.setData({
                        countNow: _this.data.countNow + 1,
                        imglist: _this.data.imglist.concat(tempFilePaths)
                    })
                    console.log(_this.data.countNow)
                }
            })
        }
    },

    // 预览图片
    previewImg: function (e) {

    },
    // 点击删除
    deleteImg(e) {
        var _this = this;
        var imgList = _this.data.imglist
        let index = e.target.dataset.index//当前点击元素索引
        imgList = []
        console.log(index)
        wx.showModal({
            title: '删除确认',
            content: '是否删除该图片',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                if(imgList.length>1){//执行删除操作，规避splice函数的特性
                    imgList.splice(index,1);
                    console.log(imgList)
                    _this.setData({
                        imglist: imgList
                    })
                }
               else{
                _this.setData({
                    imglist:[]
                })
               }
              } else {//这里是点击了取消以后
                console.log('用户点击取消')
              }
            }
          })
    },
    //绑定“way”值为“寻找失主”
    bindPickerChange_Way: function (e) {
        console.log('way发送选择改变，携带值为', e.detail.value)
        if (e.detail.value) {
            this.setData({
                ['postValue.way']: "寻找失主",
            })
        } else {
            this.setData({
                ['postValue.way']: "失物求寻",
            })
        }
    },
    //选择器，实现修改“地点、分类”后变换颜色为黑色
    bindPickerChange_Space: function (e) {
        console.log('space发送选择改变，携带值为', e.detail.value)
        this.setData({
            space: e.detail.value,
            spaceColor: '#000',
        })
    },
    bindPickerChange_Tag: function (e) {
        console.log('Tag发送选择改变，携带值为', e.detail.value)
        this.setData({
            tag: e.detail.value,
            tagColor: '#000',
        })
    },
})