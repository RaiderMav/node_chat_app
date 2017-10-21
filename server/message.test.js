const expect = require('expect'),
  { generateMessage, generateLocationMessage } = require('./utils/message')

describe('generateMessage', () => {
  it(`should generate correct message object`, () => {
    let from = 'Holly'
    let text = 'Love to see you again'
    let message = generateMessage(from, text)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({ from, text })
  })
})

describe('generateLocationMessage', () => {
  it('should generate a correct location object', () => {
    let from = 'Mandy'
    let latitude = 43.04040
    let longitude = -42.40201
    let url = `https://www.google.com/maps?=43.04040,-42.40201`
    let message = generateLocationMessage(from, latitude, longitude)

    expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`)
    expect(typeof message.createdAt).toBe('number')
    expect(message.url).toBe(message.url)
    expect(message).toMatchObject({ from, url: message.url })
  })
})
