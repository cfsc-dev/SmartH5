import wx from 'weixin-js-sdk'
import axios from '@/utils/fetch'
export default{
    wxConfig (jsApiList){
        let url = encodeURI(window.location.href.split('#')[0])
        console.log("url",url)
        let params = {
            url: url
        }
        //服务请求
        axios.get('WeChatToken/getJsapiTicket.action',params).then(
            res => {
                console.log('wxConfig', res)
                if(res.resultCode==='0'){
                    wx.config({
                        debug: true,
                        appId: res.data.appid, // 必填，公众号的唯一标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                        signature: res.data.signature, // 必填，签名，见附录1
                        jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                }else{
                    this.$toast(res.msg)
                }
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    },
    share(data){
        wx.ready(()=>{
            wx.hideAllNonBaseMenuItem()
            wx.showMenuItems({
                menuList: ['menuItem:share:appMessage','menuItem:share:timeline','menuItem:share:qq'] // 要显示的菜单项，所有menu项见附录3
            })
            wx.updateAppMessageShareData({
                title: data.title, // 分享标题
                desc: data.desc, // 分享描述
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.imgUrl, // 分享图标
                success: ()=> {
                    console.log('分享设置成功')
                }
            })
        });

    },
    //分享到微信好友
    shareToWeixin(data){
        wx.onMenuShareAppMessage({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户点击了分享后执行的回调函数
                console.log('123')
            }
        });
    }
}
