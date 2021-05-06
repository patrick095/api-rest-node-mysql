const express = require('express');
const cors = require('cors');
const requireDir = require('require-dir');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const PORT = process.env.PORT;

//iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

//models
requireDir('./models/');

//Rotas
app.use('/', require('./routes'));

module.exports = app;