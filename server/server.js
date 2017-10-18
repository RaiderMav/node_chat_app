const path = require('path'),
  publicPath = path.join(__dirname, '../public'),
  express = require('express'),
  app = express(),
  PORT = process.env.PORT || 3000,
  socketIO = require('socket.io'),
  http = require('http'),
  server = http.createServer(app),
  io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log(`New user connect`)

  socket.emit('newMessage', {
    from: 'Helen',
    text: 'I need you',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
