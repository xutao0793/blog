# NPM Script

[为什么我要离开gulp和grunt转投npm脚本的怀抱](https://www.cnblogs.com/bee0060/p/5773560.html)

## npm run / npm run-script

npm 是如何管理和执行各种 scripts 的呢？作为 npm 内置的核心功能之一，npm run 实际上是 npm run-script 命令的简写。当我们运行 npm run xxx 时，基本步骤如下：

- 从 package.json 文件中读取 scripts 对象里面的全部配置；
- 以传给 npm run 的第一个参数作为键，本例中为 xxx，在 scripts 对象里面获取对应的值作为接下来要执行的命令，如果没找到直接报错；
- 如果找到，开启一个 shell 进程，在系统默认的 shell 中执行上述命令，系统默认 shell 通常是 bash。

## 如何找到命令行中命令的执行文件？

npm 在执行指定 script 之前会把 node_modules/.bin 加到环境变量 $PATH 的里面，执行完后再清除，这意味着任何内含可执行文件的 npm 依赖都可以在 npm script 中直接调用，换句话说，你不需要在 npm script 中加上可执行文件的完整路径，比如 `./node_modules/.bin/eslint **.js`，只需要直接写 `eslint **.js`, 此时 eslint 命令的入口文件即 eslint 依赖包 package.json 中 bin 字段的值。

```json
"bin": {
  "eslint": "bin/eslint.js"
},
```



