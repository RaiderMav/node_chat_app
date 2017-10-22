const path = require('path'),
  publicPath = path.join(__dirname, '../public'),
  express = require('express'),
  app = express(),
  PORT = process.env.PORT || 3000,
  socketIO = require('socket.io'),
  http = require('http'),
  server = http.createServer(app),
  io = socketIO(server),
  {isRealString} = require('./utils/validation'),

  { generateMessage, generateLocationMessage } = require('./utils/message'),
  {Users} = require('./utils/users')

let users = new Users()

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log(`New user connected`)

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required')
    }
    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))

    // io.emit (targeting all) -> io.to('The Office Fans').emit
    // socket.broadcast.emit (targeting all but sender) -> socket.broadcast.to('The Office Fans').emit
    // socket.emit (one specific user targeted)

    socket.emit('newMessage', generateMessage(`${params.room} Admin`, `Welcome to the ${params.room} room`))

    socket.broadcast.to(params.room).emit('newMessage', generateMessage(`${params.room} Admin`, `${params.name} has joined`))

    callback()
  })

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id)
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
    }
    callback()
  })

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id)
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name}`, coords.latitude, coords.longitude))
    }
  })

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id)
    if (user) {
      io.to(user.room).emit(`updateUserList`, users.getUserList(user.room))
      io.to(user.room).emit(`newMessage`, generateMessage(`Admin`, `${user.name} has left`))
    }
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
