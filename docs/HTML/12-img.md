# 图片元素 img

[[toc]]

- img 基本语法: src alt title
- figure / figcaption元素
- srcset / sizes 特性
- picture元素
- 图片热点区域元素 map area

[MDN 图像嵌入元素img](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)<br>
[MDN HTML中的图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML)<br>
[MDN 响应式图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)<br>

## 基本语法

HTML中使用`<img>`元素来把图片放到网页上。

它是一个空元素（它不需要包含文本内容或闭合标签），最少只需要一个 src （一般读作其全称 source）来使其生效。

src 属性包含了指向我们想要引入的图片的路径，可以是相对路径或绝对URL。

**特性：**

- src: 图像URL地址，必须的特性
- alt: 图像替代文本，供探索引擎抓取使用，或者图像加载失败时显示
- height: 图像高度
- width: 图像宽度
- srcset: 
- sizes: 用来设置图片的尺寸零界点，主要跟响应式布局打交道。属性格式：媒体查询 宽度描述(支持px)，多条规则用逗号分隔，必须跟srcset一起使用
- usemap: 为图像定义客户端图像映射 `usemap=#<map>`,使用map元素的name或id属性"
- ismap: 为图像定义为服务器端图像映射
- crossorigin: 使得在canvas中使用图片资源时可以突破跨越限制

```html
<!-- 基本用法 -->
<img src="https://developer.mozilla.org/static/img/favicon144.png">
```
## 添加图片备选文本 alt

## 添加图片描述文本 title

## 设定图片宽高 width height

## 关联图片和文字描述 figure figcaption

## 响应式图片之加载不同分辨率尺寸的图片 srcset sizes

## 响应式图片之加载不同的图片 picture source

## 映射图片热点区域 map area

## 图片跨域设置 crossorigin
