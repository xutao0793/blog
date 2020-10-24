---
home: true
heroImage: null
heroText: 前端壹贰叁
tagline: 个人技术栈学习总结
actionText: 快速上手 →
actionLink: /FE-Framework/Vue/
features:
- title: Design
  details: 产品设计和UI设计的基本工具 AXURE、PS 等。
- title: Frontend
  details: 前端通用技术，分为前端语言、前端框架类库、前端工程化( FE-Language / FE-Framework / FE-Engineering )等。
- title: Browser
  details: 浏览器相关知识，主要集中在 WEB API 学习：BOM / DOM / 渲染 / 缓存 / V8 等。
- title: Network
  details: 网络相关知识，包括 Ajax / Fetch / Axios / HTTP 等。
- title: Backend
  details: 服务端相关知识，包括 Node / Express / Koa2 / Nest / Nginx / Docker 等。
footer: MIT Licensed | Copyright © 2018-present fer123
---

## 知识脉路

[2018前端工程师成长路线图](https://www.cnblogs.com/fundebug/p/2018-frontend-roadmap.html)

### HTML

- HTML
- HTML5
- HTML规范
- 模板引擎：
    - handlebars
    - art-template

### CSS

- CSS
- CSS3
- CSS 预处理器: scss / less / stylus / postcss
- CSS 框架：bootstrap
- CSS 规范：BEM / OOCSS / SMACSS
- Css in Js：css-modules / styled-components

### EcmaScript

- ES
- ES next: 6/7/8/9
- 异步编程
- 面向对象编程
- 函数式编程
- AST：Abstract Syntax Tree，AST（抽象语法树）

[前端模块化简史：浅谈 JavaScript 模块化](https://www.cnblogs.com/Leo_wl/p/4869090.html)<br>
[ES modules 基本用法、模块继承、跨模块常量、import()](https://www.cnblogs.com/ChenChunChang/p/8296373.html)

### TypeScript

-   `Typescript`是什么以及为什么用它:heavy_check_mark:
-   安装 `Typescript`:heavy_check_mark:
-   基本类型注解:heavy_check_mark:
-   高级类型:heavy_check_mark:
-   泛型 Generics:heavy_check_mark:
-   接口 Interfaces:heavy_check_mark:
-   类 Class:heavy_check_mark:
-   模块 Module:heavy_check_mark:
-   声明文件 Declaration:heavy_check_mark:
-   配置文件 tsconfig.json:heavy_check_mark:

### Web Browser 浏览器

- 认识浏览器
    - 浏览器界面
    - 浏览器历史:heavy_check_mark:
    - 浏览器的多进程多线程架构:heavy_check_mark:
- 浏览器页面渲染过程
    - 页面渲染：如何显示页面:heavy_check_mark:
    - V8 引擎：如何解析一段JS代码:heavy_check_mark:
    - JS 运行机制：如何运行一段代码:heavy_check_mark:
    - JS内存机制：如何进行数据存储
    - 浏览器的事件循环机制：
    [JavaScript 浏览器事件解析](https://zhuanlan.zhihu.com/p/22718822)
    [任务，微任务，队列和日程安排](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- Web Cache缓存：浏览器缓存
    - 页面资源缓存（三级缓存机制）:heavy_check_mark:
    - 本地数据缓存：cookie、web storage、indexedDB
- web 多线程：web worker、server worker(离线应用)
- 浏览器安全
    - 同源策略
    - 安全沙箱
    - 跨站脚本攻击（XSS：Cross Site Scripting）
    - 跨站请求伪造（CSRF: Cross Site Request Forgery）
- BOM
    - windows
    - navigator
    - location 
    - history
    - screen
    - frames
- DOM
    - DOM0 / DOM1 / DOM3
- CSSOM
    - CSSStyleSheet
    - styleSheet
    - CSSRule
    - CSSStyleRule
    - CSSStyleDeclaration

[从浏览器多进程到 JS 单线程，JS 运行机制最全面的一次梳理](http://www.dailichun.com/2018/01/21/js_singlethread_eventloop.html)<br>
[浏览器内核、JS 引擎、页面呈现原理及其优化](https://www.zybuluo.com/yangfch3/note/671516)<br>
[浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)<br>
[浏览器原理](https://github.com/lhyt/issue/issues/22)<br>
[关键渲染路径-刘博文](https://github.com/berwin/Blog/issues/29)<br>
[浏览器性能优化】优化关键渲染路径——各种对象模型（DOM，CSSOM 等）---重点是 devtools 面板使用](https://www.jianshu.com/p/dcc416bfa9c9)

### FE-Framework 前端框架
- web端： jQuery  Vue:heavy_check_mark:  React:heavy_check_mark:
- 移动端：H5 React-Native Hybird混合开发
- 桌面端：PWA Electron
- 程序端附加应用： 小程序
- 跨端应用：uni-app  Taro  Flutter

[Vue 接口管理](https://www.jianshu.com/p/89ca6428a4b5)

### FE-Engineering 前端工程化

#### 构建工具
- Gulp
- Webpack: heavy_check_mark:

[Joyco webpack 学习笔记](https://www.cnblogs.com/joyco773/tag/webpack/)

#### 版本管理工具
- Git:heavy_check_mark:

[Pro git 简体中文版](https://iissnan.com/progit/)<br>
[易百 git 教程](https://www.yiibai.com/git/)<br>
[图解 git 命令](https://github.com/geeeeeeeeek/git-recipes/wiki/4.1-%E5%9B%BE%E8%A7%A3-Git-%E5%91%BD%E4%BB%A4)

#### 测试工具
- Jest

[测试概述 1：ttps://segmentfault.com/a/1190000004558796#articleHeader14](https://segmentfault.com/a/1190000004558796#articleHeader14)<br>
[测试概述 2：https://yq.aliyun.com/articles/610101](https://yq.aliyun.com/articles/610101)

#### 类型检查工具
- Eslint

#### 文档工具
- JsDoc / EsDoc / TsDoc / TypeDoc
- apiDoc 用于node服务端

### network 网络服务

- 网络协议：IP UDP TCP HTTP、web Socket:heavy_check_mark:
- HTTP:heavy_check_mark:
- Ajax 和 XMLHttpRequest(XHR):heavy_check_mark:
- Fetch
- web scoket

[弄懂 CORS](https://www.jianshu.com/p/f9c21da2c661)<br>
[HTTP 访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)<br>


### Node Server 服务器

- Node:heavy_check_mark:
- 框架：express -> koa -> egg

[深入浅出 Nodejs 迷你书](https://www.infoq.cn/article/nodejs)<br>
[正向代理和反向代理](https://uule.iteye.com/blog/2436289)<br>
[一个形象的比喻：谈谈正向代理与反向代理](https://cloud.tencent.com/developer/news/198489)

### 前端分支方向

- 图形可视化：img -> SVG -> canvas -> webGL
- Web RTC
- Web VR

### 前端技术方向

- 微前端
- serverless
