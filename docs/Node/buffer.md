# Buffer 缓冲器

具体Buffer的概念见上一节，这节主要讲Buffer操作的主要API

## 创建
```js
Buffer.alloc(size[, fill[, encoding]])
```
```js
Buffer.allocUnsafe(size)
```

```js
Buffer.from(array)
Buffer.from(buffer)
Buffer.from(string[, encoding])
```

## 写入
```js
buf.write(string[, offset[, length]][, encoding])
buf.fill(value[, offset[, end]][, encoding])
```
## 读取
```js
buf.toString([encoding[, start[, end]]])
```
## 类数组操作
Buffer 类的实例是一个类数组，每个数组元素即其中一个字节数据。所以数组相关方法在Buffer上也有对应的实现。
```js
Buffer.isBuffer(obj)
buf.toJSON()
buf[index]
buf.length
Buffer.byteLength(string[, encoding])
buf.keys()
buf.values()
buf.entries()
buf.equals(otherBuffer)
buf.indexOf(value[, byteOffset][, encoding])
buf.lastIndexOf(value[, byteOffset][, encoding])
buf.includes(value[, byteOffset][, encoding])
buf.slice([start[, end]])
buf.subarray([start[, end]])
buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
Buffer.concat(list[, totalLength])
buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
```

## 相关常量
```js
Buffer.poolSize  // 默认值: 8192 用于缓冲池的预分配的内部 Buffer 实例的大小（以字节为单位）
Buffer.isEncoding(encoding) //检测是否是Buffer支持的字符编码格式
buffer.constants.MAX_LENGTH
buffer.constants.MAX_STRING_LENGTH
```

