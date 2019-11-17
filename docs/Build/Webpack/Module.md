# module

## 什么是模块？

1. 在过去很长一段时间里，js 这门语言并没有模块的这一概念。在网页的原始开发时代，js 之父（Brendan Eich)最初设计这门语言时只是将它定位一个小型的脚本语言。js 是作为 HTML 文件的辅助脚本文件，去解决一些表单交互问题，也是 js 发明的原因。因为 web 网页需求很简单，几行 js 代码嵌入 html 文件的 script 标签中即可完成需求。

```html
<script>
    document.write('蛮荒时代')
</script>
```

2. 但随着时代发展，特别是 AJAX 的出现，一个 web 应用越来越复杂，JS 的角色也越来越重，网页应用需要的脚本文件从嵌入 script 标签中，改变到需要通过 script 标签引入。

```js
;<script src="index.js" />

// index.js
document.write('古代')
```

3. 再发展下去，一个网页应用的脚本代码都不适合全部放在一个 js 文件中，按照功能逻辑我们拆分出许多.js 文件，然后在通过多个 script 标签引入。

```js
<script scr="utils.js"></script>
<script src="index.js"></script>

// utils.js
var hello = 'hello';

// index.js
document.write(hello + 'world' + '近代')
```

4. 伴随 2009 年 node 一起出现的 commonjs 模块化规范，让社区对浏览器端的 js 模块化进行不断尝试，并依次出现了浏览器端的 AMD、CMD 模块化规范。在社区对模块化概念的普及和推动下，在 ES6 的语言规范中，正式定义了 js 模块标准，即 ES Module 规范。使这门语言在诞生了 20 年之后拥有了模块标准。

```js
<script type="module" src="index.js"></script>

// utils.js
export hello = 'hello'

// index.js
import hello from 'utils.js'
document.write(hello + 'world' + '现代')
```

相比较下，多个`<script>`引入 js 文件的做法有很多缺点：

-   需要手动维护 js 文件的加载顺序。因为多个 js 文件之前通常都有依赖关系，而且是隐式，需要小心使用。
-   多个 script 标签的存在，导致需要向服务器请求次数的增多。每一个 js 文件都需要请求一次，在 http2 还没出现的时间，网络请求的成本是很高的，过多请求会严重拖慢网页加载速度。
-   在引入的每个 js 文件，顶层作用域即全局作用域，变量和函数的声明很容易造成全局作用域的污染。虽然也有很多此类的最佳实践，比如自执行函数 IFFE 模式、命名空间、jQuery 模式等方式来避免全局作用域污染问题。

而模块化则很好解决上述问题：

-   通过导入导出接口，可以清晰看到模块间的依赖关系。
-   模块可以借助工具进行打包，在页面中只需要加载合并后的资源文件，减少网络请求。
-   模块间作用域隔离，不会出现命名冲突。

## 模块标准

**CommonJs**
语法：
导出： module.exports = {} exports = {}
导入： require()
特点： 一句话总结：值的浅拷贝，运行时加载

-   模块内隐含`module`对象，记录该模块相关信息，包括 id，name，exports，loaded 等
-   模块隐式声明一个简写语句：var exports = module.exports
-   因为模块导出是一个对象，对象只有运行时生成，所以 commonJs 模块是动态运行时确定模块内容的。
-   因为模块导出是一个对象，所以导出模块是一个值的浅拷贝。（用对象的内存模式理解，基本类型是值的完全复制，引用类型是内存地址的引用）
-   该规范使用导入模块会缓存模块，只会在第一次完全运行模块内代码，第二次开始都是从缓存内取值。导入 require 时会建议一个缓存对象存放模块

使用：

-   在 Node 的默认规范，基本使用在 node 环境。
-   在浏览器环境使用需要使用工具转换，比如 Browserify

**ES Module**
语法：
导出： 默认导出：export default 或 命名导出：export 或 export {}
导入： import anyname from 'path' 或 import { } from 'path' 命名导出时名称一一对应，或使用`as`重命名
特点： 一句话总结：值的引用，编译时链接

-   ES module 默认使用严格模式。
-   是在静态编译时确定模块关系的。可以把 ES Module 理解为只是建立了两个模块间的一种连接关系或者叫值的映射关系。
-   当使用默认导出时，相当于导出对象 default，此时表现相同于 commonjs，对基本类型变量导入，在导出模块内值改变并不会表现在导入的使用模块内。引用类型可以实时更新。（也是可以用对象内存模式理解，因为基本类型赋值给变量属性时都是值的拷贝，而引用类型是内存地址的引用）
-   ES module 的映射特征在命名导出时体现最为突出，此时不管是基本类型还是引用类型值，在导入和导出模块，值都是一种映射关系，实时更新。当在导出模块内变化，导入模块使用时也是最新的值。

使用：

-   在浏览器中直接使用，需要`script`标签声明`type="module"`后才可以使用`import`引入模块。如`<srcipt type="module"></script>`
-   在 node 环境因为 commonJs 的历史原因，暂未完成支持，只有部分实验性的方法。如采用 ES module 规范的模块使用`.mjs`后缀命名，可以使用 cli 命令`node --experimental-modules module_name.mjs`

**AMD**
语法：
导出： define('module*name', ['other_module_depend'], function() {/\_return 出相关代码*/})
导入： require(['module_name'], function(module*name) {/*导入成功执行的回调\_/})
特点： 通过 AMD 形式定义的模块加载是非阻塞的，适合在浏览器中使用。但采用回调的方法和浏览器异步回调会出现回调地狱问题一样，在实现应用中越来越少，逐步被标准化的 ES module 形式替代


## 模块打包工具

模块打包工具的基本任务就是解决模块间的依赖，使其打包后的结果能运行在浏览器上。
出现过的模块管理工具包括 requirejs、browserify、webpack、parcel、rollup

前两种基本退出舞台，而 parcel、rollup 比较新、功能更为专注。webpack 优势更为突出。

-   webpck 默认支持 commonjs、AMD、ES Module。
-   webpack 有完备的代码分割（code splitting）和摇树优化（tree shaking）功能
-   webpack 可以处理各类资源，不只 js 文件，还包括网页开发中的 HTML 模板、CSS 预处理器语法、图片、字体等。


## 参考链接

[浅谈 JavaScript 模块化](https://www.cnblogs.com/Leo_wl/p/4869090.html)
[前端模块简史](https://www.cnblogs.com/Leo_wl/p/4869090.html)
[Module 加载实现，阮一峰 ES6 入门](http://es6.ruanyifeng.com/#docs/module-loader#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8A%A0%E8%BD%BD)
[ES modules 基本用法、模块继承、跨模块常量、import()](https://www.cnblogs.com/ChenChunChang/p/8296373.html)

