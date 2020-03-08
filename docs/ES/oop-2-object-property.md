# 对象属性及其操作

[[toc]]

对象的属性可以分为3种：

1. 属性（property, 称为数据属性）

对象中最普遍的属性形式。即键值对（key-value)的形式，可以以字符串或Symbol类型作为键。常称为方法的函数也只是作为值value存在。

2. 访问器（Accessor, 称为访问器属性）

访问器类似读、写属性的特殊方法。常称为`getter`和`setter`

1. 内部属性（Internal slot)

只存在于ES语言规范中，通常将内部属性命名用双层中括号来表示。它们不能用于JS开发中直接访问。但现代JS语言也实现了方法来间接访问其值。

最典型的例子是对象的原型`[[prototype]]`、`__proto__`、`Object.getPrototypeOf()`的演进。

## 数据属性 property

平常在使用 ES 定义并初始化一个简单对象时，我们几乎都是以下这两种形式：

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

## 访问器属性 Accessor

如果我们对某个属性有特殊的要求，比如赋值时需要进行验证时，可以采用访问器属性。
```js
let kid = {
  name: 'tom',
  _age: 8,
  get age() {
    return this._age
  },
  set age(val) {
    if (val > 18) {
      console.log('The kid age setting should be less than 18' )
    } else {
      this._age = val
    }
  }
}

console.log(kid.age)  // 8
kid.age = 20         // 'The kid age setting should be less than 18'
kid.age = 10
console.log(kid.age) // 10
```
像上面这种，在函数前直接添加`get` `set` 标识符也可以为对象定义属性。使用时跟上面对象调用方法完全一样。

## 内部属性 Internal slot

内部属性只存在于ES语言规范中，通常将内部属性命名用双层中括号来表示。它们不能用于JS开发中直接访问。但现代JS语言也实现了方法来间接访问其值。

最典型的例子是对象的原型`[[prototype]]`、`__proto__`、`Object.getPrototypeOf()`的演进。

JS中每个对象都有一个内部属性`[[prototype]]`，保持着它原型对象的引用。在早期JS中我们可以通过引用对象的构造函数的prototype属性来曲线获得实例对象的原型。
```js
[].constructor.prototype === Array.prototype
```
但这种引用很奇怪，相当于透过构造器绕个弯，并且由于ES语言对象的动态性，构造器的prototype是可以被重写的，所以这种方式并保证准确。所以最早mozilla在firefox浏览器中提供了自己实现的私有属性 `__proto__`来获得`[[prototype]]`同样的引用。

```js
[].__proto__ === Array.prototype
```

后面其它浏览器厂商也相继实现了`__proto__`私有属性，但它并不是ES语言规范中的一部分，但鉴于其应用的普遍性，在ES6最新的规范中，语言标准实现了`Object.getPrototypeOf()`方法来获取对象的原型对象。

```js
Object.getPrototypeOf([]) === Array.prototype
```

## Object.definePorperty 定义属性

语法参考：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

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
### 属性描述符

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

### 内部属性缺省时的默认值

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

访问器属性的定义也同上面一样。

## Object.defineProperties(obj,props)批量定义属性

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

## 属性的操作

