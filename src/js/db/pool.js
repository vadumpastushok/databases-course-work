'use strict';

const mysql = require('mysql2');

const Pool = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "ikuex4hATLTJzMli",
  database: "surveydb",
  port: 3306
});

module.exports = { Pool };