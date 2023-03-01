// pages/lostthing/search.js

var documentType = "lostdetail";
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
Component({
    data: {
        submitValue: ""
    },
    methods: {
        // 定义一个回调函数
        callback: function (wrongType) {
            // 在这里写你想要做的事情
            var wrong = wrongType
            if (wrong == "empty")
                wrong = "搜索内容为空"
            else if (wrong == "illegalChars")
                wrong = "搜索内容有非法字符"
            else if (wrong == "emoji")
                wrong = "搜索内容中有emoji"
            wx.showModal({
                title: wrong,
                // content: '这是一个模态弹窗',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
        // 定义一个检查函数,返回1则代表没问题，0则停止函数
        checkSubmitValue: function () {
            var submitValue = this.data.submitValue;
            // 检查submitValue是否为空
            if (submitValue === "") {
                // 触发回调函数
                this.callback("empty");
                return 0;
            }

            // 定义非法字符的正则表达式
            var illegalChars = /[^a-zA-Z0-9\s\u4e00-\u9fa5]/;

            // 检查submitValue是否有非法字符
            if (illegalChars.test(submitValue)) {
                // 触发回调函数
                this.callback("illegalChars");
                return 0;
            }

            // 定义emoji的正则表达式
            var emoji = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

            // 检查submitValue是否有emoji
            if (emoji.test(submitValue)) {
                // 触发回调函数
                this.callback("emoji");
                return 0;
            }

            // 如果都没有问题，就提交到服务器
            return 1;
        },
        submit: function () {
            if (this.checkSubmitValue() == 1) {
                wx.showLoading({
                    title: '加载中',
                })
                console.log(this.data.submitValue)
                wx.request({
                    url: 'https://www.scnusay.cc/lostdetail/lostdetailphoto/searchvalue.php',
                    method: "POST",
                    data: {
                        type: documentType,
                        searchvalue: this.data.submitValue
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    success(res) {
                        wx.hideLoading({
                            success: (res) => {},
                        })
                        if ("no result" == res.data) {
                            wx.showModal({
                                title: '搜索失败',
                                content: '无搜索内容',
                            })
                        } else {
                            console.log(res.data);
                        }


                    }
                })
            }
        }
    },
})