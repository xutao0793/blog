# 表单的各类元素和属性

## label 标签

标签label元素主要作为表单输入元素的标题，如：
```html
<label for="name">Name:</label>
<input type="text" id="name" placeholder="please input you name">
```
规则就是 label 标签的`for`属性与它相对应的表单输入元素的id属性相关联即可，比如上例中的 input 标签的 `id` 属性，也可以是其它输入元素如textarea等。

并且写法上建议label标签与关联的元素分开写，不要将关联元素嵌套在label元素里，因为屏幕设置不理解嵌套元素之间的隐含关系，它只从for属性关联性来理解。这种最佳实践事实上也是为了更好的语义化。

```html
<!-- 即使是多标签最佳写法 -->
<div>
  <label for="username">Name: <abbr title="required">*</abbr></label>
  <input id="username" type="text" name="username">
</div>
```
<div>
  <label for="username">Name: <abbr title="required">*</abbr></label>
  <input id="username" type="text" name="username" placeholder="please input your name...">
</div>

使用label元素关联表单输入元素有几个好处：

- 更好的语义化，屏幕阅读器正确读出当前输入的标签名，如上例所示会读出诸如“Name, edit text”，如果缺少标签则会读出“Edit text blank”之类的东西，这样不知道当前编辑的是什么，对用户输入没什么帮助。
- 点击标签名即可将聚集在输入元素上，这样控件的可点击区域扩大了，用户体验上更容易聚集到输入框中。

## fieldset 和 legend

