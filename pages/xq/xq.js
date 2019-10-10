Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiang:null,
    day:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = options.date
    var city = options.city
    console.log(city)
      wx.request({
          url: 'https://www.tianqiapi.com/api/?version=v9&appid=06369426&appsecret=VVM7jMR0&city=' + city+'&date='+date,
          method: "get",
          success: (over) => {
              //   console.log(over);
            //   console.log(over.data.data)
              this.setData({
                  xiang: over.data.data

              })
                // console.log(this.data.xiang)
              for (let i = 0; i < this.data.xiang.length; i++) {
                  if (this.data.xiang[i].date==options.date){
                    //   console.log(this.data.xiang[i])
                      this.setData({
                          day: this.data.xiang[i]
                      })
                      console.log(this.data.day)
                  }
              }
          }
      })
  },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
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