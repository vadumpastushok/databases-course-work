'use strict';

const { Pool } = require('../db/pool.js');

const getMaxOptionId = () => {
  const sql = 'SELECT MAX(id) FROM surveydb.options';
  return new Promise((resolve, reject) => {
    Pool.query(sql, (error, result, fields) => {
      return resolve(result);
    });
  });
};

const getAllOptions = (req, res) => {
  const sql = 'SELECT * from surveydb.options';
  Pool.query(sql, (error, result, fields) => {
    if (error) return res.status(500).json(error);
    result ? res.send(result) : res.sendStatus(404)
  });
};

const getOptionsByQuestionId = (req, res) => {
  const sql = `SELECT * FROM surveydb.options WHERE question_id = ${req.params.id}`
  Pool.query(sql, (error, result, fields) => {
    if (error) return res.status(500).json(error);
    result ? res.send(result) : res.sendStatus(404);
  });
};

const createOption = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  getMaxOptionId().then(data => {
    let maxId = data[0]['MAX(id)'];
    const sql = `INSERT INTO surveydb.options (id, text, question_id, isCorrect) VALUES (${++maxId},\"${req.body.text}\", \"${req.body.question_id}\", ${req.body.isCorrect})`;
    Pool.query(sql, (error, result, fields) => {
      if (error) return res.status(500).json(error);
      result ? res.send(result) : res.sendStatus(404);
    });
  });
};

const deleteOption = (req, res) => {
  const sql = `DELETE FROM surveydb.options WHERE id = ${req.params.id}`
  Pool.query(sql, (error, result, fields) => {
    if (error) return res.status(500).json(error);
    result ? res.send(result) : res.sendStatus(404);
  });
};

const updateOption = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const sql = `UPDATE surveydb.options SET text = \"${req.body.text}\", question_id = \"${req.body.question_id}\", isCorrect = \"${req.body.isCorrect}\" WHERE id = ${req.params.id} `
  Pool.query(sql, (err, result, fields) => {
    if (err) throw err;
    result ? res.send(result) : res.sendStatus(404);
  });   
};

module.exports = { getAllOptions, getOptionsByQuestionId, createOption, updateOption, deleteOption };