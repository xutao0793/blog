const http = require('http')

const PORT = 3000
const HOST = 'localhost'

const srv = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'application/json')

	const { method, url } = req
	const { pathname, searchParams } = new URL(url, `http://${HOST}:${PORT}`)

	if (url === 'favicon.ico') {
		return
	}

	if (method === 'GET' && pathname === '/users') {
		let uid = searchParams.get('uid')
		console.log('uid', uid)
		let resData = {
			uid: uid,
			name: 'tom',
			age: 20,
			sex: 'boy'
		}
		res.write(JSON.stringify(resData), 'utf8')
		res.end()
		return
	} else {
		req.pipe(res)
	}
})
srv.listen(PORT, HOST, () => {
	console.log(`server is runnig at http://${HOST}:${PORT}`)
})
