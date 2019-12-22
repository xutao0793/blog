# DOM

[[toc]]

- DOM 简介
- DOM core
- DOM HTML
- DOM Event

## DOM 简介

DOM：Document Object Model（文档对象模型）。

将用于页面显示的标记语言（XML/HTML/SVG等）进行建模，用一颗逻辑树的对象形式来表示文档，文档的每一个标记都是一个节点，每一个节点都是一个对象结构。通过建模的对象来提供操作页面的API接口给编程语言，让开发者通过DOM提供的API获得控制页面内容和结构的主动权。

DOM是一种与平台和编程语言无关的应用程序接口(API)，不仅可以被javascript语言调用，还可以被其它语言（如Python等）调用。

DOM Core 核心定义了基础了Node对象，然后不同的文档类型（如XML/HTML/SVG）基于Node对象进行扩展，实现了针对自身文档特征的对象和方法，如HTML文档实现的HTMLElement根对象，这个对象继承了Node对象属性和方法，也拥有自身的属性和方法。还有针对SVG（可伸缩矢量标记语言） / MathML(数学标识语言) / SML(同步多媒体集成语言) / XUL （XML用户界面语言）等标记语言的DOM实现。

## DOM 发展

在早期，微软的Internet Explorer 4和网景公司的Netscape Navigator 4 浏览器上分别实现了DHMTL（Dynamic HTML 动态HTML)技术，允许开发人员无需重新加载网页，就可以使用脚本语言修改页面外观和内容。但同一种技术在两家公司的实现方式相差很大，同样这变成了新一个浏览器兼容性的问题，使得开发者无法通过一个HTML页面能运行在当时两个主流的浏览器中。负责web标准制定的组织W3C开始着手制定统一标准。

> DOM统一标准之前这段时间，常称为DOM 0级标准，实际上不存在的，只是依据后面DOM级别划分的时间点作为参照一种普遍说法而已，并不是真的标准。

### DOM 1级
1998年10月，W3C组织发布了DOM的首个标准规范。DOM 1级由两个模块组成：

- DOM Core 和 DOM HTML。其中DOM Core定义了映射文档的基础结构，其中最主要的是根节点根对象Node对象和文档节点类型。
- DOM HTML则在DOM Core基础上加以扩展，添加了针对HTML的HTMLElement对象，以及各类元素对象。

### DOM 2级

DOM 2级增加了新的模块，其中最主要的针对元素样式（DOM Style）的接口CSSStyleSheet，以及定义了元素事件（DOM Event）及相关接口，如addEventLister()方法。

### DOM 3级

DOM 3级继续新增了加载和保存文档的方法的 DOM Load and Save模块，以及DOM验证（DOM Validation）模块。对DOM Core对象的扩展了一些针对XML新特性的扩展。

这里我们主要关注和学习的是DOM Core核心中的Node对象、针对HTML文档的HTMLElement对象、针对HTML文档样式的DOM Style模块和针对元素事件的DOM Event模块。掌握其对象的属性和方法，以及扩展的相关子对象的属性和方法。

## DOM Core 核心

DOM建模是将任何HTML或XML描绘的页面绘制成一个由多层节点构成的树状结构，依据文档中不同类型的内容划分为不同的节点类型。

这里依据HTML类型文档为例，以下面这段HTML代码生成DOM树状结构：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
  </head>
  <body class="test_class">
    <!-- 这是一段注释 -->
    <p id="test_id">Hello World</p>
  </body>
</html>
```
使用[Live DOM Viewer](https://software.hixie.ch/utilities/js/live-dom-viewer/)展示的DOM树结构如下：

![node.png](../images/node.png)

> HTML文档中换行符与空白符也是文本字符，也会生成节点树节点。

