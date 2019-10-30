const http = require('http')
const querystring = require('querystring')

const BASE_URL = 'http://localhost:3000/'

const options = {
	headers: {
		'Content-Type': 'application/json'
	}
}

const req = http.get(`${BASE_URL}users?uid=123`, options, res => {
	const { statusCode, statusMessage } = res

	let error
	if (statusCode !== 200) {
		error = new Error(`查询失败：${statusCode}:${statusMessage}`)
	}
	if (error) {
		console.error(error.message)
		return
	}

	res.setEncoding('utf8')
	let body = ''
	res.on('data', chunk => {
		body += chunk
	})
	res.on('end', () => {
		try {
			console.log('body:', JSON.parse(body))
		} catch (error) {
			console.log(`${error.code}-${error.message}`)
		}
	})
})

req.on('error', e => {
	console.log('req请求错误：', e)
})
