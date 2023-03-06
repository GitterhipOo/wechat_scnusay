// pages/ShareCar/index.js
Page({

    
    /**
     * 页面的初始数据
     */
    data: {
            like: [],
            likeList: [],
            id: '',//数据的id
            isClick: false,
            likeStorage: [],//缓存
            likeId: '',//缓存ID
            data_index:[
                {
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',
                    blogger_name: '黄志敏黄志敏黄志敏',
                    blogger_time: '11小时前发布',
                    ShareCar_title: '小塘医院做核酸',
                    ShareCar_time: '2022年9月1日',
                    ShareCar_space: '南海校区',
                    ShareCar_spot: '北门门口',
                    ShareCar_contact: '18823828238',
                    ShareCar_class: 'AA制',
                    ShareCar_people: '4人'
                },{
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',
                    blogger_name: '1447523',
                    blogger_time: '1小时前发布',
                    ShareCar_title: '零度网吧5黑CF',
                    ShareCar_time: '2022年9月32日',
                    ShareCar_space: '南海校区',
                    ShareCar_spot: 'A栋201',
                    ShareCar_contact: '13423212311',
                    ShareCar_class: '面基协商',
                    ShareCar_people: '3人'
                },{
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',
                    blogger_name: '黄志敏qwee',
                    blogger_time: '11小时前发布',
                    ShareCar_title: '小塘医院看病',
                    ShareCar_time: '2022年9月1日',
                    ShareCar_space: '南海校区',
                    ShareCar_spot: '北门门口',
                    ShareCar_contact: '18823828238',
                    ShareCar_class: '包车请客',
                    ShareCar_people: '2人'
                },{
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',
                    blogger_name: '黄志敏与uZI',
                    blogger_time: '3小时前发布',
                    ShareCar_title: '去佛山西站',
                    ShareCar_time: '2022年9月5日',
                    ShareCar_space: '南海校区',
                    ShareCar_spot: '南门门口',
                    ShareCar_contact: '18823828238',
                    ShareCar_class: '自驾顺风车',
                    ShareCar_people: '1人'
                },{
                    blogger_avatar: 'https://s1.328888.xyz/2022/08/02/OF8Ay.jpg',
                    blogger_name: '黄敏黄敏黄敏',
                    blogger_time: '11小时前发布',
                    ShareCar_title: '青年旅馆睡觉',
                    ShareCar_time: '2022年9月1日',
                    ShareCar_space: '南海校区',
                    ShareCar_spot: '北门门口',
                    ShareCar_contact: '18823828238',
                    ShareCar_class: 'AA制',
                    ShareCar_people: '4人'
                }
            ]

            
    },
    calling: function () {
        // var pnumber = this.data.data_index.ShareCar_contact;
        wx.makePhoneCall({
        phoneNumber: '18823828238',
        success: function () {
        console.log("拨打电话成功！")
        },
        fail: function () {
        console.log("拨打电话失败！")
        }
        })
        },
    GOTO:function(){
        wx.navigateTo({
          url: '/pages/ShareCar/details/details',
        })
    },
    like:function(){
        if(!this.data.isClick == true){
            // let likeData = this.data.likeStorage;
            // likeData.push({
            //   likeid:likeData.length,
            //   id:this.data.like.id
            // })
            // wx.setStorageSync('likeData', likeData);
            // wx.setStorageSync('id', this.data.like.id);
            wx.showToast({
              title: '已收藏',
            });
          }else{
            wx.showToast({
              title: '已取消收藏',
            })
          }
          this.setData({
            isClick:!this.data.isClick
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})