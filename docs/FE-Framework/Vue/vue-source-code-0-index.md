# Vue 源码学习

1. Vue 响应式原理 reactivity
  1. 数据变化侦测 detection chnage
  1. 收集依赖：（对象 / 数组) collect dependency
  1. 派发更新: (对象 / 数组) dispatch update
1. 初始化：Vue 构造函数及 Vue.prototype 原型对象
1. 实例化：new Vue => _init()
1. 挂载 $mount(selector)
  - template => VNode: compiler (parse => optimize => codegen)
  - VNode => DOM: render (create => diff => patch)
1. 组件 component