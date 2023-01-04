'use strict';

const { Pool } = require('../db/pool.js');

const getMaxQuestionId = () => {
  const sql = 'SELECT MAX(id) FROM surveydb.questions';
  return new Promise((resolve, reject) => {
    Pool.query(sql, (error, result, fields) => {
      return resolve(result);
    });
  });
};

const getQuestion = (req, res) => {
  const sql = `SELECT * FROM surveydb.questions WHERE id = ${req.params.id}`
  Pool.query(sql, (error, result, fields) => {
    if (error) return res.status(500).json(error);
    result ? res.send(result) : res.sendStatus(404);
  });
};

const getAllQuestions = (req, res) => {
  const sql = 'SELECT * from surveydb.questions';
  Pool.query(sql, (error, result, fields) => {
    if (error) return res.status(500).json(error);
    result ? res.send(result) : res.sendStatus(404)
  });
};

const createQuestion = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  getMaxQuestionId().then(data => {
    let maxId = data[0]['MAX(id)'];
    const sql = `INSERT INTO surveydb.questions (id, type, text, quiz_id) VALUES (${++maxId},\"${req.body.type}\", \"${req.body.text}\", ${req.body.quiz_id})`;
    Pool.query(sql, (error, result, fields) => {
      if (error) return res.status(500).json(error);
      result ? res.send(result) : res.sendStatus(404);
    });
  });
};

const deleteQuestion = (req, res) => {
  const sql = `DELETE FROM surveydb.questions WHERE id = ${req.params.id}`
  Pool.query(sql, (error, result, fields) => {
    if (error) return res.status(500).json(error);
    result ? res.send(result) : res.sendStatus(404);
  });
};

const updateQuestion = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const sql = `UPDATE surveydb.questions SET type = \"${req.body.type}\", text = \"${req.body.text}\", quiz_id = \"${req.body.quiz_id}\" WHERE id = ${req.params.id} `
  Pool.query(sql, (err, result, fields) => {
    if (err) throw err;
    result ? res.send(result) : res.sendStatus(404);
  });   
};

module.exports = { getQuestion, getAllQuestions, createQuestion, deleteQuestion, updateQuestion };