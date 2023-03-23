// pages/lostthing/search.js
//搜索历史：在onload时获取本地缓存得到数组，将其打印到页面
//全局变量isHistorySubmit用来确定是否是从历史拉取的信息，如果为1则不使用addHistory方法
var app = getApp()
var isHistorySubmit = 0;
var documentType = "lostdetail";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navH: 0,
        searchHistory:[],
        submitValue:"",
        nowpoint:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {  
        //拉取本地缓存至lostdetailsearchHistory中
        var that = this;
        this.setData({
            navH: app.globalData.navHeight
          });
        wx.getStorage({
            key: documentType+"History",
            success: function(res) {
              // res.data是一个字符串数组，即["apple", "banana", "orange"]
              that.setData({
                searchHistory: res.data
              });
            }
          });
    },

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
    addHistory: function() {
        // 获取submitValue的值
        var value = this.data.submitValue;
        var searchHistory = this.data.searchHistory;
        // 将value插入到searchHistory数组的最前面
        searchHistory.unshift(value);
        // 如果searchHistory数组长度超过5，则删除最后一个元素
        if (searchHistory.length > 6) {
          searchHistory.pop();
        }
        console.log(searchHistory);
        this.setData({
            searchHistory:searchHistory
        })
        wx.setStorage({
            key: documentType+"History",
            data: searchHistory
          });
        
    },
    deletehistory:function()
    {
        wx.showModal({
          title: '删除',
          content: '确认删除历史记录',
          complete: (res) => {
            if (res.cancel) {
              
            }
        
            if (res.confirm) {
            //   make the searchHistory empty
                
                this.setData({
                    searchHistory:[]
                })
                //show success
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                    })
                //delete the storage
                wx.removeStorage({
                    key: documentType+"History",
                    success: function(res) {
                        console.log("删除成功")
                        }
                    })
            }
          }
        })
    },
    submit: function () {
        if (this.checkSubmitValue() == 1) {
            wx.showLoading({
                title: '加载中',
            })
            console.log(this.data.submitValue)
            var that = this
            wx.request({
                url: 'https://www.scnusay.cc/SecendHandDetail/SecendHandDetailPhoto/searchvalue.php',
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
                        wx.navigateTo({
                            url: '/pages/team/searchIndex',
                        })
                    }
                    //将新搜索内容加入历史
                    if (isHistorySubmit == 0)
                        that.addHistory();
                    else
                        isHistorySubmit = 0;
                    //将搜索内容存入缓存
                    wx.setStorage({
                        key: documentType+"Index",
                        data: res.data
                      });
                    //跳转至searchIndex
                    
                }
            })
        }
        
    },

    //定义点击后将信息传输至搜索内容的方法
    clickHistory:function(e){
        //将标记设为1
        isHistorySubmit = 1;
        //将点击的内容传入函数内
        var index = e.currentTarget.dataset.index
        console.log("当前点击索引"+index)

        var searchHistory = this.data.searchHistory;
        var tempValue = searchHistory[index];
        //将该索引弹出
        searchHistory.splice(index,1);
        //将该索引的内容传输至搜索框内
        this.setData({
            submitValue:tempValue,
            searchHistory:searchHistory,
            nowpoint:index
        })
        this.addHistory()
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
