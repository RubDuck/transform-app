//index.js
//获取应用实例
import { transform } from '../../utils/api.js'
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    query:'',
    hideClearIcon: true,
    hasUserInfo: false,
    curLang: app.globalData.curLang,
    result:[]
  },
  clear(e){
    this.setData({ 'query': e.detail.value })
    if(e.detail.cursor==''){
      this.setData({ hideClearIcon: true  })
      this.setData({result:[]})
    }
 else{
      let time=true
      this.setData({ hideClearIcon: false })
      if (time) {
        clearTimeout(timeID)
      }
      let timeID = setTimeout(() => {
        console.log(2)
        this.onConfirm()
        time=false
      }, 1500)
    

   
 }
  },
  onTapClose(){
    this.setData({ 'query': '', hideClearIcon:true})
    this.setData({ result: [] })
  },
  onShow: function () {
    if (this.data.curLang.lang !== app.globalData.curLang.lang) {
      this.setData({ curLang: app.globalData.curLang })
      this.onConfirm()
    }
  },
  Set:function(arr){
    let hash = {}
    let b = []
    for (let i = 0; i < arr.length; i++) {
      if (!hash[JSON.stringify(arr[i])]) {
        hash[JSON.stringify(arr[i])] = true
        b.push(arr[i])
      }
    }
    return b
  },
  
  onConfirm: function () {
    if (!this.data.query) return
   transform(this.data.query, { from: 'auto', to: this.data.curLang.lang }).then(res => {
      this.setData({ 'result': res.trans_result })
      let history = wx.getStorageSync('history') || []
     history.unshift({ query: this.data.query, result: res.trans_result[0].dst, lang: this.data.curLang.chs})
        history.length = history.length > 10 ? 10 : history.length
        let b=this.Set(history)
        wx.setStorageSync('history', b)
        console.log(b)
    })


  }


  


 
})
