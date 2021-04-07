// 判断当前浏览器是否支持webp格式
function checkWebp() {
    try {
        //1.创建一个canvas 2.canvas.toDataURL("image/webp")返回一个包含webp图片展示的base64
        //3.判断base64中是否以data:image/webp开头，有的话说明转换成功了，浏览器支持webp格式
        return document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0;
    } catch (error) {
        //如果浏览器不支持webp格式可能会报错，通过try/catch捕获错误
        return false;
    }
}

const supportWebp = checkWebp();

export function transferImageToWebp (url){
    if(!url) throw Error('请传入正常图片格式')
    if(url.indexOf('data:') === 0) return url
    if(supportWebp === false) return url
    return url + '.webp'
}
