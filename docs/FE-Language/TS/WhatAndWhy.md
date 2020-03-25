# 前言

[[toc]]

本文主要参考以下文档内容，特别是最一个文档教程借鉴最多，特别感谢[xcatliu](https://github.com/xcatliu/)。

[Typescript 官网-英文](http://www.typescriptlang.org/)

[Typescript 官网-中文](https://www.tslang.cn/index.html)

[Typescript Handbook（中文版）](https://zhongsp.gitbooks.io/typescript-handbook/content/index.html)

[Typescript 入门教程](https://ts.xcatliu.com/)

正如[Typescript 入门教程](https://ts.xcatliu.com/)作者[xcatliu](https://github.com/xcatliu/)所说的一样，官网教程各个知识点间穿插太多，不便于初学者循序渐进的理解，经常需要多次阅读才能将知识点串联起来。
看到[xcatliu](https://github.com/xcatliu/)的这个教程简直让我眼前一亮，这不正是我正想要梳理的入门路径嘛。强烈推荐大家去阅读它的教程，半小时入门`Typescript`。

但我又为什么还要自己再写一遍类似教程呢？
一来是[xcatliu](https://github.com/xcatliu/)把内容分为基础和进阶两部分。不太符合我构建的知识脉路，比如我更愿意把数组和元组放在一起，但它明了的内容讲解和简洁的行文是我需要借鉴的。
另一个，自己看了，写了总归还是要按自己的脉路作个总结，以便日后回顾方便。

下面还是按照惯例来介绍`Typescript`

-   What is it
-   Why do we need it
-   How to use it

# What is Typescript

`Typescript`是 Microsoft 开源的一门现代`Javascript`语言，是`JavaScript`的超集。因为它在`Javascript`语言的基础上，提供了语言的类型系统，以及对 ES6 的支持更好。第一版本发布于 2012 年 10 月，发展势头迅猛。

`Typescript`书写的代码最终还是要经`Typescript`本身提供的编译工具编译成纯正的`Jvascript`代码的。这样任何原来可以运行`Javascript`代码的环境也就可以运行`Typescript`。

```js
--------------         ---------------         --------------
| Typescript | ------> | TS compiler | ------> | Javascript |
--------------         ---------------         --------------
```

想想`TS` `JS` `ES`三者的关系？

> Javascript 语言包括三部分内容：ECMAScript 、 DOM 、 BOM。所以 js 运行主要在浏览器端，鉴于浏览器厂商对 ES 新语法实现的速度，所以说 TS 对 ES 新语法的支持更快更好。
> Nodejs 是提供了 ES 在服务器端运行的宿主环境，浏览器是 ES 在客户端运行的宿主环境。

# Why do we need it

前面我们说了，`Typescript`带来的最重要的功能是为`Javascript`提供了类型系统，那这个类型系统是什么（what)，解决什么问题或者说带来什么好处吸引我们去用它（Why)?

我们知道`JS`是一门弱类型的语言，变量声明定义之后，也可以重新赋值其它类型的值。

```js
let something = 'NBA' // 赋值字符串类型
something = 11 // 重新赋值为数值类型
```

在实际项目中这样就会出现很多未知的错误，特别是团队中多人开发过程中，最突出的就是函数使用时传参类型不一致导致运行时报错。
那么用`TS`写代码，需要显性声明了每个变量和方法的类型，即使未显性声明，`TS`编译时也会自动做出**类型推断**

所以`TS`的类型系统能带来可见的好处是增加了代码的可读性和可维护性：

-   在代码编译阶段就发现大部分错误，这总比在运行时候出错好
-   现在常规主流的 IDE 都支持 TS，所以书写代码时的语法提示、代码补全、接口提示、跳转到定义、重构等功能非常方便提高效率。
-   类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了。

更多的优点和缺点可以查看这里[链接](https://ts.xcatliu.com/introduction/what-is-typescript)

所以说`Typescript`非常适合大型团队项目的协作开发。

# How to use it

下一篇，正式进入如何使用`Typescript`。
