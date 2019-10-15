# 类型注解

我们先回顾下 ES 中七种数据类型分类：

-   基本数据类型：`Null` `Undefined` `Boolean` `Number` `String`，以及 ES6 新增的`symbol`
-   引用数据类型：`Object` (`Array` `Function` )

那我们看看在`TS`中如何对这些数据类型进行类型注解的。

## 基本类型

### Null 和 Undefined

这个类型是 js 中也是比较特殊的。它们类型都具有唯一值。即`Null`类型的数据只可能被赋于`null`，`Undefined`类型值只可能被赋于`nudefined`

```js
let n = null
let u = undefined
```

在 TypeScript 中，也是使用 null 和 undefined 来定义这两个原始数据类型

```ts
let n: null = null
let u: undefined = undefined
```

此时，如果我们对已进行类型注解的变量赋值其它就会报错

```ts
// type.ts
let n: null = null
n = 1

let u: undefined = undefined
u = '1'
```

上面代码如果用 js 写是没有问题的。但是如果采用 ts 写，在书写时编译器就会提示错误。如果继续使用`tsc type.ts`编译就会报如下错误提醒我们。

```
type.ts:4:1 - error TS2322: Type '1' is not assignable to type 'null'.

4 n1 = 1
  ~~

type.ts:7:1 - error TS2322: Type '"1"' is not assignable to type 'undefined'.

7 u1 = '1'
  ~~

Found 2 errors.

C:\Users\Administrator\Desktop\ts-demo\example>
```

这就是`TS`类型注解的好处，配合编译器，在代码书写时或者代码编码时就提示潜在错误，不在等到程序运行时才发现错误。

> TS 编译会提示错误，但不是中断编译，仍然会将代码生成到.js 文件中。如果要阻止此行为，可要在添加配置选择`tsc type.ts --noEmitOnError`。项目中可以在 tsconfig.json 中配置。

### Boolean 布尔值

布尔值是最基础的数据类型，在 Typescript 中，使用 `boolean` 定义布尔值类型：

```ts
let isDone: boolean = false
```

### Number 数值

在 Typescript 中，使用 `number` 定义数值类型

```ts
let decimal_literal: number = 20
let binary_literal: number = 0b10100 // 二进制表示 20
let octal_literal: number = 0o24 // 八进制表示 20
let hexadecimal_literal: number = 0x14 // 十六进制表示 20
let notANumber: number = NaN
let infinityNumber: number = Infinity
```

### String 字符串

在 Typescript 中，使用 `string` 定义数值类型

```ts
let myName: string = 'Tom'
let myAge: number = 25
// ES6 模板字符串
let sentence: string = `Hello, my name is ${myName}, I'm is ${myAge} year old`
```

### Symbol

自 ES6 起，Symbol 成为了一种新的原生类型，表示独一无二的值，就像 Number 和 String 一样，属性于基本类型。

但在使用上有区别：

```js
let num = 1 // 在之前基本类型中，变量都直接采用字面量的形式赋值
let sym = Symbol()
// Symbol类型值必须由Symbol()生成。并且每次调用Symbol()函数生成的值都是不相等的，即使传入函数参数一样。
// Symbol类型值必须由Symbol()生成。所以也无需像其它基本类型一样使用：进行类型注解。
```

> Symbol 类型的学习可以参考阮一峰老师的[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/symbol)

## 引用类型
