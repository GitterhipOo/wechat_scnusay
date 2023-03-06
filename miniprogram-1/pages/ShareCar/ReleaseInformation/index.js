// pages/ShareCar/ReleaseInformation/index.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: { 
    sex: [{ id: "1", value: "男" }, { id: "2", value: "女" }],
    name:'',
    // sexId:"0",   // 默认是0 => 男
    sex1:'',
    phonenumber:'',
    school:'',
    beginsite:'',
    endsite:'',
    time:'',
    inputText: '',
    inputTextLen: 0,
    index:0,
    // identity:["请选择","教师","学生","其他"],
    occupation:'',
    people:[{id:"3",value:"二人"},{id:"4",value:"三人"},{id:"5",value:"四人"}],
    money:[{id:"1",value:"支付宝"},{id:"2",value:"微信"
}]
    },
    //输入自动计算字体长度
    getInputText: function (e) {//length疯狂报错（抄来的代码）
         console.log(e.detail.value.inputText);
        if (e.detail.value.inputText !== this.inputText) {
        this.inputText = e.detail.value.inputText;
    
        }
        let inputText = e.detail.value.inputText;
        if (e.detail.value.length > 100) {
        inputText = inputText.substring(0, 100);
        }
        this.setData({
          inputText: inputText,
          inputTextLen: 0 || inputText.length
        })

      },

    getForm:function(e){
            var that = this;
   
      },

      radioChange:function(e){//确认“性别”一栏中选中的是哪个选项
              const sex = this.data.sex
              for(let i = 0, len = sex.length; i < len; ++i)
              {
                sex[i].checked = sex[i].id == e.detail.value;

              }
              this.setData({
                sex
              })
              console.log(this.data.sex);
      },

      radioChange_people:function(e){//确认“性别”一栏中选中的是哪个选项
                const people = this.data.people
                for(let i = 0, len = people.length; i < len; ++i)
                {
                    people[i].checked = people[i].id == e.detail.value;

                }
                this.setData({
                    people
                })
                console.log(this.data.people);
        },
        radioChange_money:function(e){//确认“性别”一栏中选中的是哪个选项
            const money = this.data.money
            for(let i = 0, len = money.length; i < len; ++i)
            {
                money[i].checked = money[i].id == e.detail.value;

            }
            this.setData({
                money
            })
            console.log(this.data.money);
        },
      postaddManage: function () {
            let sex = '';
            this.data.sex.map((item, index) => {//遍历数组
              if (item.checked) {//找到被选定的值
                sex = item.id;
              }
            })
            let params = {//提取的是sex中的ID
                sex: sex,
            }
            addManage(params).then(res => {
                console.log(res);
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