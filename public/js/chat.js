let socket = io()

function scrollToBottom () {
  // Selectors
  let messages = $('#messages')
  let newMessage = $('#messages > ul:nth-last-of-type(-n+2) li')
  // Height
  let clientHeight = messages.prop('clientHeight')
  let scrollTop = messages.prop('scrollTop')
  let elementHeight = newMessage.innerHeight()
  let scrollHeight = messages.prop('scrollHeight')

  if ((clientHeight + scrollTop + elementHeight) >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let template = $('#message-template').html()
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })

  $('#messages').append(html)
  scrollToBottom()
})

socket.on('disconnect', function () {
  console.log(`Disconnected from server`)
})

$('#message-form').on('submit', function (e) {
  e.preventDefault()
  let messageTextBox = $('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  })
})

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let template = $('#location-message-template').html()
  let html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  })
  $('#messages').append(html)
  scrollToBottom()
})

let locationButton = $('#send-location')
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert(`Geolocation not supported by your browser`)
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location')
    alert(`Unable to fetch your location`)
  })
})

