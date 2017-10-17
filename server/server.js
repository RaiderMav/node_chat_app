const path = require('path'),
  publicPath = path.join(__dirname, '../public'),
  express = require('express'),
  app = express(),
  PORT = process.env.PORT || 3000

app.use(express.static(publicPath))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
