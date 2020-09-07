# 模板编译2：parse 解析器

HTML 模板的解析逻辑就是循环解析 template 字符串，用正则做各种类型片段的匹配，对于不同情况分别进行不同的处理，直到整个 template 被解析完毕。 在匹配的过程中会利用 advance 函数不断前进整个模板字符串，直到字符串末尾。
```js
function advance (n) {
  index += n
  html = html.substring(n)
}
```
需要被截取处理的片段分多种类型：
- 开始标签，如 `<div>`; 开始标签中还要解析属性数据，如`<div id='test' @click='onClick'>`等
- 结束标签，如`</div>`
- 注释，如 `<!-- 这是HTML注释-->`
- DOCTYPE声明，如 `<!DOCTYPE HTML>`
- 条件注释，如 `<!--[if !IE]>-->条件注释<!--<![endif]-->`
- 文本，包括纯文本和变量文本，如`线文本`, `变量文本{{message}}`

这些不同的类型片段，都由相应的正则表达式匹配：

```js
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
const comment = /^<!\--/
const conditionalComment = /^<!\[/
```
然后匹配成功，都有对应的处理函数处理生成对应的 AST 结构：

```js
  parseHTML(template, {
    // 省略代码...
    start: function start (tag, attrs, unary, start$1, end) {　// 处理开始标签
      var element = createASTElement(tag, attrs, currentParent);
      processRawAttrs(element)
      processFor(element);
      processIf(element);
      processOnce(element);
    },
    end: function end (tag, start, end$1) {...}, //处理结束标签
    chars: function chars (text, start, end) {...}, // 处理文本片段
    comment: function comment (text, start, end) {...}); // 处理注释处理
  return root
}
````
DOM 是有层级嵌套关系的，所以对应生成的 AST 也是有嵌套结构，通过内部维护一个数组堆栈来解决，用栈来记录层级关系，这个层级关系可以理解为DOM的深度。

HTML 解析器总是从前往后解析，每当遇到开始标签，使用 start 函数处理后，把当前构建的节点推入栈中；当遇到结束标签，使用 end 函数处理，就从栈中弹出一个节点。这样保证每次处理 sart 函数时，栈中最后一个节点就是当前正在处理节点的父节点。

**总体流程**
- 首先判断模板第一个字符是不是 `<`：
- 如果是，再进一步以各种类型的正则来匹配片段特征，进行相应的处理。因为以此开头类型太多了，比如开始标签、结束标签、注释等。
- 如果不是以 `<` 开始，那一定是文本片段

![vue-source-code-compile-parse.png](./image/vue-source-complie-parse.png)

