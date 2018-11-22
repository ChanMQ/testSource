*写在前头*

**很简单的文件下载流程，主要是想看看 download link 在什么情况下能够下载，并且如何监测这个download link onload成功与否。这里直接说结论，要看效果的自己去执行看一下就好**

> #### 结论
> 1. 下载很简单，关键是在 reponse header 上加上 Content-Disposition: 'attachment;filename=[Your file name]'
> 2. iframe src 为 download link 的时候，onload 事件大部分浏览器都是不会进行触发的, complete 状态也是一直不会变化（如 chrome、IE、Edge等）, 目前看到几个主流的浏览器里，只有 Firefox 会触发这个 onload 事件
> 3. onload 事件触发后，若直接把 Iframe remove 掉，Firefox 会报找不到源文件的错误；而 chrome 若是在请求没完成之前 remove Iframe，请求会被 canceled，就类似于页面重载的时候非阻塞的 ajax 请求都会被干掉一样
> 4. 监听 download link 的 onload 情况，前端可以借用 ajax + blob + createObjectURL + a download attribute 实现，但是也存在着兼容性的问题 
> 5. 先看看这个请求有没有成功的话，当服务器收到请求之后，实际上是能够监听的到 request 的 cancel aborted 等事件的，可以由后端来做这个监控，当request cancel 或者咋的，后端把这个日志上报
