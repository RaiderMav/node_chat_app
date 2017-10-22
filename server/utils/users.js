[{
  id: '/#12podfalkdfi',
  name: 'William',
  room: 'The Office Fans'
}]

// Add user info (id, name, roomName)
// removeUser via socket.id
// getUser(id)
// getUserList(room) => return list of names

class Users {
  constructor () {
    this.users = []
  }
  addUser (id, name, room) {
    let user = {
      id,
      name,
      room
    }
    this.users.push(user)
    return user
  }
  removeUser (id) {
    // return user that was removed
    let user = this.getUser(id)
    if (user) {
      this.users = this.users.filter(user => user.id !== id)
    }
    return user
  }
  getUser (id) {
    return this.users.filter(user => user.id === id)[0]
  }
  getUserList (room) {
    // iterate through room looking for name
    let userNames = this.users.filter(user => user.room === room).map(user => user.name)
    return userNames
  }

}

module.exports = { Users }

// class Person {
//   constructor (name, age) {
//     this.name = name,
//     this.age = age
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old`
//   }
// }

// let me = new Person('William', 44)
// let description = me.getUserDescription()
// console.log(description)
