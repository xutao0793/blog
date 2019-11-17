# 28 组件事件的修饰符`.native / .sync / v-model`，以及组件属性`model`

[[toc]]

## .native 原生事件修饰符
- 在一个组件中，如果我们为其绑定一个原生的点击事件`@click`，基本是无效的。
- 在`vue`中对组件绑定原生事件需要带上原生事件修饰符`.native`。
- 在组件中同时存在原生事件和自定义事件，组件自定义事件先于原来事件执行

```html
<div id="app">
        <p>this is event example for .native/@<p>
        <com-child @click="handleNativeClick">按钮@click</com-child>
        <com-child @click="handleNativeClick" @child-btn-click="handelChildBtnClick">按钮@click 和自定义事件@child-btn-click</com-child>
        <com-child @click.native="handleNativeClick">按钮@click.native</com-child>
        <com-child @click.native="handleNativeClick" @child-btn-click="handelChildBtnClick">按钮@click.native 和自定义事件@child-btn-click</com-child>
    </div>
```
```js
const comChild = Vue.extend({
    template: `<div>
			<button @click="handleBtnClick" >
                <slot></slot>
            </button>
			</div>`,
    methods: {
        handleBtnClick() {
            this.$emit('child-btn-click')
        },

    },
})

const vm = new Vue({
    el: "#app",
    components: {
        comChild,
    },
    methods: {
        handelChildBtnClick() {
            alert("v-on绑定组件自定义事件")
        },
        handleNativeClick() {
            alert('native click')
        }
    }
})
```

## .sync 双向数据绑定

在前面讲解`porp`时，明确了`prop`是数据单向下行的绑定，父组件通过`porp`向子组件传值。
在`v-on / $emit`中，可以在子组件中触发父组件的事件监听器，以达到子组件向父母组件传值或通信的需要，可视为子组件向父组件的数据单向上行绑定。

所以常常将两者结合起来使用。那这里就会产生一个特殊的情况：父组件通过某个`prop`向子组件传值，而子组件通过` v-on / $emit`触发父组件监听器修改的是正是父组件中的这个`porp`值。

```html
<div id="app">
    <p>this is event example for prop and $emit<p>
    <P>父组件中的num:{{ num }}</P>
    <button-counter :count='num' @child-btn-click="handelChildBtnClick"></button-counter>
</div>
```
```js
const buttonCounter = Vue.extend({
    template: `<div>
			<button @click="handelIncrease" >子组件点击次数：{{ count }}</button>
			</div>`,
    props: {
        count: Number
    },
    methods: {
        handelIncrease() {
            this.$emit('child-btn-click', this.count+1)
        },
    },
})

const vm = new Vue({
    el: "#app",
    data: {
        num: 0,
    },
    components: {
        buttonCounter,
    },
    methods: {
        handelChildBtnClick(val) {
            this.num = val;
        },
    }
})
```

父子通信传递和修改的都是同一个`prop`时，`Vue`提供一个语法糖`.sync`，可以进行简写:

```html
<div id="app">
    <p>this is event example for .sync<p>
    <P>父组件中的num:{{ num }}</P>
    <!-- <button-counter :count='num' @child-btn-click="handelChildBtnClick"></button-counter> -->
    <button-counter :count.sync='num'></button-counter>
</div>
```
```js
const buttonCounter = Vue.extend({
    template: `<div>
			<button @click="handleIncrease">子组件点击次数：{{ count }}</button>
			</div>`,
    props: {
        count: Number
    },
    methods: {
        handleIncrease() {
            // this.$emit('child-btn-click', this.count+1)
            this.$emit('update:count', this.count+1)
        }
    }
})

const vm = new Vue({
    el: "#app",
    data: {
        num: 0,
    },
    components: {
        buttonCounter,
    },
    methods: {
        // handelChildBtnClick(val) {
        //     this.num = val;
        // },
    }
})
```
上面注释的内容就是省略的内容，可以看到`.sync`语法糖就是对父组件绑定自定义事件那部分代码进行了简略，并指定`$emit`触发的父组件监听事件名必须为`update:count`的写法。
实际上完全还原`.sync`的写法是：
```html
<div id="app">
    <p>this is event example for .sync update:count<p>
    <P>父组件中的num:{{ num }}</P>
    <!-- <button-counter :count='num' @child-btn-click="handelChildBtnClick"></button-counter> -->
    <button-counter :count='num' @update:count="handelChildBtnClick"></button-counter>
</div>
```
```js
const buttonCounter = Vue.extend({
    template: `<div>
			<button @click="handleIncrease">子组件点击次数：{{ count }}</button>
			</div>`,
    props: {
        count: Number
    },
    methods: {
        handleIncrease() {
            // this.$emit('child-btn-click', this.count+1)
            this.$emit('update:count', this.count+1)
        }
    }
})

const vm = new Vue({
    el: "#app",
    data: {
        num: 0,
    },
    components: {
        buttonCounter,
    },
    methods: {
        handelChildBtnClick(val) {
            this.num = val
        }
    }
})
```

对于`v-bind='object`形式传入一个对象时，实现对象某个属性值的双向绑定，可以简写改成这样：`v-bind.sync='object'`

>对prop各种类型传递写法还不清楚的可以点击查看[vue-26-component-prop]()
```html
  <div id="app">
    <p>this is event example for .sync object.lnag<p>
    <!-- <button-counter v-bind='frontend' @child-change-lang="handleChildChangeLang"></button-counter> -->
    <button-counter v-bind.sync='frontend'></button-counter>
</div>
```
```js
const buttonCounter = Vue.extend({
    template: `<div>
            <p>前端语言：{{ lang }}</p>
            <p>前端框架：{{ framework }}</p>
            <p>前端编辑器：{{ editor }}</p>
			<button @click="handleChangeLang">子组件内点击改变前端语言</button>
			</div>`,
    props: {
        lang: String,
        framework: String,
        editor: String,
    },
    methods: {
        handleChangeLang() {
            this.$emit('update:lang', 'HTML')
        }
    }
})

const vm = new Vue({
    el: "#app",
    data: {
        num: 0,
        frontend: {
            lang: "javascript",
            framework: "vue",
            editor: "vscode",
        }
    },
    components: {
        buttonCounter,
    },
    methods: {
        // handleChildChangeLang(val) {
        //     console.log(val)
        //     this.frontend.lang = val
        // }
    }
})
```

## v-model自定义组件的双向输入绑定

在上面`.sync`实现双向数据绑定时，概念上有一些熟悉，因为之前在基础指令学习时，有一个用于表单元素输入的双向数据绑定指令`v-model`，总结的时候，提到过这也是一个语法糖而已。

在`.sync`实现时说过，`$emit`触发的事件名必须按要求写法`update:prop`的形式才行。同样的，`v-model`语法糖实现的前提也必须存在指定的值，默认是特性值是`value`，绑定的事件名是`input`。
`v-model`在绑定原生的表单元素时，会根据表单元素的类型不同，选择对应的特性和事件来实现双向绑定。
- text 和 textarea 元素使用 value 属性和 input 事件，值为字符串文本；
- checkbox 和 radio 使用 checked 属性和 change 事件，checkbox为单个时绑定值为布尔值，多选为数组，radio绑定依value值类型；
- select 字段将 value 作为 prop ，并将 change 作为事件。多选时为数组

那把`v-model`用在自定义的组件中时，v-model 默认会查找组件中名为 value 的 prop 和名为 input的事件。如果有一个不存在，则无法实现`v-model`双向绑定的效果。


```html
<!-- 原生表单输入框元素直接用v-model -->
<div id="native-test">
    <p>data中iptValue的值是： {{ iptValue }}</p>
    <input type="text" v-model="iptValue">
</div>
```
```js
const vm = new Vue({
    el: "#native-test",
    data: {
        iptValue: ''
    },
})
```
那如果现在有一个自定义的输入组件,根元素就是一个`input`元素，在组件在直接绑定`v-model`是否有效呢？
```html
<div id="app">
    <p>显示iptValue的值：{{ iptValue }}</p>
    <!-- <input type="text" v-model="iptValue"> -->
    <com-input v-model="iptValue"></com-input>
</div>
```
```js
const comInput = Vue.extend({
    template: `<input type="text"></div>`,
})

const vm = new Vue({
    el: "#app",
    data: {
        iptValue: '初始值'
    },
    components: {
        comInput,
    },
})
```
结果是无效，因为在模板编辑阶段子组件`com-input`上用`v-model`时没有在组件身上找到`value`和`input`事件。也不会找到内部原生的`input`。

**自定义组件v-model指令**

所以根据`v-model`绑定原生表单组件时的原理，手写一个组件双向输入绑定
```html
 <div id="app">
    <p>显示iptValue的值：{{ iptValue }}</p>
    <!-- <input type="text" v-model="iptValue"> -->
    <com-input :value='iptValue' @input="handleComInput"></com-input>
</div>
```
```js
const comInput = Vue.extend({
    template: `<input type="text" :value="value" @input="handleInnerIput"></div>`,
    props: ['value'],
    methods: {
        handleInnerIput(e) {
            this.$emit('input', e.target.value)
        }
    }
})

const vm = new Vue({
    el: "#app",
    data: {
        iptValue: '初始值'
    },
    components: {
        comInput,
    },
    methods: {
        handleComInput(val) {
            this.iptValue = val
        }
    }
})
```
这样我们就让组件`com-input`有了`value`属性和`input`事件，此时满足`v-model`有实现条件。我们就可以在组件上直接使用`v-model`绑定了

```html
 <div id="app">
    <p>显示iptValue的值：{{ iptValue }}</p>
    <!-- <input type="text" v-model="iptValue"> -->
    <!-- <com-input :value='iptValue' @input="handleComInput"></com-input> -->
    <com-input v-model="iptValue"></com-input>
</div>
```

所以说，只要我们封装的组件能提供value属性和input事件，就可以对该组件使用v-model指令。而不需要组件内部一定是表单元素。
```html
<div id="app">
    <p>显示iptValue的值：{{ iptValue }}</p>
    <!-- <input type="text" v-model="iptValue"> -->
    <!-- <com-input v-model="iptValue"></com-input> -->
    <com-div v-model='iptValue'></com-div>
</div>
```
```js
const comDiv = Vue.extend({
    // template: `<input type="text" :value="value" @input="handleInnerIput"></div>`,
    template: `<div>
        <span @click="handleClick" style="border: 1px solid #000;">点击改变值的显示 {{ value }}</span>
    </div>`,
    props: ['value'],
    methods: {
        handleClick(e) {
            this.$emit('input', this.value+1)
        }
    }
})

const vm = new Vue({
    el: "#app",
    data: {
        iptValue: 0
    },
    components: {
        comDiv,
    },
})
```

## 组件的model属性

再进一步讲，v-model指令默认情况下是选择value属性和input事件，那是否像checkbox一样让v-model绑定其它属性和对应的事件呢。
vue 2.2.0以上版本为组件增加一个`model`对象属性，用来指定v-model绑定自定义的prop和event事件。
```html
<div id="app">
    <p>显示iptValue的值：{{ iptValue }}</p>
    <!-- <input type="text" v-model="iptValue"> -->
    <com-input v-model="iptValue"></com-input>
    <com-div v-model='iptValue'></com-div>
</div>
```
```js
const comDiv = Vue.extend({
    // template: `<input type="text" :value="value" @input="handleInnerIput"></div>`,
    template: `<div>
        <span @click="handleClick" style="border: 1px solid #000;">点击改变值的显示 {{ otherName }}</span>
    </div>`,
    model: {
        prop: 'otherName',
        event: 'some-event'
    },
    props: ['otherName'],
    methods: {
        handleClick(e) {
            this.$emit('some-event', this.otherName+1)
        }
    }
})

const vm = new Vue({
    el: "#app",
    data: {
        iptValue: 0
    },
    components: {
        comDiv,
    },
})
```

## .sync 和 v-model 区别

从上面分析的组件.sync和v-model实现的原理上看，一个组件只能定义一个model属性用业指定prop和event。所以：
- v-model在组件中只能实现一个prop的双向数据绑定，并且较适合用于绑定的prop类型为基本类型。
- .sync可以在组件中指定多个prop的双向数据绑定，绑定的prop类型较宽，对象类型的绑定更方便。

比如当`v-bind.sync='obj'`时，就会把obj对象中的每一个属性 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器，实现对象中每个属性的双向绑定。











