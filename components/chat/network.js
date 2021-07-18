const express = require('express')
const response = require('../../network/response')
const controler = require('./controler')
const router = express.Router()

// get
router.get('/:userId', (req, res) => {
  const id = req.params.id
  controler.getChats(id)
    .then(users => {
      response.success(req, res, users, 201)
    })
    .catch(err => {
      response.error(req, res, 'Chat get error', 500, err)
    })
})
// post
router.post('/', (req, res) => {
  const users = req.body.users
  controler.addChat(users)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Chat post error', 500, err)
    })
})

module.exports = router