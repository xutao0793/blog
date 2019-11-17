# 27 组件三大API之二： event

在上一节中讲到prop单向下行数据绑定的特征，父组件向子组件传值通过prop实现，那如果有子组件需要向父组件传值或其它通信请求，可以通过`vue`的事件监听系统(触发事件，执行监听回调函数，并且可以在回调函数中接受传参）。

`Vue`内置了一套完整的事件触发器逻辑：

- `v-on / @`: 原来HTML元素中监听原生事件，或子组件自定义事件
- `.native`： 触发组件根元素的原生事件
- `$on`：监听组件自身触发的事件
- `$emit`： 触发事件
- `$off`： 卸载组件自身的事件监听器
- `$once`： 单次监听，只会执行一次事件监听，之后不再有效
- `$listeners`: 包含**在组件标签上v-on注册的**所有自定义监听器的对象，key为事件名，value为事件监听函数。

## v-on / @
[点击查看：v-on事件及事件修饰符，以及DOM/JQUERY事件对比]()

所以要实现上面子组件向父组件通信，我们可以在父组件中将`v-on`绑定在子组件标签上开启一个事件监听，然后在子组件内部使用`$emit`触发该事件。

[点击DEMO查看示例]()
```html
<div id="app">
    <p>this is event example for v-on/@<p>
    <!-- 绑定监听事件some-event -->
    <com-child @com-btn-click="handleChildClick"></com-child>
</div>
```
```js
const comChild = Vue.extend({
    template: `<button @click="handleClick">我是子组件内定义的按钮，点击触发父级监听事件</button>`,
    methods: {
        handleClick() {
            this.$emit('com-btn-click',666)
        }
    }
})

const vm = new Vue({
    el: "#app",
    components: {
        comChild,
    },
    methods: {
        handleChildClick(val) {
    		alert('我是由子组件触发的:' + val);
	}
    }
})
```

**事件名称始终采用kebab-case形式**
不同于组件和 prop，事件名不会作为一个 JavaScript 变量名或属性名，所以不存在任何自动化的大小写转换。即触发的事件名需要完全匹配监听这个事件所用的名称。
又因为v-on绑定在html元素上，而 HTML 是不区分大小写的。而一般事件名称都是采用多个单词，所以建议事件名一律采用`kebab-case`连字符形式。

**事件传参**
子组件在`$emit`触发事件的同时，可以传递一个值，在`v-on`绑定的事件监听器中接收到。
```js
// $emit第一个参数是监听器事件名，第二个是要传递的参数
this.$emit('some-event',666)
```
```js
// 监听事件处理函数第一个参数即为接收的值
handleChildEvent(val) {
    alert('我是由子组件触发的:' + val)
}
```

## `$on / $once`
`$on`开启的监听事件和`$emit`触发的监听事件都是在同一个组件实例。
```html
<div id="app">
    <p>this is event example for $on<p>
    <com-child></com-child>
</div>
```
```js
const comChild = Vue.extend({
    template: `<button @click="handleClick">我是子组件内定义的按钮，点击触发监听事件</button>`,
    data: () => {
        return {
            count: 0,
        }
    },
    methods: {
        handleClick() {
            this.count++
            this.$emit('comBtnClick',this.count)
        }
    },
    mounted() {
        this.$on('comBtnClick', (val) => {
            alert('我是由$on注册的监听子组件按钮点击事件'+val)
            if (val === 3) {
                console.log('卸载事件监听')
                this.$off('comBtnClick')
            }
        })
        this.$once('comBtnClick', (val) => {
            alert('我是由$once注册监听子组件按钮点击事件，只会触发一次'+val)
        })
    }
})

const vm = new Vue({
    el: "#app",
    components: {
        comChild,
    },
})
```
对于组件内部触发有条件下其它事件时，比如就监听执行一次用`$once`,或监听执行然后某条件满足下不再监听用`$on配合$off`。
但是如果是持续监听，只要事件触发就执行某动作，完全可以将监听回调函数写成methods中方法，事件处理时直接执行该方法。
```js
const comChild = Vue.extend({
    template: `<button @click="handleClick">我是子组件内定义的按钮，点击触发监听事件</button>`,
    methods: {
        handleClick() {
            // this.$emit('comBtnClick',888)
            this.comBtnClick(val)
        },
        comBtnClick(val) {
            alert('我是按钮点击触发执行'+val)
        }
    },
})
```
上面使用`$on / $emit`如果只在组件内部执行，并不能实现子组件向父组件传值通信的目的。此时我们需要再配合`$refs`属性实现。
> `ref`特性用在单个`HTML`元素上可以获取原生`DOM`节点对象，用在组件标签上，可以获取该组件实例对象。

上面的例子修改下，使用`$on / $emit / $refs`实例子组件向父组件组件的目的
```html
<div id="app">
    <p>this is event example for $on / $emit / $refs<p>
    <com-child ref="comChild"></com-child>
</div>
```
```js
const comChild = Vue.extend({
    template: `<div>
			<button @click="handleBtnClick">我是子组件内定义的按钮，点击触发监听事件</button>
			</div>`,
    methods: {
        handleBtnClick() {
            this.$emit('comBtnClick',999)
        },
    },
})

const vm = new Vue({
    el: "#app",
    components: {
        comChild,
    },
    mounted() {
        this.$refs.comChild.$on('outerSelfEvent', val => {
            console.log('组件按钮点击了')
        })
        this.$refs.comChild.$once('outerSelfEvent', val => {
            console.log('组件按钮点击了,我只监听执行一次')
        })
    }
})
```

## $off
移除自定义事件监听器。

- 如果没有提供参数，则移除所有的事件监听器；
- 如果只提供了事件，则移除该事件所有的监听器；
- 如果同时提供了事件与回调，则只移除这个回调的监听器（此时注册事件时回调函数不能采用匿名函数写法）。

```html
 <div id="app">
    <p>this is event example for $off<p>
    <com-child ref="comChild"></com-child>
</div>
```
```js
const comChild = Vue.extend({
    template: `<div>
			<button @click="handleBtnClick1">点击触发触发组件内部监听事件elert</button>
			<button @click="handleBtnClick2">点击触发触发组件内部监听事件console</button>
			<button @click="handleUninstallAllListener">点击卸载组件内所有事件监听$off()</button>
			<button @click="handleUninstallTheEvent">点击卸载组件内指定事件监听器$off(event)</button>
			<button @click="handleUninstallTheEventCallback">点击卸载组件内指定监听器$off(event,cb)</button>
			</div>`,
    methods: {
        handleBtnClick1() {
            this.$emit('handleAlert')
        },
        handleBtnClick2() {
            this.$emit('handleConsole')
        },
        handleUninstallAllListener() {
            console.log('卸载所有监听器')
            this.$off()
        },
        handleUninstallTheEvent() {
            console.log('卸载指定事件handleAlert的所有监听器')
            this.$off('handleAlert')
        },
        handleUninstallTheEventCallback() {
            console.log('卸载指定事件handleConsole中的handleConsole2监听器')
            this.$off('handleConsole', this.handleConsole2)
        },

        handleConsole2() {
            console.log('监听器Console2')
        }

    },
    mounted() {
        this.$on('handleAlert',function () {
            alert('监听器alert1')
        })
        this.$on('handleAlert',function () {
            alert('监听器alert2')
        })
        this.$on('handleConsole',function () {
            console.log('监听器Console1')
        })
        this.$on('handleConsole',this.handleConsole2 )
    }
})

const vm = new Vue({
    el: "#app",
    components: {
        comChild,
    },
})
```

## $listeners

包含了父作用域中的在组件标签上所有通过v-on注册的事件监听器。
但不包括：
1. 含有.native 修饰器的原生事件监听器
1. 组件使用$on注册的监听器

下面的例子，我们在子组件标签上绑定了一个原生事件，二个`v-on`方式的自定义事件，一个`$on`方式的自定义事件。
但终`$listeners`打印出来的只有其中二个`v-on`方式绑定的事件。
```html
<div id="app">
    <p>this is event example for $listeners<p>
    <com-child
        ref="comChild"
        @click.native="handleNativeClick"
        @child-btn-click-console="handelChildBtnClickConsole" @child-btn-click-alert="handelChildBtnClickAlert"
    ></com-child>
</div>
```
```js
const comChild = Vue.extend({
    template: `<div>
			<button @click="handleBtnClick" >点击触发触发组件内部监听事件elert</button>
			</div>`,
    methods: {
        handleBtnClick() {
            this.$emit('child-btn-click-alert')
            this.$emit('child-btn-click-console')
            this.$emit('handleConsole')
        },

    },
    mounted() {
        this.$on('handleConsole',function () {
            console.log('$on绑定监听器')
        })
        // 打印出$listeners
        console.log('$listeners:', this.$listeners)
    }
})

const vm = new Vue({
    el: "#app",
    components: {
        comChild,
    },
    methods: {
        handelChildBtnClickAlert() {
            alert('v-on绑定$emit触发alert')
        },
        handelChildBtnClickConsole() {
            console.log("v-on绑定$emit触发console")
        },
        handleNativeClick() {
            alert('native click')
        }
    }
})
```
```
$listeners:
child-btn-click-alert: ƒ invoker()
child-btn-click-console: ƒ invoker()
```



