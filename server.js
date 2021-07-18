const express = require('express')
const app = express()
const server = require('http').Server(app)

const config = require('./config')
const cors = require('cors')
const socket = require('./socket')
const db = require('./db')
const router = require('./network/routes')

db(config.DB_URL)

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

socket.connect(server)
router(app)

app.use('/app', express.static('public'))

server.listen(config.PORT, () => {
  console.log(`La aplicación está escuchando en ${config.HOST}:${config.PORT}`)
})