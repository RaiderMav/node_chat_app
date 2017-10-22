const expect = require('expect'),
  { Users } = require('./users')

describe(`Users`, () => {
  let users
  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: 2,
      name: 'Bill',
      room: 'React Course'
    }, {
      id: 3,
      name: 'Julie',
      room: 'Node Course'
    }]
  })
  it(`should add new user`, () => {
    let users = new Users()
    let user = {
      id: 444,
      name: 'Billy',
      room: 'The Office Fan'
    }
    let resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it(`should return names for React Course`, () => {
    let userList = users.getUserList('React Course')
    expect(userList.length).toBe(1)
    expect(userList).toEqual(['Bill'])
  })

  it(`should return names for Node course`, () => {
    let userList = users.getUserList('Node Course')
    expect(userList.length).toBe(2)
    expect(userList).toEqual(['Mike', 'Julie'])
  })

  it(`should remove a user`, () => {
    let userId = 2
    let removedUser = users.removeUser(userId)
    expect(users.users.length).toBe(2)
    expect(removedUser.id).toBe(userId)
  })

  it(`should not remove user`, () => {
    let userId = 55
    let removedUser = users.removeUser(userId)
    expect(removedUser).toBeFalsy()
    expect(users.users.length).toBe(3)
  })

  it(`should find user`, () => {
    let userId = 1
    let target = users.users[0]
    let targetedUser = users.getUser(userId)
    expect(targetedUser).toMatchObject(target)
    expect(targetedUser.id).toBe(userId)
  })
  it(`should not find user`, () => {
    let userId = 5
    let targetedUser = users.getUser(userId)
    expect(targetedUser).toBeFalsy()
  })
})
