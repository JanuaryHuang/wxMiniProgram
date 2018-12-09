// pages/welcomePage/welcomePage.js
import WeCropper from '../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync() // get device info
const width = device.windowWidth
const height = width

Page({

  /**
  * Initial data
  */
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 200) /2,   // Starting point of the cutting box
        y: (width - 200) / 2,
        width: 200,            // Size of the cutting box
        height: 200
      }
    }
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    this.wecropper.getCropperImage((src) => {
      if (src) {
        console.log(src)
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [src] // 需要预览的图片http链接列表
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   * Life Circle - audit page on load
   */
  onLoad: function (options) {
    const { cropperOpt } = this.data
    
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log('wecropper is ready!')
      })
      .on('beforeImageLoad', (ctx) => {
        console.log('before picture loaded')
        console.log('current canvas context: ${ctx}')
        wx.showToast({
          title: 'Uploading',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log('picture loaded')
        console.log('current canvas context: ${ctx}')
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas()
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

  },


  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },

  nextPage(){
    wx.navigateTo({
      url: '../initialPage/initialPage',
    })
  }
})