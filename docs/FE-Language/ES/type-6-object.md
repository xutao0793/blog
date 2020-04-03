# Object 类型

[[toc]]

除了基础类型，其它都归属于对象类型。JS语言和宿主的基础设施由对象来提供，并且 JavaScript 程序即是一系列互相通讯的对象集合。

在基础的Object对象的基础上，衍生了很多实现特定功能的对象，包含语言规范定义的内置对象和语言宿主定义的对象。

## 对象分类

- 全局对象 globalThis
  - 值属性：NaN Infinity undefined
  - 函数属性：parseInt() parseFloat() isNaN() isFinite()
  - 处理URI的函数属性：decodeURI() encodeURI() decodeURIComponent() encodeURIComponent()
  - 特殊的对象属性：Math / JSON / Reflect / Intl
  - 作为构造器的函数属性： 
    - 创建基本类型包装对象的构造函数：Boolean() / Number() / String() 
    - 创建引用类型实例对象的构造函数：Object() / Function() / Array() / Date() / RegExp() / Error() 
    - ES next新增的构造函数：Set() / WeakSet() / Map() / WeakMap() / Promise() / Proxy() / ArrayBuffer() / TypeArray / DataView()
- 宿主对象
  - Window全局对象
  - DOM类型的对象
  - BOM类型的对象等。

## 理解对象

对象的解读维度：进阶的四个层次
- 单一对象：属性类型、属性描述符、属性操作（获取、遍历、删除）、对象保护（不可扩展、封闭、冻结）
- 作为实例工厂创建对象实例的构造函数：作为普通函数调用=>类型转换、作为创造对象的构造器使用new调用、作为对象自身的属性、模拟私有属性封装
- 原型和原型链：实例对象原型、构造函数原型、原生原型、纯对象
- 继承：实例属性继承、原型属性继承、组合继承、construcor属性重写
- class类语法


## 深入对象
- 创建对象
  - 字面量形式创建对象
  - 通过构造函数创建对象
  - 通过Object.create()创建对象
- 对象属性
  - 数据属性
  - 访问器属性
  - 内部属性
  - 属性的特性（属性描述符）
  - 定义对象属性的方式
    - 点.
    - 中括号[]
    - Object.defineProperty() / Object.defineProperties()
- 对象操作
  - 操作对象属性
    - 设置对象属性的可操作性：是否能枚举、是否只读、是否能删除、是否可配置
    - 获取属性
    - 遍历属性
    - 删除属性
  - 操作整个对象
    - 阻止扩展对象
    - 封闭对象
    - 冻结对象

## 基于原型的面向对象
- 原型与原型对象
  - 对象原型`[[prototype]]`
  - 构造函数原型`F.prototype`
  - 原生原型`Object.prototype`
  - 纯对象`Object.create(null)`
- 构造函数实现面向对象
- class实现面向对象

### 面向对象核心概念

> OOP: Object Oriented Programming

- 对象： 对象是最核心概念，在JS中一切实现都依赖于对象
- 类：   类抽象了对象的共同特征
- 封装： 封装实现了数据隐藏和数据访问权限的设置，比如私有属性的保护。
- 继承： 继承非常优雅地实现了代码的重用。
- 多态： 通过函数的重载或方法的覆写实现自定义行为
- 聚合： 功能实现的最小化

关于ES中对象和面向对象的详细总结见[面向对象](/ES/oop-1-index)

## 参考链接

关于对象类型的值如何在内存中存储，比较底层，涉及JS引擎的实现，可以参考这两篇文章

[V8 Object 内存结构与属性访问详解](https://zhuanlan.zhihu.com/p/24982678)<br>
[JS 类型对象的内存布局总结](https://www.anquanke.com/post/id/185339)<br>
[再谈js对象数据结构底层实现原理-object array map set](https://www.cnblogs.com/zhoulujun/p/10881639.html)<br>
[探究JS V8引擎下的“数组”底层实现](https://mp.weixin.qq.com/s/np9Yoo02pEv9n_LCusZn3Q)<br>
[ECMAScript5.1中文版](http://yanhaijing.com/es5/)<br>
[ECMAScript 5（w3c 中文版）](https://www.w3.org/html/ig/zh/wiki/ES5)<br>
[李战：悟透JavaScript](https://yq.aliyun.com/articles/251558?spm=5176.11065265.1996646101.searchclickresult.5eac4d56CDJMaH)<br>

## 对象API

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
