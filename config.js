require('dotenv').config({ path: ".env" });

const config = {
  DB_URL: process.env.DB_CONNECTION,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
}

module.exports = config