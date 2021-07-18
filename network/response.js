const chalk = require('chalk')

const STATUS_MESSAGE = {
  '200': 'Done',
  '201': 'Created',
  '400': 'Invalid Format',
  '500': 'Internal Server Error'
}

exports.success = function(req, res, message, status = 200) {
  let statusMessage = STATUS_MESSAGE[status];

  res.status(status).send({
    error: '',
    status: statusMessage,
    body: message
  })
}

exports.error = function(req, res, message, status = 500, details) {
  if (details) console.error(chalk.red(`[response error] ${details}`))
  res.status(status).send({
      error: message,
      body: ''
    })
}