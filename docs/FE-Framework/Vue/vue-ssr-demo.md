# Vue SSR 演示

按照以下几点编写示例代码：

- 最初的 web 静态页面，提前写好的整个 HTML 页面部署在服务器上，前端请求后直接吐出；
- 再到服务端使用模板引擎，预定好页面模板，根据前端请求所需求的数据注入模板渲染成页面吐给前端显示；
- 再到前端 ajax 时代，由前端请求数据，注入到页面而不刷新页面请求；
- 再到前端 SPA 时代，页面数据和 HTML 渲染全部由前端 js 完成；
- 再到现在 SSR 同构方案



## demo1: 静态页面直接吐出

```HTML
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>SSR Demo 1</title>
</head>
<body>
  <h1>SSR Demo 1: HTML 文件由服务器直接返回</h1>
  <ul>
    <li>列表 1</li>
    <li>列表 2</li>
    <li>列表 3</li>
    <li>列表 4</li>
    <li>列表 5</li>
    <li>列表 6</li>
    <li>列表 7</li>
    <li>列表 8</li>
    <li>列表 9</li>
    <li>列表 10</li>
  </ul>
</body>
</html>
```

node 原生 http 模块创建服务器：

```js
const http = require('http')
const fs = require('fs')
const PORT = 3000

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const html = fs.readFileSync('./index.html', 'utf-8')
    res.statusCode = 200
    res.setHeader('Content-type', 'text/html;')
    res.end(html)
  }
})

server.listen(PORT, () => {
  console.log(`server is runnig at http://localhost:${PORT}`);
})
```

node express 框架创建服务器：

```js
const express = require('express')
const fs = require('fs')
const PORT = 3000

const server = express()
server.get('/', (req,res) => {
  const html = fs.readFileSync('./index.html')
  res.status(200)
  res.set('Content-Type', 'text/html')
  res.send(html)
})
server.listen(PORT, () => {
  console.log(console.log(`server is runnig at http://localhost:${PORT}`));
})
```

## demo2:服务器加工模板数据

```ejs
<head>
  <meta charset="UTF-8">
  <title>ejs render</title>
</head>
<body>
  <h1><%= title %> </h1>
  <ul>
    <% list.forEach((item, index) => { %>
    <li>列表<%= index  %>: <%= item %>  </li>
    <% }) %>
  </ul>
</body>
</html>
```

ejs.render 渲染：

```js
const express = require('express')
const fs = require('fs')
const ejs = require('ejs')
const PORT = 3001

const server = express()
server.get('/', (req, res) => {
  // fs.readFile 如果未指定编码，则在回调data返回原始缓冲区，而ejs.redner期望一个字符串。
  const template = fs.readFileSync('./index-template.ejs', 'utf-8') 

  const data = {
    title: 'demo2: 服务器使用 ejs 渲染 html 返回',
    list: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  }
  const html = ejs.render(template, data)

  res.status(200)
  res.set('Content-Type', 'text/html')
  res.send(html)
})

server.listen(PORT, () => {
  console.log(console.log(`server is runnig at http://localhost:${PORT}`));
})
```

ejs 集成到 express 中，作为其模板引擎使用：

```js
const express = require('express')
// const ejs = require('ejs')
// const fs = requier('fs')
const PORT = 3002

const server = express()
// 1. 设置 server 的模板引擎为 ejs
server.set('view engine', 'ejs')

// 2. 设置ejs模板文件目录，默认是根目录下的 view 文件夹下寻找模板文件
server.set('views', __dirname)

// 3. 在路由中调用 res.render 方法渲染 html 返回
const data = {
  title: 'demo2: ejs 与 express 集成渲染返回',
  list: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
}
server.get('/', (req, res) => {
  res.status(200)
  res.set('Content-Type', 'text/html')
  res.render('index-template', data)
})

server.listen(PORT, () => {
  console.log(console.log(`server is runnig at http://localhost:${PORT}`));
})
```

## demo3: 前端 Ajax 请求数据更新页面内容

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ajax</title>
</head>
<body>
  <h1>demo3: 前端Ajax请求数据并渲染</h1>
  <ul id="container"></ul>
</body>
<script>

function initContent(data) {
  const elContainer = document.querySelector('#container')
  let elLiStr = ""
  
  if (Array.isArray(data)) {
    for (let i = 0, len = data.length; i < len; i++) {
      elLiStr += `<li>列表${i+1}: ${data[i]}</li>`
    }
  } else {
    elLiStr = `<li>${data}</li>`
  }
  elContainer.innerHTML = elLiStr
}

function getInitData() {
  // 第一种方式：XMLHttpRequest
  function handleResponseData() {
    if (this.status == 200) {
      const data = this.response
      initContent(data)
    }
  }
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('load', handleResponseData)
  xhr.open('GET', '/api')
  xhr.responseType = 'json'
  xhr.send()
  
  // 第二种方式：fetch
  fetch('/api').then(res => {
    return res.json()
  }).then(data => {
    initContent(data)
  }).catch(err => {
    console.error(err);
  })
}

document.addEventListener("DOMContentLoaded", function() {
  getInitData()
});

</script>
</html>
```

```js
const express = require('express')
const fs = require('fs')
const PORT = 3003
const data = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

const server = express()
server.get('/', (req, res) => {
  const html = fs.readFileSync('./index.html')
  res.status(200)
  res.set('Content-Type', 'text/html')
  res.send(html)
}) 

server.get('/api', (req, res) => {
  res.status(200)
  res.set('Content-Type', 'applicatiion/json')
  res.send(data)
})

server.listen(PORT, () => {
  console.log(console.log(`server is runnig at http://localhost:${PORT}`));
})
```

