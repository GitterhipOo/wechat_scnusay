// pages/lostthing/send.js
Page({

    data: {
        imgs: [],
        count: 3,
        array_Space: ['石牌', '大学城', '南海', '汕尾'],
        array_Tag: ['其他','图书文具', '生活用品', '电子产品', '化妆用品','服装鞋包'],
        space:0,
        tag:0,
        spaceColor:"#afeeee",
        tagColor:"#afeeee",
        postValue:{//打包发送的post数组
            profile: "https://s1.328888.xyz/2022/08/02/OF8Ay.jpg", //头像
            desc: "", //标题
            time: "1661857644662", //时间戳、这里需要
            way: "失物求寻", //发布类别（不需要可以不填充
            more_Infor: "我在南海这里丢失了一块抹茶拿铁，你们可以帮我寻找一下遗失的红色精灵吗", //主要内容
            photos: ["https://s1.328888.xyz/2022/08/29/CzMYU.png", "https://s1.328888.xyz/2022/08/29/CzgoR.png", "https://s1.328888.xyz/2022/08/29/Czf0B.png"], //放置于主要内容下方的图片
            tags: ["图书文具", "生活用品", "夹心糖"], //标签
            readingtimes: 49, //阅读次数
            favour: 20, //点赞数量
            had_favour: 0,
            favour_src: "/assets/images/icon/unfavour.png",
            comments: 5, //评论数量
            postid: 1, //文章在数据库中存储的位置
        }
        
      },
      bindUpload: function (e) {
        switch (this.data.imgs.length) {
          case 0:
            this.data.count = 3
            break
          case 1:
            this.data.count = 2
            break
          case 2:
            this.data.count = 1
            break
        }
        var that = this
        wx.chooseMedia({
          count: that.data.count, // 默认3
          mediaType:["mix"],
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            for (var i = 0; i < tempFilePaths.length; i++) {
              wx.uploadFile({
                // url: 'https://graph.baidu.com/upload',
                filePath: tempFilePaths[i],
                name: "file",
                header: {
                  "content-type": "multipart/form-data"
                },
                success: function (res) {
                  if (res.statusCode == 200) {
                    wx.showToast({
                      title: "上传成功",
                      icon: "none",
                      duration: 1500
                    })
      
                    that.data.imgs.push(JSON.parse(res.data).data)
      
                    that.setData({
                      imgs: that.data.imgs
                    })
                  }
                },
                fail: function (err) {
                  wx.showToast({
                    title: "上传失败",
                    icon: "none",
                    duration: 2000
                  })
                },
                complete: function (result) {
                  console.log(result.errMsg)
                }
              })
            }
          }
        })
      },
      // 删除图片
      deleteImg: function (e) {
        var that = this
        wx.showModal({
          title: "提示",
          content: "是否删除",
          success: function (res) {
            if (res.confirm) {
              for (var i = 0; i < that.data.imgs.length; i++) {
                if (i == e.currentTarget.dataset.space) that.data.imgs.splice(i, 1)
              }
              that.setData({
                imgs: that.data.imgs
              })
            } else if (res.cancel) {
              console.log("用户点击取消")
            }
          }
        })
      },
      //绑定“way”值为“寻找失主”
      bindPickerChange_Way: function(e) {
        console.log('way发送选择改变，携带值为', e.detail.value)
        if(e.detail.value){
            this.setData({
                ['postValue.way']:"寻找失主",
            })
        }
        else{
            this.setData({
                ['postValue.way']:"失物求寻",
            })
        }
      },
      //选择器，实现修改“地点、分类”后变换颜色为黑色
      bindPickerChange_Space: function(e) {
        console.log('space发送选择改变，携带值为', e.detail.value)
        this.setData({
          space: e.detail.value,
          spaceColor:'#000',
        })
      },
      bindPickerChange_Tag: function(e) {
        console.log('Tag发送选择改变，携带值为', e.detail.value)
        this.setData({
          tag: e.detail.value,
          tagColor:'#000',
        })
      },
})