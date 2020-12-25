# webapck

catalog 目录

1. 基础入门
    1. 什么是 webpack？webpack 用来解决什么问题？
    1. 前端模块化发展简史
    1. webpack 安装和使用
1. webpack 配置项
    1. entry 配置入口
    1. output 配置出口
    1. resolve 配置查找模块的路径解析规则
    1. module 配置模块转换的 loader
    1. plugin 配置插件
    1. devServer 配置本地开发服务器
    1. devtool 配置 source-map
    1. optimization 构建优化的选项，压缩、切片等
    1. 其它配置项：performance 配置构建时如何提示信息、 externals 配置不需要进行打包的外部扩展等
    1. 整体配置文件（详细）
1. webpack 项目构建实践
    1. webpack 实现目标：代码转化、模块合并、代码校验、代码切分、代码优化
    1. HTML
    1. CSS
    1. Asset 静态资源
    1. js module
    1. 环境区分
    1. 性能分析
1. webpack 原理浅析
    1. tapable 框架
    1. 编写 loader
    1. 编写 plugin

```
/****** modle / chunk / bundle 区别 ****/
modle / chunk / bundle 是同一份逻辑代码在不同场景下的称呼。
我们直接写出来的是 module; webpack 处理时是 chunk; 最后生成浏览器可以直接运行的 bundle。

/****** output *******/
path: 表示打包文件输出到的**绝对路径**，即bundle.js放在哪里
publicPath: 表示打包生成的 index.html 中引用静态资源的前缀，即放置的文件夹，如 static。

/****** devServer ****/
devServer 开启时会内存中实时编译打包运行，相当于当前内存中常驻了一个开发服务器。
contentBase: 表示启动本地服务器 devServer 时访问内容 index.html 的路径。不设置的话，默认是当前执行的目录，一般是项目根目录 '/'。会在项目根目录查找 index.html 文件。
publicPath: 表示启动本地服务器 devServer 时，引用静态文件资源的路径，如果没有默认 output 中设置的 publicPath 目录。
```

参考书籍：

-  [webpack 中 output 的`path` `publicPath` devServer 的 `contentBase` `publicPath`区别](https://juejin.im/post/5bb085dd6fb9a05cd24da5cf)
- [webpack 易混淆知识点](https://www.cnblogs.com/skychx/tag/Webpack/)
