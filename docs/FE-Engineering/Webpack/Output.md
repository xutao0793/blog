# output

output 配置指示了 webpack 如何去输出、以及在哪里输出你的打包文件，这里打包文件不仅仅指最后的 bundle.js，还包括隐含的一些静态资源文件输出。（bundle、asset 和其他你所打包或使用 webpack 载入的任何内容）。

output 配置包含一堆选项，我们只需要了解几个常用的选项，基本就能覆盖大部分场景了。

```js
module.exports = {
    output: {
        // 指定资源文件输出的位置，webpack 4.0.0以上版本默认输出目录为dist，也可以通过path属性指定，path同entry中context一样必须绝对路径
        path: path.resolve(__dirname, 'bundle')
        // 指定输出文件名称
        filename: 'bundle.js',
        // 指定间接资源的请求位置，会将html中js、css引用的静态资源添加的前缀路径
        publicPath: '/static/',
        // 配置那些不是从入口entry中输出的文件。比如webpack会将通过异步加载import()的模块生成一个bundle，此时该bundle就用chunkFilename定义的名称命名。
        chunkFilename: '[chunkhash].js',
        // 当将用webpack构建结果作为一个库可以被其它模块引入使用时，需要指定构建导出库的构建目标即符合哪种模块规范，以及库的名称
        libraryTarget: 'commonjs2', // commonjs commonjs2 amd umd window this var(默认)
        library: 'my_library',
    }
}
```

### 实践场景：

**filename**
当我们在 entry 中设置单入口时，filename 可以像上面一样指定一个出口文件。如果 entry 配置的是多入口时，输出也必须是多个输出，此时多个输出的文件名称采用如下写法。

```js
// 单入口输出
module.exports = {
    entry: './src/index.js',
    output： {
        filename: 'bundle.js'
    }
}
```

```js
// 多入口输出,采用类似模板语言的形式，依据entry对象中的key对应name动态生成
module.exports = {
    context: path.resolve(__path, './src/script')
    entry: {
        pageA: './pageA.js',
        pageB: './pageB.js',
    },
    output: {
        filename: '[name].js'
    }
}
```

webpack 支持其它几种模板变量：

```
[id]: 指代打包完成的bundle的id
[name]: 指当前打包完成bundle的name
[hash]: 指当前打包完成bundle的hash值
[chunkhash]：指代当前chunk内容的hash
```

**控制客户端缓存**
一个单入口，引用多模块的项目打包输出一个 bundle 文件，但过程中会产生多个 chunk。
bundle 与[name][id] [hash]一一对应
[chunkhash]只与 chunk 自身内容相关，单个 chunk 每次内容的变化都会产生不同的[chunkhash]。

所以，当重新打包生成文件时产生不同的[chunkhash]，利用这一点，使用[chunkhash]和[name]结合命名文件，每当 chunk 内容改变时，可以产生命名不同的文件，从而使用户在请求资源文件时避免使用本地缓存，而是下载最新版本文件，从而可以在打包构建过程中控制客户端缓存文件的更新。

```js
// 多入口输出,采用类似模板语言的形式，依据entry对象中的key对应name动态生成
module.exports = {
    output: {
        filename: '[name]@[chunkhash].js'
        // [hash] 和 [chunkhash] 的长度可以使用 [hash:16]（默认为20）形式来指定
        filename: '[name]@[chunkhash:7].js'
    }
}
```

**publicPath**
这个属性指定了构建时，静态资源引用路径。在按需加载或加载外部资源时，这个属性确定了资源加载的公共路径。

在页面中资源分为两种：

-   一种是由 HTML 页面直接请求的资源，比如通过 script 标签加载的 js，link 标签加载的 css 等。 由 path 属性指定位置
-   另一种是由 js 或 css 请求加载的间接资源。比如 js 中 require(),import() ,或 css 中 url(), @font-family 等。由 publicPath 指定位置

有 3 种不同的形式：

-   相对 html 文件路径

```js

// 假设当前HTML文件路径为： https://example.com/app/index.html
// 输出文件名为： self.css


/******相对路径：相对html文件路径**********/
publicPath: "assets/", // 实际路径 https//example.com/app/assets/self.css
publicPath: "../assets/", // 实际路径 https//example.com/assets/self.css
publicPath: "", // 实际路径 https//example.com/app/self.css 同index.html目录相同

/******绝对路径：以/开始，相对服务器根目录**********/
publicPath: "/", // 实际路径 https//example.com/self.css
publicPath: "/assets/", // 实际路径 https//example.com/assets/self.css
publicPath: "/css/", // 实际路径 https//example.com/css/self.css

/****** CDN网络路径**********/
publicPath: "http://cdn.com/", // 实际路径 http://cdn.com/self.css
publicPath: "https://cdn.com/", // 实际路径 https://cdn.com//self.css
```

### 延伸

webpack-dev-sever 的配置中也有一个 publicPath，代表本地服务器开启后，静态资源文件引用的公共路径。与 outpu 中 publicPath 基本相同，并且未配置时，默认取 output 中的 publicPath。

