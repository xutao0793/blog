# 浏览器架构的演化

[[toc]]

先把总结写在前面：

浏览器是多进程的架构，浏览器的内核也称渲染引擎，主要指渲染进程的处理程序，浏览器的内核是多线程，即渲染进程中有多个线程运行，其中就包括JS线程。

先熟悉几个概念：

## 进程与线程

##### 进程

进程是操作系统进行资源分配和调度的一个独立单位，是应用程序运行的载体。

启动一个程序的时候，操作系统会为该程序分配一块内存，用来存放执行的代码、运行中的数据和一个执行任务的主线程，我们把这样的一个运行环境叫进程。

大白话讲，进程就是操作系统在内存中给程序运行开的一个房间，房间提供了程序运行的需要的一切条件，但房间是封闭的，房间之间的联系需要通过酒店老板的来管理。

##### 线程

线程是单个程序执行中一个个单一的顺序控制的事件流程，是程序执行的最小单元。

在早期的操作系统中并没有线程的概念，进程是能拥有资源和独立运行的最小单位，也是程序执行的最小单位。任务调度采用的是时间片轮转的抢占式调度方式，而进程是任务调度的最小单位，每个进程有各自独立的一块内存，使得各个进程之间内存地址相互隔离。后来，随着计算机的发展，对CPU的要求越来越高，进程之间的切换开销较大，已经无法满足越来越复杂的程序的要求了。于是就发明了线程，线程是程序执行中一个单一的顺序控制流程，是程序执行流的最小单元。这里把线程比喻一个车间的工人，即一个车间可以允许由多个工人协同完成一个任务。

大白话讲，一个房间里要做的事，一个人做不完了，就安排多个人在一个房间里一起做。

##### 进程和线程的区别和关系

- 进程是操作系统进行内存分配的最小单位，线程是程序执行的最小单位。
- 进程之间相互独立隔离，进程间通信需要外部统一调度（进程间通信（IPC）的机制）。
- 当一个进程关闭之后，操作系统会回收进程所占用的内存。
- 一个进程由一个或多个线程组成，线程是不能单独存在的，它是由进程来启动和管理的；
- 多个线程之间共享同一进程中程序的内存空间(包括代码段、数据集、堆等)及一些进程级的资源(如打开文件和信号)。
- 任意一线程执行出错，都会导致整个进程的崩溃。
- 调度和切换：线程上下文切换比进程上下文切换要快得多。

##### 多进程和多线程

- 多进程：指的是在同一个时间里，同一个计算机系统中如果允许两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如你可以听歌的同时，打开编辑器敲代码，编辑器和听歌软件的进程之间丝毫不会相互干扰。
- 多线程是指程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来提升执行效率，比如单独的线程运行复杂的算法流程。

##### 并行处理

计算机中的并行处理指的就是同一时刻处理多个任务。

举例：我们要计算下面这三个表达式的值，并显示出结果。

```js
A = 1+2
B = 20/5
C = 7*8
```
在编写代码的时候，我们可以把这个过程拆分为四个任务：
- 任务 1 是计算 A=1+2；
- 任务 2 是计算 B=20/5；
- 任务 3 是计算 C=7*8；
- 任务 4 是显示最后计算的结果。

正常情况下程序可以使用单线程来处理，也就是分四步按照顺序执行这四个任务。

如果采用多线程，我们只需分“两步走”：第一步，使用三个线程同时执行前三个任务；第二步，再执行第四个显示任务。

![single_thread_and_multi_thread.png](./img/single_thread_and_multi_thread.png)

通过对比分析，你会发现用单线程执行需要四步，而使用多线程只需要两步。因此，使用并行处理能大大提升性能。

并且，线程间共享同一进程中程序的内存空间(包括代码段、数据集、堆等)及一些进程级的资源(如打开文件和信号)。

![multi_thread_share.png](./img/multi_thread_share.png)

## 浏览器架构演化（Chrome）

现代浏览器都是一个多进程和多线程管理的架构。比如Chrome浏览器使用多个进程来隔离不同的功能，包括不同的网页（在Chrome中打开一个tab页面就相当于开启了一个进程）。

但浏览器不是一开始就是这样的，也是慢慢演化到如今的多进程多线程架构的，并且当前的架构模型还不能支撑日益复杂的浏览器应用，还在不断进化。

##### 单进程浏览器

单进程浏览器是指浏览器的所有功能模块都是运行在同一个进程里，这些模块包含了网络、插件、JavaScript 运行环境、渲染引擎和页面等。其实早在 2007 年之前，市面上浏览器都是单进程的。单进程浏览器的架构如下图所示：
![single_process.png](./img/single_process.png)
单进程架构的问题：
- 不稳定：任一线程出现问题就会导致整个进程崩溃，比如外部开发的插件是早期导致浏览器页面崩溃的主要原因，因为第三方开发的插件水平无法统一。
- 不流畅：页面的渲染模块、JavaScript 执行环境都运行在同一线程中，JS脚本的运行效率很容易阻塞整体页在卡顿。
- 不安全：插件和脚本的开发都是第三方，极容易通过共享的浏览器内存漏洞来获取计算机系统权限，引发安全问题。

##### 早期多进程浏览器

看看 2008 年 Chrome 发布时的进程架构。它将两个极易引起安全问题的线程（插件和渲染）独立成单独的进程来运行。由于进程间的隔离，所以也就解决了上述单进程架构中不稳定不流畅的问题。

至于不安全的问题，对两个独立的进程采用安全沙箱模式，可以把沙箱看成是操作系统给进程上了一把锁，沙箱里面的程序可以运行，但是不能在你的硬盘上写入任何数据，也不能在敏感位置读取任何数据。Chrome 把插件进程和渲染进程锁在沙箱里面，这样即使在渲染进程或者插件进程里面执行了恶意程序，恶意程序也无法突破沙箱去获取系统权限。

![multi_process.png](./img/multi_process.png)

##### 现代多进程浏览器

![multi_process1.png](./img/multi_process1.png)

最新的 Chrome 浏览器架构包括：1 个浏览器（Browser）主进程、1 个 GPU 进程、1 个网络（NetWork）进程、多个渲染进程和多个插件进程。

- 浏览器进程

主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。

- GPU 进程

其实，Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。

- 网络进程

主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。

- 渲染进程

浏览器的核心，主要任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，包括排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。但出于性能考虑，同一站点下的多个tab页面共用一个渲染进程。另外出于安全考虑，渲染进程都是运行在沙箱模式下。

- 插件进程

主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。

打开chrome浏览器，在顶部菜单栏右键选择“任务管理器”或者快捷键（shift+esc)，可以查看当前浏览器运行的进程：
![chrome_process.png](./img/chrome_process.png)

##### 面向未来的浏览器架构

对于上述多进程架构也有问题，虽然提供了浏览器的稳定性、流畅性和安全性，但多进程带来更多的内存占用和模块间的耦合。为了解决这些问题，在 2016 年，Chrome 官方团队使用“面向服务的架构”（Services Oriented Architecture，简称 SOA）的思想设计了新的 Chrome 架构。

Chrome 最终要把 UI、数据库、文件、设备、网络等模块重构为基础服务，类似操作系统底层服务。目前 Chrome 正处在老的架构向服务化架构过渡阶段，这将是一个漫长的迭代过程。
![chrome_server.png](./img/chrome_server.png)


## 浏览器内核是多线程的

浏览器内核，通常也被称为渲染引擎，也就是浏览器渲染进程中运行的程序。主要任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页。

浏览器内核是多线程，在内核控制下各线程相互配合以保持同步，一个浏览器通常由以下常驻线程组成：

- GUI 渲染线程

负责渲染浏览器界面HTML元素,页面初始化或都当界面需要重绘(Repaint)或由于某种操作引发回流(reflow)时,该线程就会执行。在Chrome浏览器主要指Blink引擎，包括HTML解析器和CSS解析器。

- JavaScript引擎线程

在Chrome浏览器由V8引擎负责解析Javascript脚本，运行代码。

- 定时触发器线程

浏览器定时计数器并不是由JavaScript引擎计数的, 因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确, 因此通过单独线程来计时并触发定时是更为合理的方案。

- 事件触发线程

来自浏览器其他线程的事件如鼠标点击、AJAX异步请求，或者JS中注册的回调事件被触发时，该线程会把事件添加到事件处理队列的队尾，等待JS引擎的处理。由于JS的单线程关系，所有这些事件都得排队等待JS引擎处理。

##### Javascript的单线程

Javascript是单线程的, 那么为什么Javascript要是单线程的？

这是因为Javascript这门脚本语言诞生的使命所致：JavaScript为处理页面中用户的交互，以及操作DOM树、CSS样式树来给用户呈现一份动态而丰富的交互体验和服务器逻辑的交互处理。如果JavaScript是多线程的方式来操作这些UI DOM，则可能出现UI操作的冲突；假设存在两个线程同时操作一个DOM，一个负责修改一个负责删除，那么这个时候就需要浏览器来裁决如何生效哪个线程的执行结果。当然我们可以通过锁来解决上面的问题。但为了避免因为引入了锁而带来更大的复杂性，Javascript在最初就选择了单线程执行。

##### 线程阻塞

- JavaScript的执行会阻塞GUI 渲染线程

由于JavaScript是可操纵DOM的，如果在修改这些元素属性同时渲染界面（即JavaScript线程和UI线程同时运行），那么渲染线程前后获得的元素数据就可能不一致了。因此为了防止渲染出现不可预期的结果，浏览器设置GUI渲染线程与JavaScript引擎为互斥的关系，当JavaScript引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到引擎线程空闲时立即被执行。

所以JavaScript的执行会阻塞页页的渲染，会造成页面的渲染不连贯，导致页面加载卡顿的感觉。。

- CSS的加载会阻塞JavaScript的执行

因为JavaScript可以操作页面元素的样式，但浏览器并不知道当前JS代码中有没有操作元素CSS的代码，所以JS的执行一律等到CSS文件加载完成后才执行。

**参考资料**

[浏览器工作原理与实践 01节](https://time.geekbang.org/column/article/113513)<br>
[浏览器进程？线程？傻傻分不清楚！](https://imweb.io/topic/58e3bfa845e5c13468f567d5)







