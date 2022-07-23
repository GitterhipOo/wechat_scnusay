// pages/ShareCar/ReleaseInformation/index.js
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
    sex: [{ id: "0", name: "男", checked:"true" }, { id: "1", name: "女" }],
    name:'',
    sexId:"0",   // 默认是0 => 男
    sex1:'',
    phonenumber:'',
    school:'',
    beginsite:'',
    ensite:'',
    time:'',
    inputText: '',
    inputTextLen: 0,
    index:0,
    identity:["请选择","教师","学生","其他"],
    occupation:''
    },
    getInputText: function (e) {
        // console.log(e.detail.value);
        // if (e.detail.value !== this.inputText) {
        //   this.inputText = e.detail.value;
    
        // }
        let inputText = e.detail.value;
        if (e.detail.value.length > 100) {
          inputText = inputText.substring(0, 100);
        }
        this.setData({
          inputText: inputText,
          inputTextLen: 0 || inputText.length
        })
      },
    getForm:function(e){
        var formdata = e.detail.value
        this.setData({
        name:formdata.name,
        sex1:this.data.sex[this.data.sexId].name,
        phonenumber:formdata.Email,
        school:formdata.school,
        beginsite:formate.beginsite,
        ensite:formate.endsite,
        time:formate.time,
        occupation:this.data.identity[this.data.index],
       })
      },
      radioChange:function(e){
          this.setData({
              sexId:e.detail.value
          })
      },
      bindPickerChange:function(e){
          this.setData({
              index: e.detail.value
          })
      },
      saveData:function(e){
          //提交后的操作，例如将信息写入数据库等
      },
      checkboxChange:function(e){
        var that = this;
        console.log(e);
        // 根据自己要实现的操作进行编写
        that.setData({
          checkValue:e.detail.value
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