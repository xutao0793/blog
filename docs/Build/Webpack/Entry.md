# entry

### 作用：

完成两件事：

-   确认入口模块，即告诉 webpack 从哪里开始进行打包
-   定义了导出代码块的名字 bundle name，如果只有一个入口且采用字符串形式，默认 bundle name 是 main；如果有多个入口文件，采用对象形式，生成多个打包文件以对象的 key 作为 bundle name

### 用法：

**常见用法**

```js
// webpack.config.js
// webpack基于node环境，所以采用node的commonJs模块标准，导出一个配置文件
module.exports = {
    // 单入口，采用字符串类型
    entry: './src/index.js'

    // 多入口，采用对象类型
    entry: {
        pageA: 'some path',
        pageB: 'som path',
    }
}
```

另外还可以是数组形式和函数形式，因为不常用，具体介绍查看[中文官网](http://webpack.html.cn/configuration/entry-context.html)

### 实践场景：

1、**配置 context 属性**：
入口内容的公共路径

-   context 属性为可选，默认为当前项目根路径。
-   context 属性要求使用绝对路径形式，所以可以借助 Node 的 path 模块和全局\_\_dirname 属性生成：`path.resolve(__dirname, path)`或 `path.resolve(path)` 或 `path.join(__dirname, path)`，resolve 和 join 的区别见下面。
-   当配置路径较长时，特别是多入口都重复书写路径相同的某一部分时，可以抽出相同部分配置到 context 属性中。

```js
entry: './src/script/index.js'

// 等同于
context: path.resolve(__dirname, './src/script'),
entry: './index.js'
```

```js
entry: {
    pageA: './src/script/pageA.js',
    pageB: './src/script/pageB.js',
    pageC: './src/script/pageC.js',
}

// 简化为
context: path.join(__dirname, './src/script'),
entry: {
    pageA: './pageA.js',
    pageB: './pageB.js',
    pageC: './pageC.js'
}
```

2、配置 vendor 入口，提取公共模块。
webpack 默认配置中，当一个 bundle 大于 250KB 时会认为这个打包结果过大（可在 performance 属性上修改，后面讲），发了警告。并且把所有代码打包到一个文件中，当代码更新时，页面加载都要重新下载大文件。
可以配合 webpack 内置的`optimization.splitChunks`配置（后面讲）,增加一个 vendor 入口配置，将一些第三方的公共模块代码单独打包一个 vendor.js 文件，因为第三方依赖模块代码一般不会经变动，使客户端可以有效利用本地缓存。

```js
entry: {
    app: './src/index.js',
    vendor: ['vue', 'vuex', 'vue-router'], // 用数组的形式把第三方依赖放进去，splitChunks会处理如果打包
}
```

### 延伸

**`module` `chunk` `bundle` 区别**
module 是一个独立的功能模块，chunk 是一堆有依赖关系的 module 打包的结果，bundle 是一堆 chunk 最后生成的结果

**`path.resolve` `path.join`区别**

-   path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，生成一个符合当前平台规范的路径。具体平台 Node 内部会判断，如 window 特定的路径分隔符是`\`。
-   path.resolve() 方法会把一个路径或路径片段的序列解析为符合当前平台规范的一个绝对路径。
    -   给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。
    -   如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录`__dirname`会被用上。
    -   如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。

```
一个path在node中被解析的字段(请无视以上字符串中的空格，它们只是为了布局)。在window系统平台上`/`换成`\`
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
path.parse('/home/user/dir/file.txt');
// 返回:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

[更多参考 Node 的 path 模块](https://www.nodeapp.cn/path.html)

