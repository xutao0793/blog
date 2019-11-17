# Vue 数据响应式原理

[[toc]]

## Vue2 数据响应原理简单实现 `Object.defineProperty`

![vue2 reactive](./image/vue2Reactive.png)

**主要两层逻辑：**

-   如果是对象，就使用`Object.defineProperty()`对对象的属性进行数据劫持，将数据属性写成访问器属性
-   如果是数组，就利用对象原型继承和函数劫持的原理改写数组原生的方法

**简单代码实现**

```js
// 模拟触发视图列新
function updateView() {
	console.log('view updated...')
}

// 工具函数
function isObject(val) {
	return typeof val === 'object' && val !== null
}

// 开始：观察数据
function observer(target) {
	if (!isObject(target)) {
		return target
	}
	if (Array.isArray(target)) {
		defineArrayReactive(target)
	} else {
		defineReactive(target)
	}
}

// 对象就使用`Object.defineProperty()`对对象的属性进行数据劫持，将数据属性写成访问器属性
function defineReactive(obj) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			let value = obj[key]
			observer(value)
			Object.defineProperty(obj, key, {
				get() {
					return value
				},
				set(newValue) {
					if (newValue !== value) {
						observer(newValue)
						updateView()
						value = newValue
					}
				}
			})
		}
	}
}

// 是数组，就利用对象原型继承和函数劫持的原理改写数组原生的方法
let oldArrayProto = Array.prototype
let proto = Object.create(oldArrayProto) // 避免改写了Array原型对象，这里基于数组原型对象重新创建一个对象，它会继承数组原型的所有方法。
let arrayMethods = ['push', 'pop', 'shift', 'unshift', 'slice', 'splice']
arrayMethods.forEach(method => {
	proto[method] = function(...args) {
		let insertedValue
		switch (method) {
			case 'splice':
				insertedValue = args.slice(2)
				break
			default:
				insertedValue = args
				break
		}
		updateView()
		observerArray(insertedValue)
		oldArrayProto[method].apply(this, insertedValue)
	}
})

function defineArrayReactive(targetArray) {
	// 数组的操作都是通过Array.prototype上的方法操作，如push/shift等，所以我们要对数组操作进行劫持，就要改写目标数组的原型，将原型指向重写了数组方法的。即函数劫持，劫持数组原型上的方法
	Object.setPrototypeOf(targetArray, proto)
	// targetArray.__proto__ = proto
	observerArray(targetArray)
}

function observerArray(targetArray) {
	for (const item of targetArray) {
		observer(item)
	}
}

let data = {
	name: 'tom',
	arr: [1, 2]
}
observer(data)
```

## Vue 3 数据响应式原理的简单实现 `Proxy`

```js
function isObject(value) {
	return typeof value === 'object' && value !== null
}

function hasOwn(obj, key) {
	return obj.hasOwnProperty(key)
}

function get(target, key, receiver) {
	let ret = Reflect.get(target, key, receiver)
	console.log('get...')
	return isObject(ret) ? reactive(ret) : ret
}

function set(target, key, receiver) {
	let hasKey = hasOwn(target, key)
	let oldValue = target[key]
	let ret = Reflect.set(target, key, receiver)

	if (!hasKey) {
		//TODO: 触发新增属性响应、
		console.log(`ob触发新增属性触发响应 ${key}`)
	} else if (ret !== oldValue) {
		//TODO: 触发更新响应
		console.log(`属性值更新触发响应 ${key}=${ret}`)
	}
}

function deleteProperty(target, key, receiver) {
	let hasKey = hasOwn(target, key)

	if (hasKey) {
		Reflect.defineProperty(target, key)
		console.log(`删除属性触发响应 ${key}`)
	}
}

const handler = {
	get,
	set,
	deleteProperty
}

function createReactiveObject(target) {
	//TODO: 是否已存在代理对象
	//TODO: 是否本身就是proxy对象
	let observed = new Proxy(target, handler)
	//TODO: observed <=> target 映射关系存起业
	return observed
}

function reactive(target) {
	//TODO: 只读对象或只读Proxy对象的判断
	return createReactiveObject(target)
}

let data = {
	a: 1
}

let p = reactive(data)

console.log(p.a)
p.b = { name: 'tom' }
p.b.name = 'jerry'
```
