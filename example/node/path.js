const path = require('path')

let p = 'C:\\path\\dir\\file.txt'

console.log(path.isAbsolute(p))
console.log(path.extname(p))
console.log(path.basename(p))
console.log(path.basename(p, '.txt'))
console.log(path.dirname(p))

let pathObject = path.parse(p)
console.log(pathObject)
let p1 = path.format(pathObject)
console.log(p1)

const url = require('url')
let BASE_URL = 'http://localhost:3000'
let str = '/users?uid=123'
console.log(url.parse(BASE_URL + str, true))
console.log(new URL(BASE_URL + str))

console.log(url.parse(str, true))
console.log(new URL(str))
