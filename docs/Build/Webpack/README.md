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