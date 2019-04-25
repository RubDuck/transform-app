import md5 from './md5.main.js'
const appid = '20190424000291182'
const key = 'SaV0G2qPPlZex9YfokHM'

function transform(q,{from="auto",to="auto"}){
  return new Promise((resolve,reject)=>{
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)

    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        if (res.data && res.data.trans_result) {
          resolve(res.data)
        } else {
          reject({ status: 'error', msg: '翻译失败' })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail() {
        reject({ status: 'error', msg: '翻译失败' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })

  
}
module.exports.transform = transform