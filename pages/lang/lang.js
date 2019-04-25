const app = getApp()
Page({
  data: { 
    currentlang:{},
    langList: app.globalData.langList
  },
  Onclick(e){
    let message=e.currentTarget.dataset
    console.log(message)
    this.setData({currentlang: message })
    wx.setStorageSync("lang", message)
    
    app.globalData.curLang = message
    wx.switchTab({ url: '/pages/index/index' })
  },
  onShow: function () {
    this.setData({ currentlang: app.globalData.curLang})
  }
})