const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio')

const routes = require('./routes');

const app = express();

app.use(routes);



module.exports = app;
