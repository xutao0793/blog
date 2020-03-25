# 类 class

[[toc]]

这节是对 ES6 中类相关概念的一个简要概括。内容大多是摘于以下资料：

[Typescript 入门教程 - 类](https://ts.xcatliu.com/advanced/class)<br>
[阮一峰：ECMAScript 6 入门 - Class](http://es6.ruanyifeng.com/#docs/class)

## 类 相关的概念

**发展：**

-   传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。
-   ES6 中使用 class 关键字声明类
-   TS 中除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法，如 类的修饰符

**基本概念：**

-   面向对象（OOP）的三大特性：封装、继承、多态
    -   封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
    -   继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
    -   多态（Polymorphism）：由继承产生相关的不同的类，对同一个方法可以有不同的实现，呈现多种状态。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
-   类(Class)：类是面向对象的实现，定义了一件事物的抽象特点，包含它的属性和方法等
    -   构造器（constructor)： 创建对象实例的构造函数
    -   属性（prop)：静态属性和实例属性
    -   方法（method)：静态方法和实例方法
    -   存取器（getter & setter）：用以改变属性的读取和赋值行为
    -   修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
-   对象（Object）：类的实例，通过 new 类生成
-   抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
-   接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

## 传统构造函数实现

JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

```js
function Animal(name) {
	this.name = name
}
Animal.prototype.say = function() {
	console.log(`my name is ${this.name}`)
}

let tigger = new Animal('tigger')
tigger.say()
```

## ES6 中类的用法

ES6 中引入了`class`关键字来定义一个类。`class`只是一个语法糖，绝大部分功能用 ES5 的构造函数加原型都可以实现。但`class`的写法让面向对象编程的语法更加清晰。

> ES6 一般就指最新版本的 ES，包括从 ES2015 开始到最新的 ES2019。有时也把 ES6 称为 ES next 。但 ES7 ES8 ES9 这种称呼并不准确，只能说它们是 ES6 的子版本，要知道 ES5 到 ES6 用了将近 10 年才更一个版本。但目前官方版本发布从 ES2015 开始，使用年号命名。

上面的例子使用 ES6 的`class`语法改写，如下：

```ts
class Animal {
	constructor(name) {
		this.name = name
	}
	say() {
		console.log(`my name is ${this.name}`)
	}
}

// 调用形式不变
let tigger = new Animal('tigger')
tigger.say()
```

### 构造函数 constructor

`constructor` 方法是类的默认方法，调用`new`命令创建实例时，自动调用该方法。

一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。

```js
class Animal {}
// 等同于
class Animal {
	constructor() {}
}
```

类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以作为一个函数执行。

### 属性和方法

类的属性和方法都区分静态属性和方法，和 实例属性和方法。

其中：

-   静态属性和方法是指 class 类本身的属性和方法，调用方式即 class.propName class.method。其中静态方法在 ES2015 已实现，静态属性在 ES2016 提案状态。
-   实例属性和方法是指 new class 生成实例对象的属性和方法。
-   存取器函数： 在类中使用函数定义，在实例中类似属性的调用，可以自定义属性的赋值和读取行为。

```js
class MyClass {
	// 静态属性：ES2016提案中，但在TS中可用
	static myStaticProp = 'static property'
	// 实例实例：可以不用在构造函数中使用this.instanceProp声明。直接在形状声明，更方便代码组织
	instanceProp = 'instance property'

	constructor(count) {
		// 旧方法，实例属性在构造函数中使用this声明和初始化
		// this.instanceProp = 'instance property'
		this._count = 0
	}

	// 静态方法，添加static
	static getStaticProp() {
		// 静态方法中的this指向构造函数本身，此处 this指向 MyClass，因为调用对象是类本身 MyClass.getStaticProp()
		console.log('static:', this)
		return this.myStaticProp
	}
	// 实例方法
	getInstanceProp() {
		// 实例方法中的this指向实例本身，此处 this 指向 new MyClass(),因为调用对象是实例 new MyClass().getInstanceProp()
		console.log('instance:', this)
		return this.instanceProp
	}

	// 存取器 之 取值，this 指向实例
	get count() {
		console.log('get _count')
		return this._count
	}
	// 存取器 之 存值，即贬值，this 指向实例
	set count(newValue) {
		console.log('set _count')
		this._count = newValue
	}
}

// 静态属性和方法调用
let staticProp = MyClass.myStaticProp
let getStaticProp = MyClass.getStaticProp()
console.log(staticProp, getStaticProp)

// 实例属性和方法调用
const my = new MyClass(1)
let instanceProp = my.instanceProp
let getInstanceProp = my.getInstanceProp()
console.log(instanceProp, getInstanceProp)

// 存取器调用
console.log(my.count)
my.count = 10000
console.log(my.count)
```

上述代码编译成 ES5 代码，可以看看静态属性和方法，以及存取器是怎么实例的，也就知道 this 的指向啦。

```js
var MyClass = (function() {
	function MyClass(param) {
		this.instanceProp = 'instance property'
		this._count = 0
		// this.instanceProp = 'instance property'
		this._count = param
	}

	// 静态属性和方法
	MyClass.myStaticProp = 'static property'
	MyClass.getStaticProp = function() {
		console.log('static:', this)
		return this.myStaticProp
	}

	// 实例方法挂载到对象原型上
	MyClass.prototype.getInstanceProp = function() {
		console.log('instance:', this)
		return this.instanceProp
	}

	// 存取器的定义
	Object.defineProperty(MyClass.prototype, 'count', {
		get: function() {
			console.log('get _count')
			return this._count
		},
		set: function(newValue) {
			console.log('set _count')
			this._count = newValue
		},
		enumerable: true,
		configurable: true
	})

	return MyClass
})()
```

## 类的继承

类使用`extends`关键字声明子类，

```js
class Cat extends Animal {
	constructor(name) {
		super(name) // 调用父类的 constructor(name)
		console.log(this.name)
	}
	sayHi() {
		return 'Meow, ' + super.sayHi() // 调用父类的 sayHi()
	}
}

let c = new Cat('Tom') // Tom
console.log(c.sayHi()) // Meow, My name is Tom
```

## Typescript 中类的修饰符

有 TS 中，除了以上类的基本用法外，增加五种访问修饰符（Access Modifiers），分别是 `public`、`private`、 `protected`、`readonly`、`abstract`。

其中`public` `protected` `private`类的修饰符只用于构造函数、实例属性和方法。

-   **public** 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
-   **protected** 修饰的属性或方法是受保护的，只能在当前类和子类中访问。
-   **private** 修饰的属性或方法是私有的，只能在当前声明类中使用，不能在声明类的外部访问，子类中也不能。
-   **readonly** 修饰符声明属性是只读属性
-   **abstract** 用于定义抽象类和其中的抽象方法

> ES6 的有一个新提案是为类增加私有标志，使用 # ，如 #prop

### 修饰构造函数

类的构造函数默认是`public`，可以被继承，可以使用 new 实例化。

但如果使用`protected`修饰构造函数，该类只允许被继承，不允许使用 new 实例化。

```ts
protected constructor (name) {
        this.name = name;
  }
}
class Cat extends Animal {
    constructor (name) {
        super(name);
    }
}

let cat = new Cat('tom')

let a = new Animal('Jack');
// index.ts(13,9): TS2674: Constructor of class 'Animal' is protected and only accessible within the class declaration.
```

如果使用`private`修改构造函数，该类不允许被继承也不可以被 new 实例化。

```ts
class Animal {
	public name
	private constructor(name) {
		this.name = name
	}
}
class Cat extends Animal {
	constructor(name) {
		super(name)
	}
}
// index.ts(7,19): TS2675: Cannot extend a class 'Animal'. Class constructor is marked as private.

let a = new Animal('Jack')
// index.ts(13,9): TS2673: Constructor of class 'Animal' is private and only accessible within the class declaration.
```

### 修饰类的属性和方法

默认类中的属性和方法都是`public`

```ts
class Animal {
	public name
	public constructor(param) {
		this.name = param
	}
}

// 等同于
class Animal {
	name = ''
	constructor(param) {
		this.name = param
	}
}

let a = new Animal('Jack')
console.log(a.name) // Jack
a.name = 'Tom'
console.log(a.name) // Tom
```

如果使用 `protected` 修饰的属性或方法，只能在类本身和子类中访问，在实例中不允许访问：

```ts
class Animal {
	protected name
	public constructor(name) {
		this.name = name
	}
}

class Cat extends Animal {
	constructor(name) {
		super(name)
		console.log(this.name)
	}
}

const cat = new Cat('tom')
let catName = cat.name
//error TS2445: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
```

如果使用 `private` 修饰的属性或方法，使用范围更窄，只能在类自身中访问，在子类和实例中都是不允许访问的：

```ts
class Animal {
	private name
	public constructor(name) {
		this.name = name
	}
}

class Cat extends Animal {
	constructor(name) {
		super(name)
		console.log(this.name)
		// error TS2341: Property 'name' is private and only accessible within class 'Animal'.
	}
}

const cat = new Cat('tom')
let catName = cat.name
// error TS2341: Property 'name' is private and only accessible within class 'Animal'.
```

### 只读属性

使用`readonly`修饰属性时，只允许读，不允许写

```ts
class Animal {
	// 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面。
	public readonly name
	public constructor(name) {
		this.name = name
	}
}

let a = new Animal('Jack')
console.log(a.name) // Jack
a.name = 'Tom'
// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```

### 抽象类

abstract 用于定义抽象类和其中的抽象方法。

什么是抽象类？

-   抽象类是不允许被实例化的，只能应于子类继承，通常用于定义类模板
-   抽象类中的抽象方法必须在子类实现

```ts
public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

let a = new Animal('Jack');
// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.
```

上面的例子中，我们定义了一个抽象类 Animal，并且定义了一个抽象方法 sayHi。在实例化抽象类的时候报错了。

```ts
abstract class Animal {
	public name
	public constructor(name) {
		this.name = name
	}
	public abstract sayHi()
}

class Cat extends Animal {
	public eat() {
		console.log(`${this.name} is eating.`)
	}
}

let cat = new Cat('Tom')
// index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
```

上面的例子中，我们定义了一个类 Cat 继承了抽象类 Animal，但是没有实现抽象方法 sayHi，所以编译报错了。

```ts
abstract class Animal {
	public name
	public constructor(name) {
		this.name = name
	}
	public abstract sayHi()
}

class Cat extends Animal {
	public sayHi() {
		console.log(`Meow, My name is ${this.name}`)
	}
}

let cat = new Cat('Tom')
```

上面的例子中，我们只用抽象类来继承，并在子类中实现了抽象方法 sayHi，所以编译通过了。
