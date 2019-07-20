/**
 * 日期时间格式化
 * @param date
 * @param fmt
 * @returns {void | string}
 * For Example:  formatDate(new Date(),'yyyy-MM-dd HH:mm:ss')====>2019-07-20 14:53:46
 */
export default {
    format(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
            }
        }
        return fmt
    }
}
/**
 * 补零
 * @param str
 * @returns {string}
 */
function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
