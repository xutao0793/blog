// 创建
// 指定buffer大小 size = 5,即申请5个字节大小的内存缓存区
let buf1 = Buffer.alloc(5)

// 指定大小并初始化填充内容  fill = 'a'
let buf2 = Buffer.alloc(5, 'a')
console.log('buf2',buf2.toString()); // aaaaa

// node创建buffer默认编码utf8
let buf3 = Buffer.alloc(5, 'a', 'utf8')
console.log('buf3',buf3.toString('utf8')); // aaaaa

// alloc申请内存缓冲时会对这段缓冲区进行内容清除，即结果是这个buffer是空白的。
// allocUnsafe 申请时只会保证大小符合，但内容不会去清除，所以这个内存缓存冲有可能是有历史内容的，那toString能把内容读出来，所以不安全，以unsafe命名
let buf4 = Buffer.allocUnsafe(5)
console.log('buf4', buf4.toString('utf8')); // 没有写入过内容，但输出是有内容的Տ�

// from创建内存缓冲区入参类型有多种：
// 可以是一个包含元素是一个字节（即8bit）的字节数组
// 一段buffer，相当于拷贝
// 一个字符串
let buf5 = Buffer.from([0xe8,0xbf,0x9e])
console.log('buf5',buf5.toString('utf8')); // 连

let buf6 = Buffer.from(buf3)
console.log('buf6', buf6.toString('utf8')); // aaaaa

let buf7 = Buffer.from('hello')
console.log('buf7', buf7.toString('utf8')); // hello


// 写入
// buf.fill(value[,offset[,end]][,encoding])

let buf8 = Buffer.alloc(6)
buf8.fill('b',0,6,'utf8')
console.log('buf8', buf8.toString('utf8')); // bbbbbb
console.log('buf8', buf8.toJSON()); // { type: 'Buffer', data: [ 98, 98, 98, 98, 98, 98 ] }


let buf9 = Buffer.alloc(6)
buf9.fill('b',2,4,'utf8')
console.log('buf9', buf9.toJSON()); // { type: 'Buffer', data: [ 0, 0, 98, 98, 0, 0 ] }

let buf10 = Buffer.alloc(11)
buf10.write('hello world')
console.log('buf10', buf10.toString('utf8')); // hello world

// 重复写会覆盖，超出申请的缓存区大小会溢出截断
buf10.write('this is buffer')
console.log('buf10', buf10.toString('utf8')); // this is buf

// 类数组相关操作
console.log('isBuffer', Buffer.isBuffer(buf10)); // true
console.log('toJSON', buf10.toJSON()); // { type: 'Buffer', data: [ 116, 104, 105, 115, 32, 105, 115, 32, 98, 117, 102 ] }
console.log('buffer[0]', buf10[0]); // 116
console.log('buffer[0]', typeof buf10[0]); //number

let buf11 = Buffer.from('node buffer')
console.log('buf11 keys', buf11.keys());
for (let i of buf11.keys()) {
    console.log(i);
}
console.log('buf11 values', buf11.values());
for (let j of buf11.values()) {
    console.log(j);
}
console.log('buf11 entries', buf11.entries());
for (let k of buf11.entries()) {
    console.log(k);
}

let buf12 = Buffer.from('AB')
let buf13 = Buffer.from('4142','hex')
let buf14 = Buffer.from('ABC')
console.log(buf12.equals(buf13)); // true
console.log(buf13.equals(buf12)); // true
console.log(buf12.equals(buf14)); // false
console.log(buf14.equals(buf12)); // false

console.log(buf12.indexOf('A')); // 0
console.log(buf12.indexOf('42', 'hex')); // 1

let buf15 = Buffer.from('ABAC')
console.log(buf15.indexOf('A')); // 0
console.log(buf15.lastIndexOf('A')); // 2
console.log(buf15.includes('A')); // true
console.log(buf15.includes('a')); // false

let buf16 = buf15.slice(2)
console.log('buf16', buf16.toString()); // AC
let buf17 = buf15.subarray(2)
console.log('buf17', buf17.toString()); // AC

// slice subarray裁切出来的buffer与源buffer共用相同的内存，所以修改会相互影响
buf16[0]++
buf17[1]--
console.log('buf15', buf15.toString()); // ABBB
console.log('buf16', buf16.toString()); // BB
console.log('buf17', buf17.toString()); // BB

let buf18 = Buffer.from('welcome')
let buf19 = Buffer.alloc(4)
buf18.copy(buf19, 0, 3)
console.log('buf19',buf19.toString()); // come

let buf20 = Buffer.from('wel')
let buf21 = Buffer.from('come')
let buf22 = Buffer.concat([buf20,buf21], buf20.length + buf21.length)
console.log('buf22', buf22.toString()); // welcome

// compare 对比是基于各自 Buffer 实际的字节序列。
let buf23 = Buffer.from('ABCD')
let buf24 = Buffer.from('AB')
let buf25 = Buffer.from('CD')

console.log(buf24.compare(buf23)); // -1 ,即buf24在buf23前面
console.log(buf25.compare(buf23)); // 1 ， 即buf25在buf23后面
console.log(buf23.compare(buf25)); // -1 ， 即buf23在buf25后面

console.log(Buffer.poolSize); // 8192B = 8KB

let buffer = require('buffer')
console.log(buffer.constants.MAX_LENGTH);
console.log(buffer.constants.MAX_STRING_LENGTH);
