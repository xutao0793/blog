# 对象属性的理解 `Object.defineProperty`

## 前言

今天在学`Vue`响应式原理，查找`Object.defineProperty()`方法资料时，才发现以前对 ES 对象属性的理解太片面啦。重新阅读相关资料，真是醍醐灌顶啊。

## 对象属性的三种分类

平常在使用 ES 定义并初始化一个对象时，我们几乎 100%都是以下这两种形式：

```js
// 第一种：先定义无属性的空对象{}，然后根据需要使用打点或中括号的形式添加属性
let o1 = {}
o1.name = 'Tom'
o1['age'] = 18

// 第二种: 字面量形式
let o2 = {
	name: 'Tom',
	age: 18
}
```

我们知道，给对象属性赋值的类型可以是任何 ES 语法规范中存在的数据类型，其中特殊的是，如果属性值的类型是函数，会换个叫法，称该函数为对象的方法。

```js
let person = {
	name: 'Tom', // string 类型
	age: 18, // number 类型
	isGraduate: true, // boolean
	job: null, // null
	girlfriend: undefined, // undefined
	skills: ['coding'], // array
	study: function(arg) {
		// 函数属性值称为方法
		console.log('学习方法')
	}
}
```

但是，实际上对象还有一种属性写法，像下面这样

```js
let obj = {
	get play() {
		console.log('运动')
	},
	set play(sprot) {
		console.log(sport + '运动')
	}
}
```

像上面这种，在函数前直接添加`get` `set` 标识符也可以为对象定义属性。使用时跟上面对象调用方法完全一样。虽然定义时 play 是函数形式，但对象调用时不需要加括号。

```js
obj.play // 输出 运动
obj.play = 'baskball'

// 这样也可以
obj['play']
obj['play'] = 'pingpong'
```

像这样给对象使用`get`定义属性，常常叫做给对象添加`getter`方法；使用`set`定义属性，常常叫做给对象添加`setter`方法，毕竟两者属性值都是一个函数，所以称方法。

所以下面总结下，对象的属性形式有以下几种：

-   数据属性： 拥有一个确定的值的属性。这也是最常见的和常写的属性定义形式
-   访问器属性： 通过 `getter` 和 `setter` 进行读取和赋值的属性
-   内部属性： 由 JavaScript 引擎内部使用的属性，一般不能在对象外部直接访问。不过现代 js 语法中添加很多原生对象方法来间接的读取和设置。

> 内部属性常用双中括号表示，如 `[[Prototype]]`,可以通过 `Object.getPrototypeOf()`获取其值，通过`Object.setPropertyOf(val)`设置其值。

## Object.definePorperty 定义属性

```js
// 定义数据属性
let o2 = {
	name: 'Tom'
}

// 定义访问器属性
let obj = {
	get play() {
		console.log('运动')
	},
	set play(sprot) {
		console.log(sport + '运动')
	}
}
```

上面的代码分别为对象定义数据属性和访问器属性，这两种写法，实际上可以理解为都是写法上的一种语法糖。在底层，都可以用`Object.defineProperty()`这个原生对象 API 来定义。

所以先看下这个 API 的语法，再用它实现上面两个对象对应两种属性类型的定义。

详细语法解释请参见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

```js
/**
 * 如果目标对象target_obj本身已经存在prop属性，那么修改该对象的现有属性， 并返回这个对象。
 * 如果目标对象上没有这个属性，那么会直接在目标对象上定义这个新属性，并返回这个对象。
 *
 * @params {Object} target_obj 目标对象
 * @params {String} prop 要定义或修改的属性名称
 * @params {Object} descriptor 将要被定义或修改的属性描述符
 * @return {Ojbect} 返回属性定义或修改后的目标对象
 */
Object.defineProperty(target_obj, prop, descriptor)
```

这里需要理解的一个概念就是这个属性描述符`descriptor`。

## `descriptor` 属性描述符

简单理解它就是对目标对象当前这个属性的一组描述，比如这个属性的值 value 是什么，这个属性能不能删除，能不能改写这个属性的值，能不能对这个属性做一些其它配置等等一系列行为的规则说明。

那属性描述符是怎么定义这个属性的一系列规则的呢？实际上 `descriptor` 也是一个对象，对象内部不同的属性定义了不同的行为规则。比如上面两个对象`o2` `obj`对象的描述符是下面这个样子的：

```js
// o2的描述符对象descriptor
descriptor = {
	value: 'Tom',
	writable: true,
	enumerable: true,
	configurable: true
}
```

```js
// obj的描述符对象descriptor
descriptor = {
    get: [Function: get name],
    set: [Function: set name],
    enumerable: true,
    configurable: true
}
```

上面总结过对象属性可以是数据属性，或者访问器属性。所以相对应的数据属性的描述符 和 访问器属性的描述符在结构和 key 键是有点区别的。

两者描述符对象中相同的属性是`enumerable` `configurable`，然后数据属性描述对象对象不同的属性是`value` `writable`，访问器属性描述符不同的属性是`get` `set`。

实际上这些描述符对象的属性也被称为目标对象的内部属性，通过加双中括号表示。当然一个对象的内部属性可不仅仅只有这几个哦。

前面我们也说了描述符对象是用来约定目标对象属性的。所以这些内部属性具体描述了什么规则呢？

```js
[[value]]: 任意数据类型，用来表示具有数据属性的目标对象的属性的值
[[writable]]: 布尔值，用来表示具有数据属性的目标对象的属性的值能不能被重写，即能不能`=`等号重新进行赋值操作

[[enumerable]]： 布尔值，数据属性和访问器属性都有，用来表示该属性是否可以被枚举，即在`for-of`或`for in`遍历中能否获取到该属性
[[configurable]]: 布尔值，数据属性和访问器属性都有，用于表示该属性是否可以配置，比如能否使用`delete`操作符删除该属性，或能否重新使用`defineProperty()`方法重新定义属性描述符对象等。

[[get]]: 一个函数类型，用来配置访问器属性`getter`方法
[[set]]: 一个函数类型，用来配置访问器属性`setter`方法
```

理解了上面的这些，我们在回到最初那个问题，对`o1` `obj`对象，用`Object.defineProperty()`来重新定义，看下面怎么写：

```js
// 定义数据属性
let o2 = {}
o2.name = 'Tom'

// 使用defineProperty方法重写
let o2 = {}
Object.defineProperty(o2, 'name', {
	value: 'Tom', // 定义值
	wriable: true, // 可以重新赋值
	enumberable: true, // 可以用于循环遍历
	configurable: true // 可以使用delete删除操作
})

console.log(o2.name) // Tom
delete o2.name
console.log(o2.name) // undefined
```

```js
// 访问器属性
let obj = {
	get play() {
		console.log('运动')
	},
	set play(sprot) {
		console.log(sport + '运动')
	}
}

// 使用defineProperty方法重写
let obj = {}
Object.defineProperty(obj, 'play', {
	enumberable: true,
	configurable: true,
	get: function() {
		console.log('运动')
	},
	set: function(sport) {
		console.log(sport + '运动')
	}
})
```

所有`Vue 2`的原理就是把我们直接在`data={}`对象上定义的数据属性，全部重写改成了访问器属性，以实现数据劫持，进而实现数据响应式。

## 内部属性缺省时的默认值

以字面量的形式定义对象的属性,对象属性描述符的属性值都默认为 true

```js
let o1 = {}
o1.name = 'Tom'

let o2 = {
	name: 'Tom'
}
// 以这种形式定义的对象,内部属性的值都默认为true
//  [[writable]]:true   [[configurable]]:true   [[enumerable]]:true
// 相当于以下形式
Object.defineProperty(o1, 'name', {
	value: 'Tom',
	writable: true,
	enumerable: true,
	configurable: true
})
```

但是如果使用`Object.defineProperty()`定义时,缺省的描述符对象属性值默认为`false`

```js
let o3 = {}
Object.defineProperty(o3, 'name', {
	value: 'Tom'
})
// 此时o3.name属性是不可配置/不可重写/不可检举的.因为内部属性值都默认false了.
// 相当以下形式
Object.defineProperty(o3, 'name', {
	value: 'Tom',
	writable: false,
	enumerable: false,
	configurable: false
})
```

访问器属性的定义也同上面一样.

## 对象操作属性的相关方法

对比下`Object.defineProperty(obj,prop)` 和 `Object.defineProperties(obj,props)`写法

-   `Object.defineProperty(obj,prop)`: 一次定义一个属性
-   `Object.defineProperties(obj,props)`: 可以一次定义多少属性

```js
let p1 = {}
Object.defineProperty(p1, 'name', {
	value: 'tom',
	writable: true,
	enumerable: true,
	configurable: true
})
console.log(p1.name)
console.log(Object.getOwnPropertyDescriptor(p1, 'name'))

// 输出
/**
 tom
{ value: 'tom',
  writable: true,
  enumerable: true,
  configurable: true }

*/
```

```js
let p2 = {}
Object.defineProperties(p2, {
	name: {
		value: 'tom',
		writable: true,
		enumerable: true,
		configurable: true
	},
	age: {
		value: 18,
		writable: true,
		enumerable: true,
		configurable: true
	}
})
console.log(p2.name)
console.log(p2.age)
console.log(Object.getOwnPropertyDescriptors(p2))

// 输出
/**
 tom
18
{ name:
   { value: 'tom',
     writable: true,
     enumerable: true,
     configurable: true },
  age:
   { value: 18,
     writable: true,
     enumerable: true,
     configurable: true } }


*/
```

| 方法                                        | 作用                                                          | 备注                                                                                                                                                                |
| ------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Object.defineProperty(obj,prop)`           | 定义属性                                                      |
| `Object.defineProperties(obj,props)`        | 批量定义属性                                                  | `props`是对象形式                                                                                                                                                   |
| `Object.getOwnPropertyDescriptor(obj,prop)` | 获取对象指定属性的描述符                                      |
| `Object.getOwnPropertyDescriptors()`        | 获取对象所有属性的描述符                                      | 返回值是嵌套对象                                                                                                                                                    |
| `Object.preventExtensions(obj)`             | 对象不可扩展,即对象自身不能添加属性了,                        | 但属性仍可以删除,对象原型上可以添加属性                                                                                                                             |
| `Object.isExtensible(obj)`                  | 判断对象是否可添加属性                                        |
| `Object.seal()`                             | 封闭对象,即对象变得不可扩展且不可配置                         | 实际上会在一个现有对象上调用 object.preventExtensions(),并且把对象所有现有属性标记为`[[configurable]] = false`.密封对象主要表现为不能添加属性,原有属性也不可删除了. |
| `Object.isSealed(obj)`                      | 判断对象是否是封闭的                                          |
| `Object.freeze(obj)`                        | 冻结对象                                                      | 即`[[writable]]` `[[configurable]]`为`false`,表现为属性值不能修改,删除,不能添加属性,不能重写属性描述符等,但原有属性可以检举遍历,但不能修改`[[enumerable]]`的值了    |
| `Object.isFrozen(obj)`                      | 判断对象是否冻结的                                            |
| `Object.prototype.hasOwnProperty(obj,prop)` | 判断该属性是否是对象自身属性                                  | 常用于区别属性是对象的还是对象原型的                                                                                                                                |
| **属性与属性值相关(key-value)**             |                                                               |
| `Object.getOwnPropertyNames(obj)`           | 自身可枚举和不可枚举属性，但不包括 Symbol 类型的属性          | 返回值是属性的数组                                                                                                                                                  |
| `Object.getOwnPropertySymbols(obj)`         | 自身 Symbol 类型的属性                                        | Symbol 类型属性的数组                                                                                                                                               |
| `Object.keys(obj)`                          | 自身可枚举的属性和 symbol 类型属性,不包括不可枚举的属性       | 区别于 for-in 可遍历对象原型上的属性                                                                                                                                |
| `Object.values(obj)`                        | 自身可枚举的属性值和 symbol 类型属性值,不包括不可枚举的属性值 |
| `Object.entries(obj)`                       | 自身属性以[k,v]嵌套数组返回                                   |
| `Object.assign(target_obj, ...source)`      | 自身属性合并,同名的会被覆盖                                   | 返回全并后目标对象                                                                                                                                                  |
| `Object.is(val1,val2)`                      | 判断两个值是否相等                                            | 不进行隐式转换,深度相等, `==`会做隐式转换后才比较, `===`会对`+0`等于`-0`, `NaN`不等于`NaN`                                                                          |
| **原型 prototype 操作相关**                 |                                                               |
| `Object.create(proto)`                      | 创建一个新对象,以`proto`作为它的原型对象                      |
| `Object.getPrototypeOf(obj)`                | 返回给定对象的原型对象                                        |
| `Object.setPrototypeOf(obj, prototype)`     | 将`obj`的原型对象设置为`prototype`                            |
| `Object.prototype.isPrototypeOf(object)`    | 检查对象`object`是否存在于另一个对象的原型链上。              | `prototypeObj.isPrototypeOf(object)`                                                                                                                                |
