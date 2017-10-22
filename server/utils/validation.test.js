const expect = require('expect'),
  {isRealString} = require('./validation')

describe('isRealString', () => {
  it(`should reject non-string values`, () => {
    let string = 123
    expect(isRealString(string)).toBe(false)
  })
  it('should reject strings with only spaces', () => {
    let string = '     '
    expect(isRealString(string)).toBe(false)
  })
  it(`should allow string with non-space characters`, () => {
    let string = '*$(_^       *#'
    expect(isRealString(string)).toBe(true)
  })
})
