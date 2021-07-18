const store = require('./store')
const { socket } = require('../../socket')

const addMessage = (chat, user, message, file) => {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      reject('Los datos están incompletos o incorrectos')
    }

    let fileUrl = ''
    if (file) {
      fileUrl = `http://localhost:3000/app/files/${file.filename}`
    }

    const fullMessage = {
      chat,
      user,
      message,
      date: new Date(),
      file: fileUrl
    }

    store.add(fullMessage)

    socket.io.emit('message', fullMessage)

    resolve(fullMessage)
  })
}
const getMessages = (filteredUser) => {
  return new Promise((resolve, reject) => {
    resolve(store.list(filteredUser))
  })
}
const updateMessages = (id, message) => {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject('Invalid data')
      return false
    }
    const result = await store.update(id, message)
    resolve(result)
  })
}
const deleteMessage = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('no hay id o es inválido')
      return false
    }
    store.delete(id)
      .then((response) => {
        if (response.deletedCount === 0) reject('El usuario no existe')
        resolve()
      })
      .catch(err => reject(err))
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessages,
  deleteMessage
}