const fs = require('fs');
// fs.open(__dirname + '/fs_open.txt', 'r+', (err,fd) => {
//     if (err) {
//         return console.error(err)
//     }
//     console.log(`文件打开成功，文件描述符fd：${fd}`);
// })

// try {
//     let fd = fs.openSync(__dirname + '/fs_open.txt', 'r+')
//     console.log(`文件打开成功，文件描述符fd：${fd}`);
// } catch (err) {
//     return console.error(err)
// }

// fs.stat(__dirname + '/fs_open.txt',(err,stats) => {
//     if (err) {
//         return console.error(err)
//     }
//     console.log(stats.isFile());
//     console.log(stats);
// })

// fs.mkdir(__dirname + '/fs', (err) => {
//     if (err) {
//         return console.error(err)
//     }
//     console.log('目录创建成功');
// })

// fs.readdir(__dirname + '/fs', (err, files) => {
//     if (err) {
//         return console.error(err)
//     }
//     console.log(files)
// })

fs.rmdir(__dirname + '/fs',(err) => {
    if (err) {
        return console.error(err)
    }
    console.log('删除成功');
})