# Object 类型

除了基础类型，其它都归属于对象类型。JS语言和宿主的基础设施由对象来提供，并且 JavaScript 程序即是一系列互相通讯的对象集合。

在基础的Object对象的基础上，衍生了很多实现特定功能的对象，包含语言规范定义的内置对象和语言宿主定义的对象。

内置对象（build-in)包含：Function函数对象、Array数组对象、 RegExp正则对象、Date日期时间对象，以及ES新增的Set列表对象、Map集合对象、Promise对象等等。
宿主对象： Window全局对象、DOM类型的对象、BOM类型的对象等。

具体分类可以查看[MDN Object]()

关于ES中对象和面向对象的详细总结见[面向对象](/ES/Ojbect)

关于对象类型的值如何在内存中存储，比较底层，涉及JS引擎的实现，可以参考这两篇文章

[V8 Object 内存结构与属性访问详解](https://zhuanlan.zhihu.com/p/24982678)<br>
[JS 类型对象的内存布局总结](https://www.anquanke.com/post/id/185339)<br>
[再谈js对象数据结构底层实现原理-object array map set](https://www.cnblogs.com/zhoulujun/p/10881639.html)<br>
[探究JS V8引擎下的“数组”底层实现](https://mp.weixin.qq.com/s/np9Yoo02pEv9n_LCusZn3Q)<br>
