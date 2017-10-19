const expect = require('expect'),
  {generateMessage} = require('./utils/message')

describe('generateMessage', () => {
  it(`should generate correct message object`, () => {
    let from = 'Holly'
    let text = 'Love to see you again'
    let message = generateMessage(from, text)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({from, text})
  })
})
