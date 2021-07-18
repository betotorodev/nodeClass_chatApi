const Model = require('./model')

const add = (chat) => {
  const myChat = new Model(chat)
  return myChat.save()
}
const get = (userId) => {
  return new Promise((resolve, reject) => {
    let filter = {}
    if (userId) {
      filter = {
        users: userId,
      }
    }

    Model.find(filter)
      .populate('users')
      .exec((error, populated) => {
        if (error) {
          return reject(error)
        }
        resolve(populated)
      })
  })
}

module.exports = {
  get,
  add
}