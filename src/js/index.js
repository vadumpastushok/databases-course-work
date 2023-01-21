'use strict';

const express = require('express');
const { Pool } = require('./db/pool.js');
const { getAllOptions, getOptionsByQuestionId, createOption, updateOption, deleteOption} = require('./controller/controllers.js')

const app = express();
const jsonParse = express.json();

app.get('/options/', getAllOptions);
app.get('/options/:id', jsonParse, getOptionsByQuestionId);
app.post('/option/', jsonParse, createOption);
app.put('/option/:id', jsonParse, updateOption);
app.delete('/option/:id', jsonParse, deleteOption);

app.listen(3000);