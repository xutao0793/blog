# 对象 Object

ES是基于原型的面向对象体系


**对象理解** 
- 对象的解读维度：进阶的四个层次
  - 单一对象：属性类型、属性描述符、属性操作（获取、遍历、删除）、对象保护（不可扩展、封闭、冻结）
  - 作为实例工厂创建对象实例的构造函数：作为普通函数调用=>类型转换、作为创造对象的构造器使用new调用、作为对象自身的属性、模拟私有属性封装
  - 原型：实例对象原型、构造函数原型、原生原型
  - 继承：实例属性继承、原型属性继承、组合继承、construcor属性重写
  - class类语法


**认识对象**
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
  - 操作对象属性
    - 设置对象属性的可操作性：是否能枚举、是否只读、是否能删除、是否可配置
    - 获取属性
    - 遍历属性
    - 删除属性
- 保护对象
  - 阻止扩展对象
  - 封闭对象
  - 冻结对象
- 对象原型prototype
- 对象继承

**对象分类**
- 宿主对象
- 原生对象
- 全局对象 globalThis
  - 值属性：NaN Infinity undefined
  - 函数属性：parseInt() parseFloat() isNaN() isFinite()
  - 处理URI的函数属性：decodeURI() encodeURI() decodeURIComponent() encodeURIComponent()
  - 特殊的对象属性：Math / JSON / Reflect / Intl
  - 作为构造器的函数属性： 
    - 创建基本类型包装对象的构造函数：Boolean() / Number() / String() 
    - 创建引用类型实例对象的构造函数：Object() / Function() / Array() / Date() / RegExp() / Error() 
    - ES next新装的构造函数：Set() / WeakSet() / Map() / WeakMap() / Promise() / Proxy() / ArrayBuffer() / TypeArray / DataView()

参考资料
[ECMAScript5.1中文版](http://yanhaijing.com/es5/)<br>
[ECMAScript 5（w3c 中文版）](https://www.w3.org/html/ig/zh/wiki/ES5)<br>
[李战：悟透JavaScript](https://yq.aliyun.com/articles/251558?spm=5176.11065265.1996646101.searchclickresult.5eac4d56CDJMaH)<br>