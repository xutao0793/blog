# 初始化1：new Vue 发生了什么

[[toc]]

以官网的一个简单例子开始，vue 的实例化的过程

```html
<div id="app" @click="handleClick">{{message}}</div>

<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.js"></script>
<script>
const vm = new Vue({
  data: {
    message: 'Hello Vue'
  },
  methods: {
    handleClick() {
      this.message = 'value change'
    }
  }
})
vm.$mount("#app")
</script>
```

## Vue 构造函数做了什么

1. 声明 Vue 构造函数
1. 向 Vue.prototype 原型对象挂载属性
1. 向 Vue 函数对象挂载全局 API
```js
function Vue (options) {
  if (!(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

/**向 Vue.prototype 原型对象上挂载方法 */
initMixin(Vue); // Vue.prototype._init()
stateMixin(Vue); // Vue.prototype.$set = set / Vue.prototype.$delete = del / Vue.prototype.$watch() { new Watcher() }
eventsMixin(Vue); // Vue.prototype.$on / Vue.prototype.$once / Vue.prototype.$off / Vue.prototype.$emit
lifecycleMixin(Vue); // Vue.prototype.$forceUpdate / Vue.prototype.$destroy / Vue.prototype._update => vm.__patch__
renderMixin(Vue); // Vue.prototype.$nextTick / Vue.prototype._render
initGlobalAPI (Vue) // 全局api挂载 Vue.config/Vue.option / Vue.set / Vue.delete / Vue.nextTick / Vue.observable / Vue.use / Vue.mixin / Vue.components / Vue.directives / Vue.filters / Vue.extend 等
```
声明了一个 Vue 构造函数，接着用这个 Vue 构造函数作为入参，按功能组织代码向 Vue.prototype 原型对象上初始化各种属性，包括只在源码内部调用的内部属性，以_ 开头，如_patch/_update等。以及暴露出来供实例调用的内部属性，以 $ 开头，如 $set/$emit 等。



此时，我们可以打印 `Vue.prototype` 对象：

![source-code-vue-prototype.png]("./image/vue-source-vue-prototype.png")

## `const vm = new Vue()` 做了什么

当我们调用 `new Vue()` 时， 做了两件：
- if 语句拦截了将 Vue 构造函数作为函数直接调用的情况，要求必须使用 new 调用构造函数。其中这里也可以使用 `new.target 是否 undefined`来判断，但该属性不兼容 IE。
- 核心代码是执行 `this._init()` 初始化函数。

> 注意，当 `new Vue()` 执行调用 `this._init()`时，通过下面的 `xxxMixin`函数已经在原型对象上完成了原型对象方法的初始化。所以在 `_init()`方法中可以使用所有 Vue.prototype 上的方法）。

具体看看，_init 函数做了什么？

1. 初始化实例对象 vm 的各种属性和方法
1. 适当时间调用 callHooks() 触发生命周期函数

```js
var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options 合并处理 option
    if (options && options._isComponent) { // 如果是组件
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else { // 本例到这里
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
 
    // expose real self
    vm._self = vm;
    initLifecycle(vm); // 挂载内部属性：$root/$parent/$refs=[]/$children=[]/_watcher=null，以及一些生命状态标志 flag: _inactive=null/_isMounted=false/_isDestoryed=false/_isBeingDestoryed=false
    initEvents(vm); // 挂载父组件传入的事件监听器 listeners 到实例 vm._events 对象上，来源于 template 解析到的 v-on 绑定的事件函数
    initRender(vm); // 挂载 $attrs/$listeners，以及绑定 _c/$createElement
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props 1. 解析 inject 属性的数据 resolveInject，从 _provided 取出值；2. 并将其在当前实例上转为getter/setter同时挂载到 vm 上，因为inject只读，所以setter是一个打印警告的自定义函数 warn
    initState(vm); // 初始 script 中的属性：initProps/initMethods/initData/initComputed/initWatch
    initProvide(vm); // resolve provide after data/props 将 provide 对象或函数赋值给 vm._provided 属性，供 initInjections 中使用
    callHook(vm, 'created');

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
```

此时，打印 vm 实例对象：
![source-code-vm.png]("./image/vue-source-vm.png")  

## vm.$mount("#app") 做了什么

## message 值改变引发了什么

### initData

初始化 data 数据时，渲染组件的 watcher 是在 mountComponent 函数中 new Watcher 新建的，并且此时最后一个参数 isRenderWatcher = true

### initCouputed

- computed 定义的值为什么具有缓存能力
  - 因为声明的每个 computed 都有对应实例一个 watcher 存放在 computedWatcher 中，并在首次调用 getter 进，会将该 watcher　添加到其依赖的 Dep 实例中。
  - 每个 computed 的 getter 都重写了，在getter调用时，会读取对应的 watcher，在返回 watcher.value，之前会通过 watcher.dirty 值判断是否需要更新当前coputed的值。
  - 在某个依赖值变化时，setter 中调用 dep.notify(),遍历其依赖 watcher，调用watcher.update(), 在其中会通过 watcher.lazy 的值判断是否是computed的watcher，如果是将 watcher.dirty = true。这样下次调用 computed 时返回 watcher.value 之前会根据 dirty = true，调用 watcher.evaluate() 重新获取 watcher.get()的值更新到 watcher.value


依赖收集其实就是收集每个数据被哪些Watcher（渲染Watcher、computedWatcher等）所引用，当这些数据更新时，就去通知依赖它的Watcher去更新。