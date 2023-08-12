const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

module.exports = {
  connection: mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
};