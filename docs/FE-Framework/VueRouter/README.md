# VueRouter

目录：
1. Web API: history 和 location
1. vue-router 基本使用
1. vue-router 源码分析
  1. install 注册
  1. new VueRouter 实例化
  1. router.init 初始化
  1. router-view 视图渲染
  1. router-link 跳转原理

veu-router 核心是：
1. 将路由配置 routes 生成路由映射关系，用于match 函数匹配当前 url，生成路由记录 route；
2. 路径跳转 transitionTo 和 comfirmTransition 方法，执行路由钩子函数和更新。

