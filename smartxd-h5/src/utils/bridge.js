var ua = navigator.userAgent;
// methods for public
export default {
    callhandler(name, data, callback) {
        if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            console.log('ios')
            $ZHSQApp[name](data)
        } else if (/android/i.test(ua) || /Linux/i.test(ua)) {
            console.log('android')
            $ZHSQApp[name](data)
        } else if (/MicroMessenger/i.test(ua)) {
            console.log('MicroMessenger')
        }
    }
};