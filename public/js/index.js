let socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.emit('createMessage', {
  from: 'Helen Mirren',
  text: 'Yup, I wanna bang you!'

})

socket.on('newMessage', function (message) {
  console.log('newMessage', message)
})

socket.on('disconnect', function () {
  console.log(`Disconnected from server`)
})

