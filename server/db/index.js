const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

module.exports = {
  connection: mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'invites'
  })
};