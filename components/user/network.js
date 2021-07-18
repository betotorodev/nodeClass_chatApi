const express = require('express')
const response = require('../../network/response')
const controler = require('./controler')
const router = express.Router()

// get
router.get('/', (req, res) => {
  controler.getUsers()
    .then(usersList => {
      response.success(req, res, usersList, 200)
    })
    .catch(error => {
      response.error(req, res, 'Unexpected error', 500, error)
    })
})
// post
router.post('/', (req, res) => {
  const name = req.body.name
  controler.addUser(name)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err)
    })
})

module.exports = router