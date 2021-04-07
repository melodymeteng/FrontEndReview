1、做性能优化的目的是什么？
（1）首屏时间
（2）首次可交互时间
（3）首次有意义内容渲染时间

页面性能检测: https://developers.google.com/speed/pagespeed/insights
polyfill: https://polyfill.io/v3/url-builder/ --->该网站提供了cdn文件，<script>引入js后</script>，就可以根据当前浏览器需要的语法将项目代码中的高级进行转化

1.只请求当前需要的资源
    异步加载，懒加载，polyfill

2.缩减资源体积
    打包压缩 webpack4内置了代码压缩功能，
    gzip 一种压缩的算法 Nginx内可以开启 gzip on，
    图片格式的优化，压缩，webp，
    尽量控制cookie的大小，因为每一次请求内的 request header，同域请求会携带cookie，如果体积过大会增加请求时间

3.时序优化
    promise.all 并行执行Promise
    ssr 把打包的文件放在服务端，服务端渲染输出到浏览器端，服务器端的资源也可以缓存，方便于SEO
    prefetch,prerender,preload
    <link rel='dns-prefetch' href='xxxx1.com' /> 可以在html被加载的一刻直接去dns请求资源,而不用等到执行到link标签时再加载。预解析
    <link rel='preconnect' href='xxxx2.com' /> 预链接
    <link rel='preload' as='image' href='xxxx2.com/p.png' /> as指定类型image，图片预加载

4.合理利用缓存
    cdn cdn预热（cdn厂家在用户访问前把cdn的内容提前分发给各个节点）、cdn刷新（强制回源）、cdn的资源域名可能跟业务域名不一样，jd.com cdn-jd.com，因为浏览器会把同源同域下请求头中携带cookie，cdn的请求一般是不需要cookie的

2、如果一段js代码执行事件非常长，怎么分析呢
    可以用装饰器decorator实现对于函数的执行时间计算
    <script>
        const jsTimer = function(target,name,descriptor){
            const val = descriptor.value;
            descriptor.value = async function(){
                console.time(name);
                const res = await val.apply(this,arguments);
                console.timeEnd(name)
                return res
            }
            return descriptor
        }
    </script>

3、如果阿里云oss支持通过链接后面拼接参数来做图片的格式转换，尝试写写把任意图片格式转换为webp，需要注意什么？
    (1)当前浏览器支不支持webp

4、如果页面上有巨量的图片，除了懒加载，有没有什么方法可以限制同时加载的图片数量？
        
