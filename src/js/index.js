'use strict';

const express = require("express");
const { Pool } = require('./db/pool.js');

const app = express();
const jsonParse = express.json();

app.get("/question/:id", function (req, res) {
  const sql = `SELECT * FROM surveydb.questions WHERE id = ${req.params.id}`

  Pool.connect(function (err) {
    if (err) throw err;

    Pool.query(sql, (err, result, fields) => {
      if (err) throw err;
      console.log(result);
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.get("/questions/", function (req, res) {
  Pool.connect(function (err) {
    if (err) throw err;

    Pool.query(`SELECT * from surveydb.questions`, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404)
    });
  });
});

app.post("/question/", jsonParse, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const sql = `INSERT INTO surveydb.questions (id, type, text, quiz_id) VALUES (${req.body.id},\"${req.body.type}\", \"${req.body.text}\", ${req.body.quiz_id})`;

  Pool.connect(function (err) {
    if (err) throw err;

    Pool.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.delete("/question/:id", function (req, res) {
  const sql = `DELETE FROM surveydb.questions WHERE id = ${req.params.id}`

  Pool.connect(function (err) {
    if (err) throw err;
    Pool.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.put("/question/:id", jsonParse, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);

  Pool.connect(function (err) {
    if (err) throw err;

    const sql = `UPDATE surveydb.questions SET type = \"${req.body.type}\", text = \"${req.body.text}\", quiz_id = \"${req.body.quiz_id}\" WHERE id = ${req.params.id} `
    Pool.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.listen(2222);