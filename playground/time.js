// Unix Epoch Jan 1st 1970 00:00:00

const moment = require('moment')

// let createdAt = new Date().getTime()
// let date = moment(createdAt)
// console.log(date.format('MMM Do YYYY, h:mm:ss a'))
// console.log(date.startOf('year').fromNow())
// console.log(date.locale())

// console.log(date.add(5, 'days').subtract(2, 'months'))

// console.log(date.format('h:mm a'))
// console.log(date.format('h:mm a'))
new Date().getTime()
let someTimeStamp = moment().valueOf()
console.log(someTimeStamp)

