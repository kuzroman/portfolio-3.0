const http = require('http')

const host = 'localhost'
const port = 8010

const leaders = function (req, res) {
  res.setHeader('Content-Type', 'application/json')

  switch (req.url) {
  case '/books':
    res.writeHead(200)
    res.end('{"message": "This is 11"}')
    break
  case '/authors':
    res.writeHead(200)
    res.end('{"message": "This is 2222"}')
    break
  default:
    res.writeHead(404)
    res.end(JSON.stringify({ error: 'Resource not found' }))
  }
}

const httpServer = http.createServer(leaders)
httpServer.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://${host}:${port}`)
})

