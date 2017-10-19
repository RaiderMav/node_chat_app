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
  console.log(`New user connected`)

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log(`createMessage`, message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: message.createdAt
    })
  })

  // io.emit('newMessage', {
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // })
    // socket.broadcast.emit('createMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
