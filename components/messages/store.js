const Model = require('./model')

const addMessage = (message) => {
  const myMessage = new Model(message)
  myMessage.save()
}
const getMessage = async (filteredUser) => {
  return new Promise((resolve, reject) => {
    let filter = {}
    if (filteredUser !== null) {
      filter = {
        user: new RegExp(filteredUser, 'i')
      }
    }
    Model.find(filter)
      .populate('user')
      .exec((err, populated) => {
        if (err) {
          return reject(err)
        }
        resolve(populated)
      })
  })
}
async function updateMessage(id, message) {
  try {
    const foundMessages = await Model.findById(id)
    foundMessages.message = message
    const newMessage = await foundMessages.save()
    return newMessage
  } catch (err) {
    console.log('Error en updateMessage: ', err)
    const newMessage = ''
    return newMessage
  }
}
const removeMessage = (id) => {
  return Model.deleteOne({
    _id: id,
  })
}

module.exports = {
  add: addMessage,
  list: getMessage,
  update: updateMessage,
  delete: removeMessage
}