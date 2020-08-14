/**
 * created: 2020-08-12 18:39:36
 * author: xutao
 * description: compare vue2 with vue3
 */
<template>
  <div>
    <aside>
      <nav id="nav">
        <!-- 初始化应用 -->
        <p>初始化应用</p>
        <a href="#initialization">initialization</a>
        <!-- 常规 options -->
        <p>常规 Options </p>
        <a href="#setup">setup 新增</a>
        <a href="#data">data</a>
        <a href="#computed">computed</a>
        <a href="#methods">methods</a>
        <a href="#watch">watch</a>
        <a href="#watchEffect">watchEffect 新增</a>
        <a href="#props">props</a>
        <a href="#components">components</a>
        <a href="#provide-inject">provide / inject</a>
        <a href="#directive">directive</a>
        <a href="#filters">filters 废弃</a>
        <a href="#mixins">mixins 废弃</a>
        <!-- 生命周期 liftcycle -->
        <p>生命周期 liftcycle</p>
        <a href="#liftcycle">beforeCreate</a>
        <a href="#setup">setup</a>
        <a href="#liftcycle">created</a>
        <a href="#liftcycle">beforeMount => onBeforeMount</a>
        <a href="#liftcycle">mounted => onMounted</a>
        <a href="#liftcycle">beforeUpdate => onBeforeUpdate </a>
        <a href="#liftcycle">updated => onUpdated</a>
        <a href="#liftcycle">beforeDestroy => onBeforeUnmount</a>
        <a href="#liftcycle">destoryed => onUnmounted</a>
        <a href="#liftcycle">errorCaptured => onErrorCaptured</a>
        <!-- 实例属性 -->
        <p>实例属性</p>
        <a href="#context">$attrs</a>
        <a href="#context">$slots</a>
        <a href="#context">$emit</a>
        <a href="#refs">$refs</a>
        <a href="#nextTick">$nextTick</a>
        <a href="#getCurrentInstance">$root</a>
        <a href="#getCurrentInstance">$parent</a>
        <a href="#getCurrentInstance">$listeners</a>
        <!-- 全局属性 -->
        <p>全局属性</p>
        <a href="#defineComponent">Vue.extend</a>
        <a href="#defineComponent">Vue.component</a>
        <a href="#directive">Vue.directive</a>
        <a href="#">Vue.mixin</a>
        <a href="#">Vue.use</a>
        <a href="#nextTick">Vue.nextTick</a>
        <a href="#">Vue.compile</a>
        <a href="#">Vue.version</a>
        <!-- 弃用 -->
        <p>弃用</p>
        <a href="#filters">Vue.filter</a>
        <a href="#abandon">Vue.observable</a>
        <a href="#abandon">Vue.set</a>
        <a href="#abandon">Vue.delete</a>
        <a href="#abandon">$set</a>
        <a href="#abandon">$delete</a>
        <a href="#abandon">$on</a>
        <a href="#abandon">$once</a>
        <a href="#abandon">$off</a>

      </nav>
    </aside>
    <main>
      <!-- <header>
        <h1 style="display: flex;align-items: center;padding: 1.5rem;">
          <a href="#">
            <img style="width:2rem" src="./dependency/logo.png" alt="Vue">
          </a>
          <span style="font-size:1.5rem;font-weight:600;color:#a0aec0;margin-left:1rem;">Compare vue2 with vue3</span>
        </h1>
      </header> -->
      <div class="content">
        <section>
          <h2 id="initialization"><a href="#initialization">#</a>initialization</h2>
          <div v-hljs>
            <pre>
              <code>import Vue from 'vue';
import App from './App';

const app = new Vue({
  render: h => h(App)
})
app.$mount('#app')
              </code>
              <code>import { createApp } from 'vue';
import App from './App';

const app = createApp(App)
app.mount('#app')
              </code>
            </pre>
          </div>
        </section>
        <section>
          <h2 id="setup"><a href="#setup">#</a>setup</h2>
          <p>vue3 新增 setup 方法，有两个重点：</p>
          <p>1. 组件主要 script 逻辑都在 setup 函数体内完成，包括声明响应式数据data，计算属性 couputed，方法 methods，副作用观察 watch / watchEffect，生命周期等。</p>
          <p>2. setup 方法有两个形参 props / context</p>
          <div v-hljs>
            <pre class="language-js language-xml">
              <code>export default {
  setup(props, ctx) {
    console.log(props, ctx); // 上下文对象ctx：attrs / slots / emit
  }
}</code>
            </pre>
          </div>
        </section>
        <section>
          <h2 id="data">
            <a href="#data">#</a>
            data
          </h2>
          <p>在 Vue2.x 中，只要在 data 中的数据，框架内部自动会将其处理成响应式数据。但在 Vue3 中，采用函数式编程，需要手动将需要的数据设置成响应式数据，暴露的 API 包括：<b>ref / reactive</b>，以及两个工具函数用于将 reactive 后的对象属性设置为中化单独的响应式：<b>toRef / toRefs</b>。</p>
          <div v-hljs>
            <pre class="language-js language-xml">
  <code>
export default {
  name: 'example',
  data() {
    return {
      count: 0
    }
  }
}</code>
  <code>import { ref } from 'vue'
export default {
  name: 'example',
  setup() {
    const count = ref(0)
    return {
      count
    }
  }  
}</code>
            </pre>
            <pre class="language-js language-xml">
  <code>
export default {
  name: 'example',
  data() {
    return {
      pagination: {
        pageSize: 10,
        pageNo: 1,
        total: 100
      }
    }
  }
}</code>
  <code>import { reactive } from 'vue'
export default {
  name: 'example',
  setup() {
    const pagination = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 100
    })
    return {
      pagination
    }
  }  
}</code>
            </pre>
            <pre class="language-js language-xml">
  <code>import { toRef } from 'vue'
export default {
  name: 'example',
  setup() {
    const pagination = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 100
    })
    const pageNo = toRef(pagination, 'pageNo')
    return {
      pageNo
    }
  }  
}</code>
    <code>import { toRefs } from 'vue'
export default {
  name: 'example',
  setup() {
    const pagination = reactive({
      pageSize: 10,
      pageNo: 1,
      total: 100
    })
    const { pageSize, pageNo, total } = toRefs(pagination)
    return {
      pageSize,
      pageNo,
      total
    }
  }  
}</code>
            </pre>
        </div>
        </section>
        <section>
          <h2 id="computed">
            <a href="#computed">#</a>
            computed
          </h2>
          <div v-hljs>
            <pre class="language-js language-xml">
  <code>
export default {
  name: 'example',
  data() {
    return {
      count: 1
    }
  },
  computed: {
    double() {
      return this.count * 2
    }
  }
}</code>
  <code>import { ref, computed } from 'vue'
export default {
  name: 'example',
  setup() {
    const count = ref(1)
    const double = computed(() => {
      return count.value * 2
    })
    return {
      count,
      double
    }
  }  
}</code>
    </pre>
    <pre class="language-js language-xml">
<code>
export default {
  name: 'example',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
  computed: {
    showModal: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('update:show', value)
      }
    }
  }
}</code>
<code>import { computed } from 'vue'
export default {
  name: 'example',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
  setup(props, ctx) {
    const showModal = computed({
      get() {
        return props.show
      },
      set(value) {
        ctx.emit('update:show', value)
      }
    })
    return {
      showModal
    }
  }  
}</code>
          </pre>
          </div>
        </section>
        <section>
          <h2 id="method">
            <a href="#method">#</a>
            method
          </h2>
          <div v-hljs>
            <pre class="language-js language-xml">
  <code>
export default {
  name: 'example',
  data() {
    return {
      count: 1
    }
  }
  methods: {
    increase() {
      this.count++
    }
  }
}</code>
  <code>import { ref } from 'vue'
export default {
  name: 'example',
  setup() {
    const count = ref(1)
    function increase() {
      count.value++
    }
    return {
      count,
      increase
    }
  }  
}</code>
            </pre>
          </div>
        </section>
        <section>
          <h2 id="watch">
            <a href="#watch">#</a>
            watch
          </h2>
          <div v-hljs>
            <pre class="language-js language-xml">
  <code>
export default {
  name: 'example',
  data() {
    return {
      a: 1,
      b: 2,
      d: {
        e: {
          f: 4
        }
      }
    }
  }
  // watch 属性调用
  watch: {
    // 侦听一个值
    a: function(newValue, oldValue) {
      console.log('new: %s, old: %s', newValue, oldValue);
    },
    // 侦听属性配置
    b: {
      immediate: true,
      handler: function(newValue, oldValue) {
        console.log('new: %s, old: %s', newValue, oldValue);
      }
    },
    // 侦听对象某个属性，并实现多个侦听回调
    'd.e': {
      deep: true,
      immediate: true,
      handler: [handler1, handler2,...]
    }
  },
  created() {
    // this.$watch 代码调用
    const unWatch = this.$watch('d.e', (newValue, oldValue) => {
      console.log('new: %s, old: %s', newValue, oldValue);
    }, {
      deep: true,
      immediate: true
    })
    // do something 后取消侦听，
    unWatch()
  }
}</code>
  <code>import { ref, reactive, watch } from 'vue'
export default {
  name: 'example',
  setup() {
    const a = ref(1)
    const b = reactive({c: 2})
    
    // 直接侦听一个ref
    watch(a, (newValue, oldValue) => {
      console.log('new: %s, old: %s', newValue, oldValue);
    })
    
    // 侦听一个 getter
    watch(() => b.c, (newValue, oldValue) => {
      console.log('new: %s, old: %s', newValue, oldValue);
    })

    // 侦听属性配置 deep immediate
    watch(
      a,
      (newValue, oldValue) => {
        console.log('new: %s, old: %s', newValue, oldValue);
      },
      {
        deep: true,
        immediate: true
      }
    )

    // 同时侦听多个
    watch([a, () => b.c], ([newValue_a, oldValue_a], [newValue_b_c, oldValue_b_c]) => {
      console.log('watch a new: %s, old: %s', newValue_a, oldValue_a);
      console.log('watch b.c new: %s, old: %s', newValue_b_c, oldValue_b_c);
    })

    // 取消侦听
    cosnt unWatch = watch(a, (newValue, oldValue) => {
      console.log('new: %s, old: %s', newValue, oldValue);
    })
    unWatch()
    
    // TODO: 清除副作用

    // TODO： 副作用刷新时机
    return {
      a,
      b
    }
  }  
}</code>
            </pre>
          </div>
        </section>
        <section>
          <h2 id="watchEffect">
            <a href="#watchEffect">#</a>
            watchEffect 新增
          </h2>
          <p>watch 需要显示指明侦听对象，watchEffect 会自动处理侦听函数中所依赖的需要侦听的对象，所以入参只有一个侦听函数</p>
          <div v-hljs>
          <pre class="language-js language-xml">
            <code>import { watchEffect, ref } from 'vue'
export default {
  name: 'example',
  setup() {
    const count = ref(0)
    // 常规使用
    watchEffect(() => {
      console.log(count.value)
    })

    // 主动卸载侦听器
    const unWatch = watchEffect(() => {
      console.log(count.value)
    })
    
    function someMethod() {
      unWatch()
    }
    
    // 清除副作用，回调函数入参 onInvalidate
    watchEffect((onInvalidate) => {
      const token = performAsyncOperation(id.value)
      onInvalidate(() => {
        // id 改变时 或 停止侦听时
        // 取消之前的异步操作
        token.cancel()
      })
    })
    return {
      count,
      someMethod
    }
  }      
}</code>
          </pre>
          </div>
        </section>
        <section>
          <h2 id="props">
            <a href="#props">#</a>
            props
          </h2>
          <p>props 声明不变，使用变化。</p>
          <div v-hljs>
            <pre class="language-js language-xml">
              <code>
export default {
  name: 'example',
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    }
  }
  methods: {
    onClose() {
      console.log(this.show)
    }
  }
}</code>
              <code>import { watchEffect, toRef, toRefs } from 'vue'
export default {
name: 'example',
props: {
  show: {
    type: Boolean,
    default: false,
    required: true
  }
}
setup(props) { // 不能直接在形参上解构，否则会丢失响应式: setup({show}) {...}
  const showRaw = props.show // 同样没有响应式联动
  const showRef = toRef(props, 'show')
  const { show } = toRefs(props)

  watchEffect(() => {
    console.log(props.show, showRaw);
  })
  return {
    showRef,
    show
  }
}
}</code>
            </pre>
          </div>
        </section>
        <section>
          <h2 id="components">
            <a href="#components">#</a>
            components
          </h2>
          <p>注册子组件方式不变</p>
          <div v-hljs>
          <pre class="language-js language-xml">
            <code>import Child from './components/Child'
export default {
  name: 'example',
  components: {
    Child
  },
  data() {
    return {

    }
  }
}</code>
<code>import Child from './components/Child'
export default {
  name: 'example',
  components: {
    Child
  },
  setup(props, ctx) {
    return {

    }
  }
}< 
</code>
          </pre>
          </div>
        </section>
        <section v-hljs>
          <h2 id="provide-inject">
            <a href="#provide-inject">#</a>
            provide / inject
          </h2>
          <pre class="language-js language-xml">
            <code>// 父组件 Partent.vue
export default {
  name: 'parent',
  components: {
    Child
  }
  provide: {
    bgColor: 'red'
  }
}
// 子组件 Child 中 使用 inject 有三种方式
export default {
  name: 'child',
  inject: ['bgColor'], // 字符形式
  inject: { 
    bgColor: {
      default: 'blue' // 提供默认值
    }
  },
  inject: {
    themeColor: { // 重命名，声明来自from哪个provide的属性
      from: 'bgColor',
      default: 'blue'
    }
  }
}</code>
<code>// 父组件 Parent.vue
import { provide } from 'vue';
export default {
  name: 'parent',
  components: {
    Child
  }
  setup() {
    provide('bgColor', 'red') // 此时 bgColor 不具有响应式
    const bgColor = ref('red')
    provide('bgColor', bgColor)

    return {
    }
  }
}
// 子组件 Child
import { inject } from 'vue'; 
export default {
  name: 'child',
  setup() {
    const themeColor = inject('bgColor', 'blue')
    return {
    }
  }
}</code>
          </pre>
        </section>
        <section v-hljs>
          <h2 id="directive">
            <a href="#directive">#</a>
            directive
          </h2>
        </section>
        <section>
          <h2 id="filter">
            <a href="#filter">#</a>
            filter 废弃
          </h2>
          <p>在 Vue3 中，取消了 filter 实现，建议使用计算属性 computed 代替</p>
          <div v-hljs>
            <pre class="language-js language-xml">
  <code>
export default {
  name: 'example',
  data() {
    return {
      count: 1
    }
  }
  filters: {
    dollar(val) {
      return '$' + val
    }
  },
  template: `&lt;div&gt;{{ count | dollar }}&lt;/div&gt;`
}</code>
  <code>import { computed } from 'vue'
export default {
  name: 'example',
  setup() {
    const count = ref(1)
    const dollar = computed(() => {
      return '$' + count.value
    })
    return {
      count,
      dollar
    }
  }  
}</code>
            </pre>
          </div>
        </section>
        <section v-hljs>
          <h2 id="mixins">
            <a href="#mixins">#</a>
            mixins 废弃
          </h2>
          <p>vue 2.x 的 mixins 被废弃， vue3 的函数式编程天然具有独立功能抽离共用的能力</p>
          <pre class="language-js language-xml">
            <code>import mousePosition from './mixins/mousePosition.js'
export default {
  name: 'example',
  mixins: [mousePosition]
  methods: {
    onShowPosition() {
      console.log('x: %s, y: %s', this.x, this.y)
    }
  }
}</code>
<code>import useMousePositon from './utils/mousePosition'
export default {
  name: 'example',
  setup() {
    const { x, y } = useMousePositon()

    function onShowPosition() {
      console.log('x: %s, y: %s', x, y)
    }
    return {}
  }
}< 
</code>
          </pre>
        </section>
        <section v-hljs>
          <h2 id="liftcycle">
            <a href="#liftcycle">#</a>
            liftcycle 组件生命周期
          </h2>
          <p>beforeCreate 和 created 被废弃，使用 setup ，调用时机在两者之间，所以 setup 方法内部无法使用 this</p>
          <pre class="language-js language-xml">
            <code>







export default {
  name: 'example',
  beforeCreate() {...},
  create() {...},
  beforeMount() {...},
  mounted() {...},
  beforeUpdate() {...},
  updated() {...}
  beforeDestroy() {...}
  destoryed() {...}
}</code>
            <code>import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'
export default {
  name: 'example',
  setup(props, ctx) {
    onBeforeMount() {...},
    onMounted() {...},
    onBeforeUpdate() {...},
    onUpdated() {...},
    onBeforeUnmount() {...},
    onUnmounted() {...},
  }
}</code>
          </pre>
        </section>
        <section v-hljs>
          <h2 id="context">
            <a href="#context">#</a>
            实例属性之 attrs / slots / emit
          </h2>
          <p>在 Vue 2.x 中，这些实例属性都挂载在组件当前 this 对象上。在 Vue 3 中， setup方法第二个参数提供了部分属性：attrs / slots / emit</p>
          <pre class="language-js language-xml">
<code>export default {
  name: 'exapmle',
  setup(props, ctx) {
    console.log(ctx) // attrs / slots / emit
  }
  // props 不可以形参上解构，但 ctx 可以直接在形参上解构获取仍保持响应式
  setup(props, {attrs, slots, emit}) {
    console.log(attrs, slots, emit)
  }
}</code>
          </pre>
        </section>
        <section v-hljs>
          <h2 id="getCurrentInstance">
            <a href="#getCurrentInstance">#</a>
            getCurrentInstance 获取当前组件实例
          </h2>
          <p>除此之外，像 $root / $parent / $child 等实例属性，可以直接使用 getCurrentInstance 方法获取，相当于原来的 this</p>
          <pre class="language-js language-xml">
            <code>import getCurrentInstance from 'getCurrentInstance';
export default {
  name: 'example',
  setup(
    const vm = getCurrentInstance()
    console.log('vm', vm) // root appContext parent, 包括 props data attrs slots emit refs render provides inject 等
  )
}
            </code>
          </pre>
        </section>
        <section v-hljs>
          <h2 id="refs">
            <a href="#refs">#</a>
            refs
          </h2>
          <p>template 模板中 ref 属性的绑定在使用方式上，跟在模板中使用响应式数据的方法上实现了统一</p>
          <pre class="language-js language-xml">
            <code>&lt;template&gt;
  &lt;input ref="input" value="value"&gt;&lt;/input&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    name: 'example',
    data() {
      return {
        value: 1
      }
    },
    mounted() {
      console.log(this.$refs.input)
    }
  }
&lt;/script&gt;</code>
            <code>&lt;template&gt;
  &lt;input ref="input" value="value"&gt;&lt;/input&gt;
&lt;/template&gt;
&lt;script&gt;
  import { ref onMounted} from 'vue';
  export default {
    name: 'example',
    setup() {
      const input = ref(null)
      const value = ref(1)

      onMounted(() => {
        // input.value 返回的就是 input 元素 或者 组件实例
        console.log(input.value)
      })
      return (
        input,
        value
      )
    }
  }
&lt;/script&gt;</code>
          </pre>
        </section>
        <section v-hljs>
          <h2 id="nextTick">
            <a href="#nextTick">#</a>
            nextTick
          </h2>
          <p>vue 2.x 中全局属性 Vue.nextTick() 或者实例属性 vm.$nectTick()，在 Vue3 中变成一个可引入的全局API nextTick()，返回一个promise</p>
          <pre class="language-js language-xml">
            <code>&lt;template&gt;
  &lt;button @click="onShowInput" &gt;显示input&lt;/button&gt;
  &lt;input v-if="showInput" ref="el_input" value="value"&gt;&lt;/input&gt;
&lt;/template&gt;
export default {
  name: 'example',
  data() {
    return {
      showInput: false
    }
  }
  method: {
    onShowInput() {
      this.showInput = true
      this.$nextTick(() => {
        console.log(this.$refs.el_input)
      })
    }
  }
}</code>
            <code>&lt;template&gt;
  &lt;button @click="onShowInput" &gt;显示input&lt;/button&gt;
  &lt;input v-if="showInput" ref="el_input" value="value"&gt;&lt;/input&gt;
&lt;/template&gt;
import { nextTick } from 'vue';
export default {
  name: 'example',
  setup() {
    const el_input = ref(null)
    const showInput = ref(false)
    function onShowInput() {
      showInput.value = true
      nextTick(() => {
        console.log(el_input.value)
      })
    }

    return {
      el_input,
      showInput,
      onShowInput
    }
  }
}</code>
          </pre>
        </section>
        <section v-hljs>
          <h2 id="defineComponent">
            <a href="#defineComponent">#</a>
            defineComponent
          </h2>
          <p>Vue 2.x 通过 Vue.extend() 创建一个新组件，并用 Vue.component() 注册组件；或者直接使用 Vue.component() 创建并注册组件</p>
          <p>Vue3 定义了 defineComponent 方法来创建一个组件</p>
          <pre class="language-js language-xml">
            <code>// Vue.extend() 返回一个构造器函数
const MyComponent = Vue.extend({
  template: '&lt;p&gt;{{firstName}} {{lastName}} aka {{alias}}&lt;/p&gt;',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})

// Vue.component() 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))
Vue.component('my-component', MyComponent)

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
            </code>
            <code>import { defineComponent } from 'vue'
const MyComponent = defineComponent({
  name: 'MyComponent',
  setup() {
    const count = ref(0)
    return (
      &lt;div&gt;{count.value}&lt;/div&gt;
    )
  }
})
            </code>
          </pre>
        </section>
        <section>
          <h2 id="abandon">
            <a href="#abandon">#</a>
            废弃属性
          </h2>
          <p>因为 Vue 2.x 中响应式原理使用 Object.defineProperty() ，所以存在以下问题：</p>
          <p>1. 只对预置在 data 属性中的数据实现响应式, 在其它地方临时添加属性不具有响应式，此时需要调用 this.$set()添加属性才行，同样删除属性调用this.$delete删改属性同时删除响应式绑定</p>
          <p>在 Vue3 中响应式原理使用 ES6 的 proxy 实现，即不存在上述问题，所以这些工具方法无用了。</p>
          <p>包括全局属性 vue.set / delete ；实例属性 $set / $delete</p>
          <p>另外 Vue.observale 功能也替换为 ref 和 reactive 方法来实现</p>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
  import 'highlight.js/styles/foundation.css' 
  import hljs from 'highlight.js';
  export default {
    name: 'CompareVue2WithVue3',
    directives: {
      hljs: {
        inserted: function(el) {
          let blocks = el.querySelectorAll('pre code');
          blocks.forEach((block)=>{
              hljs.highlightBlock(block)
          })
        }
      }
    },
  }
</script>

<style scoped>
/* nav 侧边栏导航 */
aside {
  position: fixed;
  right: 0;
  top: 57px;
  width: 200px;
  height: calc(100vh - 120px);
  background-color: #f56565;
  padding: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
}
nav a {
  display: block;
  padding: 1em;
  border: 1px solid #ff4726;
  font-family: 'Unica One', sans-serif;
  color: #fff;
  text-align: center;
  letter-spacing: 1px;
  font-size: 16px;
}
nav a:hover {
  background-color: #ff4726;
}
nav p {
  /* padding: 1em 0; */
  font-weight: 800;
  color: #e2e8f0;
  display: flex;
  align-items: center;
}
nav p::after,
nav p::before {
  content: "";
  display: inline-block;
  flex: 1;
  height: 1px;
  background-color: #e2e8f0;
  vertical-align: middle;
}
nav p::before {
  margin-right: 10px;
}
nav p::after {
  margin-left: 10px;
}
/* / nav 侧边栏导航 */

/* 内容块 */
section {
  padding: 0 20px;
}
section h2 {
  margin-top: 3rem;
  margin-bottom: 0.5rem;
  line-height: 1.1em;
  color: #ff6347;
  font-size: 1.5rem;
  font-weight: 600;
}
section h2 a {
  color: #ccc;
  font-size: 20px;
  margin-right: 8px;
}
/* / 内容块 */
pre {
  display: flex;
  background-color: transparent !important;
}
pre:not(:last-of-type) {
  margin-bottom: 20px;
}
code {
  background-color: #282c34 !important;
  padding: 10px !important;
  border-radius: 6px !important;
  /* font-family: cousine,sfmono-regular,Consolas,Menlo,liberation mono,ubuntu mono,Courier,monospace; */
}
code:not(:last-of-type) {
  margin-right: 20px;
}
</style>