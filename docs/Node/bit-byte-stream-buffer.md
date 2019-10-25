# 计算机数据的理解

二进制数据 位(bit) 字节(btye)(B) 字符集 字符编码 二进制数据流 流的缓冲器

上面这些名词联系起来才能更好的理解最终关于流和缓冲器的概念。在这里不会详细讲解每个概念，只是为了将这些概念串起来便于理解。

## 二进制 Binary digit

计算机硬件能控制就是有电状态和无电状态，对应着就是1和0（实际就是计算机用高电平和低电平分别表示1和0）。所以计算机最终储存和操作数据是二进制的。类似一串这样由1和0组成的数字：00101011，这就是二进制。

二进制中的每个数字，叫做位（bit），也就是 Binary digit的缩写。

## 数字转二进制
但现实中，我们用数字表示大小，所以如果要存储这些数字，计算机就要将数字转换为二进制来表示。比如存储数字12，计算机需要将12转为二进制1100，至于计算机如何将十进制数据转为二进制数据，这就到数学范畴了，我们只要知道计算机内置了算法能将数字转为二进制存储。

## 字符转数字
但现实中，我们的数据可不仅仅只有数字，还有字符/图片/视频/音频等。那这些又如何在计算机中表示呢？

拿字符存储来说：相对计算机已经能将数字转为二进制存储，那我们自然会想着，如果把现在能把字符对应上数字，然后就可以利用数字转二进制实现在计算机存储字符啦。当获取时再逆向回来（二进制转数字，数字转字符）就实现读取计算机数据表示的字符了。那这里就有两个问题：

- 现实中到底有多少字符？
- 需要有一张字符跟数字映射关系的表。

因为计算机最初是在美国普世的，他们的语言体系就26个英文字母，所以如果有罗列所有字符，基本也就是26个英文字母，再加上一些普遍的标点符号等，把这些字符收集起来，就是字符集。然后对照着这个字符集约定每个字符用什么数字表示，这个字符集跟数字的映射表就叫做字符编码。

这就是美国最早确定的ASCII字符集，它约定了128个字符，按最大数128需要7位二进制数1111111表示，又留了一个最高位用作奇偶校验位。约定用8位表示一个字符，即从00000000 - 01111111来表示0-127个字符，这就是ASCII编码。

但是随着电脑和网络在全世界普通，只限于拉丁字母的字符集显然是不能满足全世界各国语言和符号的，所以最终出现了现在所采用的Unicode字符集（也叫万国码），包含了几乎世界所有国家语言中可用的字符，每年还在不断的增加，可以看作是一种通用的字符集。基于这个万国字符集，实现了多种字符编码方案，其中最常用的字符编码就是UTF-8编码。

> UTF是 Unicode Tranformation Format，即把Unicode转做某种格式的意思。

UTF-8针对Unicode字符集中的字符采用了一种可变长度字符编码方案，兼容最初的ASCII编码方案，将按8位等于一个字节，ASCII中字符仍按8位表示一个字符，其中字符视需要采用2-4位字节来表示。其中汉字字符编码占3个字节，即计算机储存一个汉字需要3个字节24位二进制表示。

## 进制

一个汉字要用二进制表示，就要写24个0或1，数字很长，不方便阅读和识别，所以就出现了进制，二进制是原始进制，然后可以使用八进制、十进制、十六进制表示一个进制数。所以就简短很多了。

## 二进制数据
对图片、音频、视频等存储为二进制计算机也有很应的算法实现，总之，计算机会将无论数字、字符、图片、音频、视频或其他数据都转换为二进制并存储，这就是我们说的二进制数据。

## 流 Stream

在计算机存储的数据并不是死的，固定的，我们始终会频繁地对其进行操作，比如读取写入、存储位置的复制、剪粘等，本质上都是将某个位置的一堆二进制数据移动到另一个位置。好比我们把水从一个杯子倒到另一个杯子，就会形成水流一样，移动二进制数据从一个地方到另一个地方就会形成一个数据流动的过程，形象地比喻为二进制数据流。实际上，巨型数据会被分割成一小块一小块地(chunks)进行传输，也就形成了流。

在Nodejs中buffer的原始定义中所说的(“streams of binary data… in the context of… file system”)意思就是说二进制数据在文件系统中的传输。比如，将file1.txt的文字存储到file2.txt中。

## 缓冲区 Buffer

在计算机各个部件的处理速度是不一样的，核心CPU计算是最快，内存中数据的读取和写入速度比硬盘快，硬盘的读取和写入速度比U盘快。那这个写入和读取时好比水管的两端，当水流出的速度比水注入的速度快，那水管中间肯定有一裁空了，水流出端就要等待。当水注入的速度比水流出的速度快，那水肯定会在入口溢出，这时必须减慢水注入的速度。在计算机中当两端速度不匹配时，无效的等待是浪费性能，我本可以在等待时间内处理更多事，而现在闲下来，这是要优化的地方。

那优化的方案就是设置一个缓存冲来匹配两端的速度。比如注水和接水中间设一个一定容量的水槽来缓冲，我可以保持高速迅速把水槽装满，但水槽的武器速度可以匹配水管流出的速度。这样两端都不耽误时间。

这个水槽就是个水流的缓冲区，而Buffer就是Stream流传输过程的缓冲区。Buffer就是你电脑上的一个很小的物理内存，一般在RAM中，在这里数据暂时的存储、等待，最后发送过去并处理。

一个关于buffer很典型的例子，就是你在线看视频的时候。如果你的网络足够快，数据流(stream)就可以足够快，可以让buffer迅速填满然后发送和处理，然后处理另一个，再发送，再另一个，再发送，然后整个stream完成。

但是当你网络连接很慢，当处理完当前的数据后，你的播放器就会暂停，或出现”缓冲”(buffer)字样，意思是正在收集更多的数据，或者等待更多的数据到来，才能下一步处理。当buffer装满并处理好，播放器就会显示数据，也就是播放视频了。在播放当前内容的时候，更多的数据也会源源不断的传输、到达和在buffer等待。

如果播放器已经处理完或播放完前一个数据，buffer仍然没有填满，”buffering”(缓冲)字符就会再次出现，等待和收集更多的数据。

这就是**Buffer！**

Buffer里装着二进制数据，所以在node中Buffer也提供了API来与缓冲区中二进制数据进行交互和操作。在node中当开启一个流stream时，node会自动创建buffer，当然我们也自定义buffer，毕竟buffer就是一个内存空间嘛。

```js
// 创建一个大小为10的空buffer,即这个buffer只能承载10个字节的内容，也就是向计算机申请一块10字节大小的内存空间
const buf1 = Buffer.alloc(10);

// 根据内容直接创建buffer
const buf2 = Buffer.from("hello buffer");
// 这个buffer大小或者说申请的内存空间是12个字节
console.log(buf2.length) // 12，根据数据自动盛满并创建

// 查看buffer内存放的数据结构
console.log(buf1.toJSON())
// buff1是一个空的buffer
// { type: 'Buffer', data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] }

console.log(buf2.toJSON())
// the toJSON() 方法可以将数据使用Unicode编码并展示
// { type: 'Buffer',data: [ 104, 101, 108, 108, 111, 32, 98, 117, 102, 102, 101, 114 ] }

// 写入数据到buffer
buf1.write("Buffer really rocks!")

// 读取buffer数据
buf1.toString()  
// 'Buffer rea'
//因为buf1只能承载10个字节的内容，所有多处的东西会溢出，即被截断
```

## 内存大小
```
// bit 位是计算机最小的存储单位，Byte 字节是计算机常用的计算单位。
1B(Byte 字节) = 8 bit(位)

1KB = 1024B(Byte 字节)

1MB = 1024KB

1GB = 1024MB

1TB=1024GB
```
为什么是 1024 倍数呢？
因为 1024 = 2^10次方，

[一篇帮你彻底弄懂NodeJs中的Buffer](https://blog.csdn.net/qq_34629352/article/details/88037778)
[字符编码：基本概念](https://www.w3.org/International/articles/definitions-characters/)