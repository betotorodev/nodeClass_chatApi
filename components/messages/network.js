const express = require('express')
const multer = require('multer')
const response = require('../../network/response')
const controler = require('./controler')

const router = express.Router()
const upload = multer({
  dest: 'public/files/',
})

// route get
router.get('/', (req, res) => {
  const filteredMessages = req.query.chat || null
  controler.getMessages(filteredMessages)
    .then(messageList => {
      response.success(req, res, messageList, 200)
    })
    .catch(error => {
      response.error(req, res, '[message getMessages error] No hay chat o mensaje', 500, error)
    })
})
// route post
router.post('/', upload.single('file'), (req, res) => {
  const chat = req.body.chat
  const user = req.body.user
  const message = req.body.message
  const file = req.file

  controler.addMessage(chat, user, message, file)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201)
    })
    .catch(err => {
      response.error(req, res, 'Información inválida', 400, "error en el controlador")
    })
})
// route put
router.put('/:id', (req, res) => {
  const id = req.params.id
  const data = req.body.message
  controler.updateMessages(id, data)
    .then((result) => {
      response.success(req, res, result, 200)
    })
    .catch(err => {
      response.error(req, res, 'Error interno', 500, err)
    })
})
// route delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  controler.deleteMessage(id) 
    .then(() => {
      response.success(req, res, 'Usuario eliminado', 200)
    })
    .catch(err => {
      response.error(req, res, 'Error interno', 500, err)
    })
})

module.exports = router