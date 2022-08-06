// pages/lostthing/send.js
Page({

    data: {
        imgs: [],
        count: 3,
        array_Space: ['石牌', '大学城', '南海', '汕尾'],
        array_Tag: ['工具', '文具', '宝具', '法宝','事物','宝贝'],
        space:0,
        tag:0,
        spaceColor:"#afeeee",
        tagColor:"#afeeee",
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
    //   选择器
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