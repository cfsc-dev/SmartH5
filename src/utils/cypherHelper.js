const encryption=1
export default {
    //对字符串进行加密
    compileStr(code){
        let c=String.fromCharCode(code.charCodeAt(0)+code.length);
        for(let i=encryption;i<code.length;i++)
        {
            c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-encryption));
        }
        return escape(c);
    },
    //对字符串进行解密
    uncompileStr(code){
        code=unescape(code);
        let c=String.fromCharCode(code.charCodeAt(0)-code.length);
        for(let i=encryption;i<code.length;i++)
        {
            c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-encryption));
        }
        return c;
    }
}
