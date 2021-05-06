const express = require('express');
const cors = require('cors');
const requireDir = require('require-dir');

//iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

//models
requireDir('./models/');

//Rotas
app.use('/', require('./routes'));

module.exports = app;