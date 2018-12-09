// pages/initialPage/initialPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPic: null,
    picChoosed: false
  },

  /**
   * Function for whether the picture is choosed
   */
  picChoosedDetermination() {
    if (this.data.bgPic) {
      this.setData({
        picChoosed: true
      })
      // this.picChoosed = true
    }
    else {
      this.setData({
        picChoosed : false
      })
    }
  },

  /**
   * Function for getting the avatar
   */
  getAvatar() {
    // isAuthorized
    if(app.globalData.userInfo) {
      this.setData({
          bgPic: app.globalData.userInfo.avatarUrl,
        });
      // assign picChoosed to true
      this.picChoosedDetermination();
    }
    // else {
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfor;
    //       this.setData({
    //         userInfor: res.userInfo,
    //         bgPic: res.userInfo.avatarUrl
    //       });
    //       this.picChoosedDetermination();
    //     }
    //   })
  },
  chooseImage(from) {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [from.target.dataset.way],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          bgPic:res.tempFilePaths[0]
        });
        this.picChoosedDetermination();
      },
      fail: (res) =>{
        this.picChoosedDetermination();
      },
      complete: (res)=>{
        this.picChoosedDetermination();
      },
    })
  },

  // onShareAppMessage: function () {
  // },
  
  nextPage() {
    app.globalData.bgPic = this.data.bgPic;
    wx.navigateTo({
      url: '../wearHatPage/wearHatPage',
    })
  }
})