const mysql = require('mysql2/promise')
require('dotenv').config()

const host = process.env.MYSQL_ADDON_HOST || process.env.DB_HOST
const user = process.env.MYSQL_ADDON_USER || process.env.DB_USER
const password = process.env.MYSQL_ADDON_PASSWORD || process.env.DB_PASSWORD
const database = process.env.MYSQL_ADDON_DB || process.env.DB_NAME
const port = process.env.MYSQL_ADDON_PORT || process.env.DB_PORT || 3306

const db = mysql.createPool({ host, user, password, database, port })

module.exports = db
