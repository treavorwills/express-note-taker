const express = require('express');
const apiRouter = require('./apiRouter');

const app = express();

app.use('/notes', apiRouter);

module.exports = app;
