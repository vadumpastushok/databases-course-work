'use strict';

const express = require('express');
const { Pool } = require('./db/pool.js');
const { getQuestion, getAllQuestions, createQuestion, deleteQuestion, updateQuestion } = require('./controller/controllers.js')

const app = express();
const jsonParse = express.json();

app.get('/question/:id', getQuestion);
app.get('/questions/', getAllQuestions);
app.post('/question/', jsonParse, createQuestion);
app.put('/question/:id', jsonParse, updateQuestion);
app.delete('/question/:id', deleteQuestion);

app.listen(3000);