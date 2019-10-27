const path = require('path');

let p = "C:\\path\\dir\\file.txt"

console.log(path.isAbsolute(p));
console.log(path.extname(p));
console.log(path.basename(p));
console.log(path.basename(p,'.txt'));
console.log(path.dirname(p));

let pathObject = path.parse(p)
console.log(pathObject);
let p1 = path.format(pathObject)
console.log(p1);