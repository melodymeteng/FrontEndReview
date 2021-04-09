## 强缓存

**在浏览器发起 HTTP 请求前会检查是否有强缓存**

1.Expires http/1.0，设置一个过期时间，但这个时间会**受到系统本地时间影响**

2.Cache-Control：

http/1.1，通过 **max-age** 设置一个缓存过期时间，例如 max-age:3600，代表一小时后缓存过期

public：表示服务端和客户端都可以缓存

private：只有客户端可以缓存

no-store：不可以缓存

**当Expires和Cache-Control同时存在时，优先Cache-Control，如果二者都失效了，那么浏览器就会在请求头中携带tag来向服务端发起请求。**


## 协商缓存

**强缓存无效时，浏览器会在请求头中携带tag像服务端发送请求，服务端拿到tag后来决定是否使用缓存**

tag分为两种：

1.Last-Modified/If-Modified-Since。
当浏览器第一次给服务端发送请求后，服务端会在响应头中加上Last-Modified表明资源的最新修改时间，当浏览器第二次请求服务端时会在请求头中带上If-Modified-Since，服务端拿到If-Modified-Since后与Last-Modified对比，如果一致表明服务端的资源还是最新的，那么就返回状态码304使用缓存，表示资源不需要更新，如果对比不一致，那么服务端会返回最新的资源，状态码200。

2.ETag/If-None-Match。
服务端会根据文件内容生成一个文件的标识ETag，如果服务端文件有内容变化，这个ETag也会发生变化。服务端会在浏览器端请求时，将ETag放到响应头中，当浏览器端再次请求服务端时，会在请求头中带上If-None-Match，这个值就是服务端响应头中ETag的值，当服务端拿到请求头中的If-None-Match后，与ETag进行比较，如果一致返回304使用缓存，如果不一致，返回最新的资源，并且状态码200.

**Last-Modified/If-Modified和ETag/If-None-Match同时存在时，服务端优先考虑ETag/If-None-Match**


## 拿到缓存后，存放缓存的位置

1.Memory Cache 内存缓存。速度最快，存活时间短
2.Disk Cache 硬盘缓存。存活时间长、容量大，存储速度较慢



