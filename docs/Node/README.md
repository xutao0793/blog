# Node

![nodejs](./img/node.png)

`Node`遵循 Commonjs 规范，以模块概念来组织代码。模块类型主要有三类:

-   **内置的模块：** 这些模块提供了 node 使用的核心 API
-   **文件模块：** 主要是在项目中我们自己写的业务模块，node 把一个.js 文件视为一个模块
-   **第三方模块：** 主要是在项目中引入的第三方的包

所以`Node`入门学习的第一步是学习 node 提供的内置模块，去掌握它的核心 API。

下面主要是对 node 提供的模块按自己的理解归一下类,以便清晰自己的学习路线。参考[Node.js 中文网](http://nodejs.cn/api/)

**认识 Node**

-   node 概述
-   nvm - node 版本管理工具
-   npm - node 自带的包管理工具
-   yarn - node 新一代包管理工具
-   node 命令行选项

**基础概念**

-   module - 模块(Commonjs)
-   events - 事件及事件环(Event Loop)
-   global - 全局变量

**进程管理**

-   process - 进程
-   child-process - 子进程
-   cluster - 集群
-   worker_threads - 工作线程

**文件操作**

-   fs - 文件操作
-   Buffer - 缓冲器
-   string_decoder - 将 Buffer 对象解码为字符串
-   stream - 流
-   readline - 逐行读取
-   path - 文件路径

**网络管理**

-   http
-   http2
-   https
-   net
-   dgram - socket 的实现
-   dns
-   tls - 对安全传输层（TLS）及安全套接层（SSL）协议的实现，建立在 OpenSSL 的基础上

**网络处理工具**

-   url - 处理与解析 URL
-   querystring - 解析和格式化查询字符串
-   crypto - 加密
-   zlib - 压缩

**调试**

-   error
-   console
-   debugger
-   repl - 交互式解释器(Read-Eval-Print Loop)

**测试**

-   assert - 断言

**工具**

-   util
-   timer

**系统**

-   os
-   v8
-   vm

**试验性的模块**

-   trace_events - 跟踪事件
-   perf_hooks -性能钩子
-   inspector - 检查器
-   async_hooks - 异步钩子

**废弃**

-   punycode - 域名代码
-   domain - 域
