1.怎么解决跨域问题

浏览器的同源策略导致了跨域问题，但是服务端不受浏览器限制，可以通过node层，Nginx层解决
    （1）JSONP
    （2）CORS
    （3）NODE正向代理 ：/api,可以代理到同域的node服务上，然后在node服务上访问原来的服务，再返回给前端
    （4）Nginx反向代理 ：把跨域地址转接到不跨域的地址。可以在nginx.config文件中修改server，设置server_name为不跨域的地址，设置proxy_pass为代理的地址

2.全局的请求处理封装？

统一处理登录态，统一处理全局错误
    axios：
    adapter：适配器。
    interceptors：拦截器。axios.interceptors.request.use可以对请求拦截（请求携带token给后端验证），axios.interceptors.response.use对响应拦截（响应错误的处理，响应格式的统一处理）

3.你能给xhr添加hook，在各个阶段打日志吗？
