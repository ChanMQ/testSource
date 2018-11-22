const http = require('http'),
    fs = require('fs'),
    path = require('path');

function index(req, res) {
    res.statusCode = 200
    res.write(`
        <html>
            <head>
                <meta charset="utf-8"/>
            </head>

            <body>
                <p>Welcome to filedownload page, I am ready for that</p>
                <a href="javascript: download();"/>点击下载</a><br/>
                <a href="/download"/>另外一个</a><br/>
                <a href="javascript: iframeDownload();"/>iframe download</a><br/>
                <a href="javascript: blobDownload();">blob download</a><br/>

                <script type="text/javascript">
                    function download() {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', '/download')
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === XMLHttpRequest.DONE) {
                                console.log(Date.now())
                                alert('想不到吧！ajax 请求是不会下载文件的！！！')
                            }
                        }
                        xhr.send()                            
                    };

                    function iframeDownload() {
                        let iframe = document.createElement('iframe')
                            iframe.style.display = 'none'
                            iframe.src = '/download'
                            iframe.onload = function() {
                                console.log('It has beened loaded: ', Date.now())
                                iframe.remove();
                            }
                            iframe.onerror = function(err) {
                                console.log('It has beened onerror: ', err, Date.now())
                            }
                        
                            document.body.appendChild(iframe)
                    };

                    function blobDownload() {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', '/download')
                        xhr.resType = 'blob';

                        xhr.onload = function() {
                            if (xhr.status == 200) {
                                var a = document.createElement('a');
                                var url = window.URL.createObjectURL(xhr.res);
                                var filename = '55309291766284914.jpg';
                                a.href = url;
                                a.download = filename;
                                a.click();
                                window.URL.revokeObjectURL(url);
                            }
                        }
                        xhr.send()
                    };
                </script>
            </body>
        </html>
        `)
    res.end()
}

function download(req, res) {
    res.statusCode = 200
    const filePath = path.join(__dirname, './image/meow.jpg')

    console.log('It has comes download path')
    req.on('aborted', () => {
        console.log('呵呵呵 aborted', Date.now())
    })

    req.on('close', () => {
        console.log('req closed', Date.now())
    })

    res.on('close', () => {
        console.log('res closed', Date.now())
    })

    res.on('finish', () => {
        console.log('res has been finish', Date.now())
    })

    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment;filename=test.zip',
        'Access-Control-Allow-Origin': '*'
    });

    // 第一种 Stream pipe
    // var readStream = fs.createReadStream(filePath);
    // // We replaced all the event handlers with a simple call to readStream.pipe()
    // readStream.pipe(res);

    // 第二种 readfilesync
    var file = fs.readFileSync(filePath)
    res.write(file)
    res.end()
}

function wrongPage(req, res) {
    res.statusCode = 404; 
    res.write('404 !!! Page seens not available');
    res.end();
}

http.createServer(function(req, res) {
    switch(req.url) {
        case '/': index(req, res); break;
        case '/download': download(req, res); break;
        default: wrongPage(req, res);
    }
})
.listen(9000, () => {
    console.log('It has listened on 9000')
});