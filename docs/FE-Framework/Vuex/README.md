# Vuex-1：注册 install

[[toc]]

## 状态管理

在 Vue 组件间通信在自身提供的 API 中，常用的有：
- 父子组件通信 `prop / $emit`
- 嵌套组件 `$attrs` / `$liteners`
- 后代组件通信 `provide / inject`
- 组件实例引用 `$root` / `$parent` / `$children` / `$refs`

上述方法都常用于简单的嵌套组件之间通信，对于兄弟组件间状态数据传递仍能无能为力。

并且在大型项目中，当组件树层级越来越多，组件间的通信也就越来越麻烦和复杂，特别当多个组件依赖于某些共同的数据，或者不同的组件需要能变更某一个数据时，还要保持状态数据的响应式，我们不得不考虑采取一种更好的方式去组织代码。

因此，我们考虑把组件所有共享的数据抽取出来，以一个全局单例的模式统一管理，我们要实现，在这种组织方式下，不管组件树的哪个节点，都能获取数据或者改变数据，并且依赖此数据的其它组件也能即时获取改变后最新的数据。把这些组件依赖的数据作为状态量进行统一管理，这就是状态管理。

在状态管理中，我们需要定义一些统一的概念和约定一些强制性的规则来方便管理，以此实现状态的改变可被追踪和可被预测。

这就是`vuex`产生的背后思想，它是专门为`vue`设计的状态管理库，充分复用了`vue`的数据响应机制来使得状态的改变也是响应式的。多个依赖于同一状态的组件，其中任何一个组件改变了某个依赖状态，其它组件也会也会相应地得到高效的更新。

在`vuex`中，我们定义了如下几个概念：
- state： 存放整个应用共享的状态（数据源）；
- getter： 当多个组件对获取同一个state需要进行计算或转换成合适可用的状态时，对共同转换逻辑的抽离，类似计算属性
- mutation： 同步变更某个状态量的唯一方法；
- action： 组件中需要异步触发某一状态量改变，此时派发一个aciton，触发管理这个状态量的mutation来变更这个状态量。
- module： 当项目状态管理更为复杂时，可以根据项目结构定义多个模块，每个模块都有自己的state/getter/mutation/action。为了多个模块或模块与全局仓库的隔离，可以对模块进行命名，形成模块的命名空间，具有命名空间的模块依然可以获取全局状态，在逻辑中也可以动态注册模块。
- store： 以上这些状态和方法都定义在store中，类似一个仓库，存放数据源，以及获取和变更数据的方法。一个vue实例全局只能有一个store。store对象就相当一个vuex的实例对象。

主要约定规则：同步变更数据状态通过 commit 方法触发 mutation 更改 state，异步变量数据状态通过 dispatch 方法触发 action 方法执行 commit 方法触发 mutation 更改 state。这样数据变更遵循可控可追踪的改变。

Vuex 显著特点是 state 中的数据是响应式。

总结下约定的规则，简单的说就是：**commit mutation，dispatch action**
![vuex](./image/vuex.png)

## 基本使用

```js
// 1. 引入vue 和 vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 2. 在vue中注册vuex插件
Vue.use(Vuex)

// 3. 实例化一个管理状态的仓库store
const store = new Vuex.Store({
    namespace: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})

// 4. 将store 全局注入到vue实例
const app = new Vue({
    el: "#app",
    // 把 store 对象提供给 “store” 选项，这样就可以把 store 的实例注入所有的子组件
    store,
    // 其它代码...
})

// 5. 组件中使用 this.$store
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

对照上面 5 个步骤，我们理解源码逻辑

## Vuex 导出的接口

`import Vuex from 'vuex'` 导出的 Vuex 对象包含哪些属性呢？

```js
export { 
  version: __VERSION__,
  Store,
  install,
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
  createNamespacedHelpers,
  createLogger,
};
```
## 注册插件

`Vue.use(Vuex)` 注册插件，调用 Vuex.install 方法：

```js
let Vue
function install (_Vue) {
  if (Vue && _Vue === Vue) {
    console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.');
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

function applyMixin (Vue) {
  const version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
   // 省略兼容 vue 1.x 的代码
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   * 向每个组件实例注入 this.$store 调用
   */
  function vuexInit () {
    const options = this.$options;
    if (options.store) { 
      // new Vue(options) 实例化根组件时，才有传入 store 实例
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) { 
      // 其它组件实例化时获取父组件中的引用
      this.$store = options.parent.$store;
    }
  }
}
```
