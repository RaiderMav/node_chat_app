const path = require('path'),
  publicPath = path.join(__dirname, '../public'),
  express = require('express'),
  app = express(),
  PORT = process.env.PORT || 3000,
  socketIO = require('socket.io'),
  http = require('http'),
  server = http.createServer(app),
  io = socketIO(server),

  { generateMessage, generateLocationMessage } = require('./utils/message')

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log(`New user connected`)

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message, callback) => {
    console.log(`createMessage`, message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback(`This is from the server`)
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage(`Admin`, coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
