var bmap = require('../../libs/bmap-wx.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      sheng: null,
      shi:null,
      qu:null,
      obj:[],
      hour:null,
      qitian:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({
          title: '加载中',
          mask:true,
      })
    setTimeout(function(){
          wx.hideLoading()
    },3000)
        
    
    
  },
  onPullDownRefresh:function(){
      wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      let that = this
    wx.getSetting({
        complete(res){
            // let status = res.authSetting['scope.userLocation']
            // if(!status){
                wx.authorize({
                    scope: 'scope.userLocation',
                    success(){
                        wx.getLocation({
                            type:'gcj02',
                            success(res){
                                console.log(res);
                                that.GetAddress(res.latitude,res.longitude)
                                // that.GetAddress(35, 109)
                                
                                
                            }
                        })
                    }
                })
            // }

        }
    })
    
    // wx.openSetting({
    //     success(data){
    //         if (data.authSetting["scope.userLocation"]==true){
    //             wx.showToast({
    //                 title:"授权成功",
    //                 icon:"success",
    //                 duration:2000,
    //                 success(){}
    //             })
    //         }
    //     }
    // })
  },
  /**
   * 生命周期函数--监听页面显示
   */
    // funcc(event) {
    //     console.log(event.currentTarget.dataset.cp)
    //     // wx.showToast({
    //     //     title: '123',
    //     //     mask:true
    //     // })
    //     wx.navigateTo({
    //         url: '',
           
    //     })
    // },

    funa(event){
        console.log(event.currentTarget.dataset.qt)
        wx.navigateTo({
            url: '../xq/xq?date=' + event.currentTarget.dataset.qt+'&city='+this.data.qu,
        })
        // console.log(this.data.qu)
    },
  onShow: function () {
    
   
  },
  GetAddress(latitude,longitude){
      var BMap = new bmap.BMapWX({
          ak: 'PeEkp5zEMMrdm38iIIFjkBS54TrDhEL7'
      }); 
      BMap.regeocoding({
        //   data:{
              location:latitude + "," + longitude,
        //   },
          fail:(asd)=>{
              console.log(asd);
          },
          success: (res)=>{
            console.log(res);
            console.log(res.originalData.result.addressComponent.province)
              console.log(res.originalData.result.addressComponent.city)
              console.log(res.originalData.result.addressComponent.district)
              let sheng = res.originalData.result.addressComponent.province
              let shi = res.originalData.result.addressComponent.city
              let qu = res.originalData.result.addressComponent.district
              shi = shi.substring(0,shi.length-1)
              qu = qu.substring(0, qu.length - 1)
              this.setData({ 
                  sheng,
                  shi,
                  qu
                  }),
                
                

                  wx.request({
                      url: 'https://www.tianqiapi.com/api/?version=v61&appid=06369426&appsecret=VVM7jMR0&city=' + this.data.qu,
                      method: "get",
                      success:(ok)=>{
                        //   console.log(ok.data);
                          this.setData({
                              obj: ok.data
                          })
                      }
                  })
              
              wx.request({
                  url: 'https://www.tianqiapi.com/api/?version=v9&appid=06369426&appsecret=VVM7jMR0&city=' + this.data.qu,
                  method: "get",
                  success: (over) => {
                    //   console.log(over.data.data[0].hours);
                      this.setData({
                          hour: over.data.data[0].hours
                          
                      })
                    //   console.log(this.data.hour)
                  }
              })

              wx.request({
                  url: 'https://www.tianqiapi.com/api/?version=v9&appid=06369426&appsecret=VVM7jMR0&city=' + this.data.qu,
                  method: "get",
                  success: (over) => {
                    //   console.log(over);
                      console.log(over.data.data)
                      this.setData({
                          qitian: over.data.data

                      })
                    //   console.log(this.data.qitian.data)
                  }
              })

          }
      }); 
    //   wx.request({
    //       url: 'http://api.map.baidu.com/geocoder/v2/?ak=aE5jQtqGrW9AvZg9h6FRXFP5XPoPscNt' + latitude + ',' + longitude + '&output=json',
    //       data: {},
    //       header: { 'Content-Type': 'application/json' },
    //       success: function (ops) {
    //           console.log(ops)
    //         //   wx.setStorageSync('province', ops.data.result.addressComponent.province)//把位置信息存起来
    //         //   wx.setStorageSync('city', ops.data.result.addressComponent.city)// 把位置信息存起来
    //       },
    //       fail: function (resq) {
    //           wx.showModal({
    //               title: '信息提示',
    //               content: '请求失败',
    //               showCancel: false,
    //               confirmColor: '#f37938'
    //           });
    //       },
    //       complete: function () { }
    //   })



  }
})