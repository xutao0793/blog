# NPM

1. npm 介绍、命令
1. nvm 介绍、命令
1. nrm 介绍、命令
1. package.json 介绍：必备属性、描述信息、协议信息、目录文件信息、依赖、脚本配置、发布配置
1. package-lock.json 介绍


## package-lock.json

1. package-lock.json 的作用就是用来保证我们的应用程序依赖之间的关系是一致的，兼容的；适合多人协作开发时保证每个人的依赖版本是一致的。
1. 使用 npm 5.x 之后版本会自动生成 package-lock.json 文件；使用yarn同样也会自动生成package-lock.json文件；但是cnpm不会自动生成，并且也不会读取package-lock.json文件，只根据package.json下载依赖。
1. 在npm 5.x之前，我们可以直接更改package.json中的版本号，再npm install就可以直接更新了，但是5.x之后由于是根据package-lock.json安装依赖，所以我们只能使用npm install xxx@x.x.x去更新依赖，这样package-lock.json也会同步更新。


参考链接
[前端工程化 - 剖析npm的包管理机制](https://juejin.im/post/6844904022080667661)
[你想知道关于package-lock.json的一切，但是太害怕了问了？](https://segmentfault.com/a/1190000017239545)