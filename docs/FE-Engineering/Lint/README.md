# 编码规范

JavaScript 是一个动态的弱类型语言，因为缺少编译过程，有些本可以在编译过程中发现的错误，只能等到运行时才发现，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调试，这给我们代码调试工作增加了负担。而遵循良好的编码规范，同时配合 ESLint + Prettier 这样的工具，可以让程序员在编码的过程中发现问题而不是在执行的过程中。

> 代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。

良好的编码规范，主要目的是用来解决两个问题：

- 代码质量：这方面主要体现在规避语言特性的不恰当使用产生的潜在问题 (problematic patterns)
- 代码风格：这方面主要体现在团队协作中代码风格的一致性，可以在项目维护和交接上更有效率 (doesn’t adhere to certain style guidelines)

[[toc]]

## 规范

JS 语言的编码规范没有官方标准，但是大公司中一般都有其自己沉淀的一套代码规范。目前在社区较为流行的几种 JavaScript 规范：

- [Airbnb JavaScript Style Guide 中文版](https://lin-123.github.io/javascript/)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [JavaScript Standard Style Guide](https://github.com/standard/standard)
- [Idiomatic JavaScript Style Guide](https://github.com/rwaldron/idiomatic.js)
- [jQuery JavaScript Style Guide](https://contribute.jquery.org/style-guide/js/)

其中 [Airbnb JavaScript Style Guide 中文版](https://lin-123.github.io/javascript/) 值得参考，需要仔细看看。

另外，还有国内大公司前端团队的一些内部规范：

[京东凹凸前端规范-JS](https://guide.aotu.io/docs/js/language.html)

这些规范里定义的规则，可以按照上面需要解决的两个问题，划分为：

- 代码质量规则 (code-quality rules)
  - no-unused-vars
  - no-extra-bind
  - no-implicit-globals
  - prefer-promise-reject-errors
  - ...
- 代码风格规则 (code-formatting rules)
  - max-len
  - no-mixed-spaces-and-tabs
  - keyword-spacing
  - comma-style
  - ...

## 工具

> 与其费尽心思地告诉别人要遵守某种规则，以规避某种痛苦，倒不如从工具层面就消灭这种痛苦

工具链：

1. [EditorConfig](/FE-Engineering/Lint/EditorConfig/)
1. [ESLint](/FE-Engineering/Lint/ESLint/)
1. [Prettier](/FE-Engineering/Lint/Prettier/)
1. [Stylelint](/FE-Engineering/Lint/Stylelint/)
1. [Husky](/FE-Engineering/Lint/Husky/)
1. [lint-staged](/FE-Engineering/Lint/lint-staged/)

关于各个工具的具体介绍和总结，可以点击查看详情。

### EditorConfig

1. .editorconfig

EditorConfig 旨在帮助开发人员在不同的编辑器或 IDE 之间保持一致的编码风格。

VS Code 编辑器需要安装插件：EditorConfig for Visual Studio Code

### ESLint

JavaScript 作为一门动态语言，因为缺少编译过程，有些本可以在编译过程中发现的错误，只能等到运行才发现，这给我们调试工作增加了一些负担，而 Lint 工具相当于为语言增加了编译过程，在代码运行前进行静态分析找到出错的地方。

所以 Lint 工具的意义：

1. 避免低级 bug，找出可能发生的语法错误。比如：使用未声明变量、修改 const 变量……
2. 提示删除多余的代码。比如：声明而未使用的变量、重复的 case ……
3. 确保代码遵循最佳实践，如参考 airbnb style、javascript standard 等实践指南
4. 统一团队的代码风格。比如：加不加分号？使用 tab 还是空格等，这部分主要可以由 Prettier 完成，后面讲。

配置文件：

1. .eslintrc.js
1. .eslintignore

### Prettier

Prettier 是一个强制性的代码格式化程序。采用 Prettier 的最大原因是停止所有有关样式的持续辩论（要不要有分号，缩进用空格还是制表符等），而统一遵循 Prettier 提供的默认规则格式化代码。

Prettier 的设计初衷和原则，也是它的意义所在：

- 停止浪费时间来讨论代码风格
- 纯粹写代码，不要花时间在格式化上
- 配置最小化，让它更容易实施，而且格式化速度非常快
- 基本支持前端生态链上的大部分语言风格

配置文件：

1. .prettierrc.js
1. .prettierignore

### Stylelint

Stylelint 是一个强大的现代 CSS 检测器，可以让你在样式表中遵循一致的约定和避免错误。用法和规则基本与 ESLint 一样。

- 有超过 150 条规则，包括语言特性方面的规则，也有最佳实践的规则，以及统一代码风格的规则。
- 支持最新的 CSS 语法，如 media、calc()等函数、自定义属性等
- 支持 CSS 预处理器语法，如 SCSS / LESS 等。
- 支持自定义规则、扩展规则、插件

配置文件：

1. .stylelintrc.js
1. .stylelintignore

### Husky

> Husky can prevent bad git commit, git push and more 🐶 woof!

Husky 能够帮你阻挡住不好的代码提交和推送。使用 Husky 简化了对 git hooks 的操作，不用繁琐的自己去配置 git hook 各阶段勾子的脚本文件了，只要提供对应的 npm script 操作就好。

### lint-staged

lint-staged 从名字可以看区，只校验 lint 提交到暂存区 staged 的代码。即每次只对当前修改后进行 git add 加入到 stage 区的文件进行扫描校验，避免对项目中进行全项目扫描所会增加了检查复杂度和时长，我们只需要检查我们要提交的代码就可以了。

## 实践

如何在项目中集成 EditorConfig + ESLint + Prettier + Stylelint + Husky + lint-staged 的整条工具链，并实现自动化的代码校验。

主要为三个层次：

1. IDE 集成: .editorconfig、ESLint、Prettier
2. Git 集成：husky、lint-staged
3. CI 集成：npm run lint

### 1. 统一 IDE 配置 EditorConfig

- VS Code 需要安装插件 `EditorConfig for VS Code`，然后在项目根目录下右键，点击最右的菜单项： `Generate .editorconfig`，直接生成 .editorconfig 文件。

```sh
# editorconfig.org
root = true

[*]
charset = utf-8
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

# Markdown 语言中尾随空格是有意义的，比如行尾两个空格相当控行, 2 trailing spaces = linebreak (<br />)，所以我们要特殊指定忽略
# See https://daringfireball.net/projects/markdown/syntax#p
[*.md]
trim_trailing_whitespace = false
```

- VS Code 安装 `Prettier-Code formatter` `ESLint` `stylelint` 插件

安装后，调整相关配置，最终配置文件:

```json
"editor.tabSize": 2,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
```

### 2. 使用 Prettier 作为统一代码风格

- 安装

```sh
npm install --save-dev --save-exact prettier
```

- 配置文件 .pretterrc.js

视自己需要更改

```js
module.exports = {
  //每行最多多少个字符换行默认80
  printWidth: 80,
  // 使用制表符或是空格缩进行, 默认 false。
  useTabs: false,
  //tab缩进大小,默认为2
  tabWidth: 2,
  //语句求尾是否使用分号, 默认true
  semi: true,
  //使用单引号, 默认false(在jsx中配置无效, jsx使用 jsxSingleQuote, 默认都是双引号)
  singleQuote: true,
  // 更改对象属性引号的的时机
  // "as-needed" -仅在需要时在对象属性周围添加引号， 默认值。
  // "consistent" -如果对象中至少有一个属性需要用引号引起来，请用所有属性引起来。
  // "preserve" -尊重对象属性中引号的输入使用。
  quoteProps: "as-needed",
  // 行尾逗号,默认none,可选 none|es5|all
  // "es5" -在ES5中有效的结尾逗号（对象，数组等）,默认值
  // "none" -没有尾随逗号。
  // "all"-尽可能在结尾加上逗号（包括函数参数）。这需要节点8或转换
  trailingComma: "es5",
  // 对象中文字与大括号的空格 默认true
  // true: { foo: bar }
  // false: {foo: bar}
  bracketSpacing: true,
  // 箭头函数参数括号 默认always 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号 （x) => x
  arrowParens: "always",
  //行结尾的风格<auto | lf | crlf | cr>
  endOfLine: "lf",
  // jsx语法中的引号
  jsxSingleQuote: "",
  // JSX标签闭合位置 默认false
  // false: <div
  //          className=""
  //          style={{}}
  //       >
  // true: <div
  //          className=""
  //          style={{}} >
  jsxBracketSameLine: true,
  // HTML空格敏感性
  // "css"-遵守CSS display属性的默认值。
  // "strict" -空白被认为是敏感的。
  // "ignore" -空白被认为是不敏感的。
  htmlWhitespaceSensitivity: "css",
  // Vue文件脚本和样式标签缩进
  // "false" -不要缩进Vue文件中的脚本和样式标签。
  // "true" -在Vue文件中缩进脚本和样式标签。
  vueIndentScriptAndStyle: "false",
  // 是否在文件头部插入一个特殊的@format标记，默认 false
  insertPragma: "false",
  // 是否需要编译指示，默认 false
  /**
   * @prettier
   */
  // 或
  /**
   * @format
   */
  requirePragma: "false",
};
```

- 忽略文件 .prettierignor

```sh
/dist/
/node_modules/
/static/
/public/
```

### 3. 使用 ESLint 校验 JS 类代码质量

- 安装：因为需要与 Prettier 集成，所以相关插件也要安装

```js
npm i -D eslint babel-eslint eslint-config-aribnb eslint-config-prettier eslint-plugin-prettier
```

- 配置文件 .eslintrc.js

```js
module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["plugin:vue/essential", "aribnb", "plugin:prettier/recommended"],
  // required to lint *.vue files
  plugins: ["vue", "prettier"],
  // add your custom rules here
  rules: {
    // allow async-await
    "no-console": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
```

- 排除文件 .eslintignor

```sh
# .eslintignor
/node_modules/
/build/
/public/
/dist/
src/assets/
```

### 4. 使用 Stylelint 校验 CSS 类代码

- 安装：因为需要与 Prettier 集成，所以相关插件也要安装

```sh
npm i -D stylelint stylelint-config-standard stylelint-order stylelint-config-prettier stylelint-plugin-prettier
```

- 配置文件 .stylelintrc.js

```js
module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-prettier/recommended",
  ]
  "plugins": [
    "stylelint-order",
  ],
  "rules": {
    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "rules",
      "at-rules"
    ],
    "order/properties-order" : [
      "display",
      "position",
      ...
    ]
  }
}
```

- 忽略文件 .stylelintignor

```sh
# .eslintignor
/node_modules/
/build/
/public/
/dist/
src/assets/
```

### 5. 集成到 Git 流程中

- 安装 Husky 和 lint-staged

```sh
npm i -D husky lint-staged
```

- 配置

在 package.json 中配置：

```js
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged" // 在代码commit前执行将加入到stage暂存区的文件进行检查，按照下面"lint-staged"中的规则进行检查
    }
  },
  // 对staged的文件进行lint，避免对整个项目进行lint代码庞大且缓慢
  "lint-staged": {
    "linters": {
      "src/**/*.js": [  // 匹配.js文件一下命令
        "eslint --fix", // 执行eslint进行扫描进行fix
        "prettier --write", //执行prettier脚本,对代码镜像格式化
        "git add" //上述两项任务完成后对代码重新add。
      ],
      "src/**/*.vue": [
        "eslint --fix",
        "stylelint --fix",
        "prettier --write",
        "git add"
      ],
      "src/**/*.scss": [
        "stylelint --syntax=scss --fix",
        "prettier --write",
        "git add"
      ],
      "ignore": [
        "/dist/",
        "/node_modules/",
        "/static/",
        "/public/"
      ]
    }
  },
}
```

现在新版本，也可以便 ESLint 一样单独指定配置文件`huskyrc.js` `lintstagedrc.js`。

```js
// huskyrc.js
module.exports = {
  hooks: {
    "pre-commit": "lint-staged",
  },
};
```

```js
// lintstagedrc.js
module.exports = {
  "src/**/*.js": [
    // 匹配.js文件一下命令
    "eslint --fix", // 执行eslint进行扫描进行fix
    "prettier --write", //执行prettier脚本,对代码镜像格式化
    "git add", //上述两项任务完成后对代码重新add。
  ],
  "src/**/*.vue": [
    "eslint --fix",
    "stylelint --fix",
    "prettier --write",
    "git add",
  ],
  "src/**/*.scss": [
    "stylelint --syntax=scss --fix",
    "prettier --write",
    "git add",
  ],
  ignore: ["/dist/", "/node_modules/", "/static/", "/public/"],
};
```

### 6. 集成到 CI 流程中

待补充...

## 引申知识：

### Code Review

- [谈谈我对 code-review 的理解](https://juejin.im/post/5c3b2bb9e51d4552090db0be)

### Cosmiconfig

> [cosmiconfig](https://www.npmjs.com/package/cosmiconfig)

Cosmiconfig 是一个用于搜索并加载程序配置文件的插件。

默认情况下，Cosmiconfig 将在您告诉它启动的位置启动，并在目录树中搜索以下内容：

- package.json 文件对应的属性
- rc 文件：无扩展名，或者加.json / .yaml / .yml / .js 扩展名的 rc 文件
- .config.js：符合 CommonJS 模块规范的文件，导出一个配置对象

例如，如果模块名称为“ myapp”，则 cosmiconfig 将在以下位置搜索目录树以进行配置：

- myapp 项目中 package.json 文件的 myapp 字段属性值
- .myapprc 文件，文件内语法可以用 JSON 或 YAML 格式
- .myapprc.json 或 .myapprc.yaml 或 .myapprc.yml 或.myapprc.js 文件
- myapp.config.js 导出 JS 对象的文件

Cosmiconfig 继续搜索目录树，检查每个目录中的每个位置，直到找到可接受的配置（或访问主目录） 或者标识 `root:true` 的文件为止。

### glob 匹配模式

- glob 是什么

glob 是一种文件匹配模式，全称 global，它起源于 Unix 的 bash shell 中，比如在 linux 中常用的 `mv *.txt tmp/` 中，`*.txt` 就使用到了这种 glob 模式。

- glob 有什么用

在计算机编程中，经常需要对文件或者文件夹进行操作，那么会经常涉及到一些文件或者文件夹的匹配操作，此时就是 Glob 模式大显身手的时候，比如上面的 mv 命令。

大家最熟悉的应用的地方可能给就是 git 中的 .gitignore 中的表达式了，它就是 Glob 模式的一个典型用法。

- glob 匹配语法

```
*	                          匹配除了斜杠(/)之外的所有字符。 Windows上是斜杠(/)和反斜杠(\)
**	                        匹配零个或多个目录及子目录。不包含 . 以及 .. 开头的。
?	                          匹配任意单个字符。
[seq]	                      匹配 seq 中的其中一个字符。
[!seq]	                    匹配不在 seq 中的任意一个字符。
\	                          转义符。
!	                          排除符。
?(pattern_list)	            匹配零个或一个在 pattern_list 中的字符串。
*(pattern_list)	            匹配零个或多个在 pattern_list 中的字符串。
+(pattern_list)	            匹配一个或多个在 pattern_list 中的字符串。
@(pattern_list)	            匹配至少一个在 pattern_list 中的字符串。
!(pattern_list)	            匹配不在 pattern_list 中的字符串.
[...]	                      匹配一个字符范围，类似于RegExp范围。如果范围的第一个字符是!或，^则它匹配不在范围内的任何字符。
```

- 示例：
  - 匹配 docs 目录下及子目录所有 markdown 文件： `docs/**/*.md`
  - 匹配 大小写的 bin 文件夹： `[Bb]in`

> 在 NODE 开发中，项目中可以使用 [node-glob](https://github.com/isaacs/node-glob)

- 参考
  - [Glob 模式](https://www.cnblogs.com/savorboard/p/glob.html)
  - [Glob Patterns 匹配模式使用](https://zhuanlan.zhihu.com/p/53888457)

### ignor 文件

待完善....

## 参考链接

- [深入理解 ESLint](https://zhuanlan.zhihu.com/p/75531199) ---讲解了：lint 工具简史（JSLint/JSHint/ESLint)、Lint 工具的意义、ESLint 的使用。结尾的参考资料也值得看看[ESLint 工作原理探讨](https://zhuanlan.zhihu.com/p/53680918)
- [Prettier 看这一篇就行了](https://zhuanlan.zhihu.com/p/81764012) ---讲解了：为什么用 Prettier、什么是 Prettier、使用 Prettier
- [搞懂 ESLint 和 Prettier](https://zhuanlan.zhihu.com/p/80574300) ---讲解了两个工具不同的关注点：ESLint 主要解决的是代码质量问题、Prettier 规范代码风格问题。
- [editorconfig github](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties) --- 英文
- [使用.editorconfig 规范编辑器编码规范](https://blog.sesine.com/2018/12/14/editorconfig/) --- 中文
- [Husky github](https://github.com/typicode/husky)
- [使用 husky 和 lint-staged 来构建你的前端工作流](https://www.jianshu.com/p/1d0951a7ee2c)
- [前端代码规范最佳实践](https://mp.weixin.qq.com/s/p97k6hjKvU0uC8ocYLhQvA)
- [eslint+husky+prettier+lint-staged 提升前端应用质量](https://juejin.im/post/5c67fcaae51d457fcb4078c9)
- [前端工程化之——代码规范五部曲](https://blog.csdn.net/dudufine/arhttps://efe.baidu.com/tags/Lint/ticle/details/106323543)
- [前端代码风格检查套件 FECS](https://efe.baidu.com/tags/Lint/)--比较了 HTML / css / js 各种 lint 工具
