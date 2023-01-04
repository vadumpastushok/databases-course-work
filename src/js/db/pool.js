'use strict';

const mysql = require('mysql2');

const Pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "F886513l",
  database: "surveydb"
});

module.exports = { Pool };