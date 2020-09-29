# Web API: histoty 和 location

[[toc]]

## location

location 是浏览器提供的 Web API 之一，表示浏览器当前页面路径 URL 的对象信息。

可以直接在浏览器控制台 console 面板上输入 location 显示该对象信息

> Window 和 document 对象上都实现了 location 属性，所以可以直接通过 window.location（简写 location) 或 document.loaction 访问。

```js
// 假设当前页面 url = https://developer.mozilla.org:80/en-US/search?q=word#search-results-close-container
console.log(url.href);      // https://developer.mozilla.org:80/en-US/search?q=word#search-results-close-container
console.log(url.origin);    // https://developer.mozilla.org:80
console.log(url.protocol);  // https:
console.log(url.host);      // developer.mozilla.org:80
console.log(url.hostname);  // developer.mozilla.org
console.log(url.port);      // 80
console.log(url.pathname);  // /en-US/search
console.log(url.search);    // ?q=word
console.log(url.hash);      // #search-results-close-container

// 操作
1. 直接设置 `location.href = 'url'`，会更改浏览器地址栏 url，并以此加载页面，并且当前新加的 url 也会被添加到 history 历史之中，可以点击前进和回退页面，同 location.assign(url)一样。
2. location.reload(isRefresh)，重新加载当前URL的资源，即刷新页面。可选参数 isRefresh 是 Boolean，为 true 时表示从服务器重新获取页面数据来刷新，默认 false，从缓存当中刷新页面资源。
3. location.assign(url)，用给定的 url 替换掉当前 url，并加载给定 url 的资源，并记录到 history 历史记录中，可以后退和前进页面。
4. location.replace(url)，用给定的 url 替换掉当前 url，并加载给定 url 的资源。但与 assign() 方法不同的是用 replace()替换的新页面不会被保存在会话的历史 History中，这意味着用户将不能用后退按钮转到该页面

// 事件 
// hashChange 当URL的片段标识符更改时，将触发hashchange事件 (跟在＃符号后面的URL部分，包括＃符号)
window.addEventListener('hashchange', function() {
  console.log('The hash has changed!' + location.hash)
}, false);

location.href = 'http://127.0.0.1:5500/vue.html#/test'  // The hash has changed! #/test
location.href = 'http://www.baidu.com#/test' // 不会触发，因为 hash 值未变
```
注意：search 部分(?开头）一定要在 hash 部分（#开头）前面。如果是 `http://127.0.0.1:5500/vue.html#/info/13?q=keyword`，则 location.hash 的值是`#/info/13?q=keyword`，所以 vue-router 在 hash 模式下，需要手动解析 hash 部分（`#/info/13`）和模拟的 search 部分 (`?q=keyword`)。

## history

history 是浏览器提供的 Web API 之一，操作浏览器的曾经在标签页或者框架里访问的会话历史记录。

```js
// 属性
history.length    // 返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。
history.state     //  返回一个表示历史堆栈顶部的状态的值。

// 方法
history.go(n)       // 通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面。参数为-1的时候为上一页，参数为1的时候为下一页。当不传参数、不是整数参数、整数参数超出前后界限时都没有效果。
history.forward()   // 在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法. 等价于 history.go(1)，超出界限没有效果。
history.back()      // 前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法. 等价于 history.go(-1)，超出界限没有效果。
history.pushState(state, title[, url])  // 向当前浏览器会话的历史堆栈中添加一个状态（state），如果有提供 url，则会尝试加载 url 资源。但新网址必须与当前网址相同 origin。如果未指定url参数，则将当前设置state为文档的当前URL。目前当前大多数浏览器都忽略 title 参数，可以传入空字符串。
history.replaceState(stateObj, title[, url])  // 使用传入的参数替换当前 history 记录的信息。新的URL跟当前的URL必须是同源; 否则 replaceState 抛出一个异常。

// 事件
// popState  当活动历史记录条目更改时，将触发popstate事件。

// 需要注意的是单纯调用history.pushState() 或 history.replaceState() 不会触发 popstate 事件。
// 只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮，或者在Javascript代码中调用 history.back() /forward() / go(n) 方法。

// 例子
window.addEventListener('popstate', (event) => {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
});
history.pushState({page: 1}, "title 1", "?page=1");
history.pushState({page: 2}, "title 2", "?page=2");
history.replaceState({page: 3}, "title 3", "?page=3");
history.back(); // Logs "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // Logs "location: http://example.com/example.html, state: null
history.go(2);  // Logs "location: http://example.com/example.html?page=3, state: {"page":3}
```

## pushState 和 location = url 的区别

从某种程度来说, 调用 pushState() 和 window.location = url 基本上一样, 他们都会在当前的 history 中创建和激活一个新的历史记录。但是 pushState() 有以下优势：
- 新的URL可以是任何和当前URL同源的URL。但是 window.location 只会在你只设置锚 hash 值的时候才会使当前源的URL。比如 window.location = "#foo"。如果赋值一个绝对地址，如window.location.href = url 可以是非同源的 url。
- 非强制修改URL。相反，如果通过 window.location = "#foo" 仅设置 hash 锚部分，不会创建一条新的历史记录，只会修改当前 url 中的 hash 值。
- 可以通过 state 对象在新的历史记录中关联数据。window.location = url  形式的操作，只可以将url写入锚的字符串中。
- pushState 会触发 popState 事件，window.location 赋值会触发 hashChange 事件。