const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect(dbConfig.url);
requireDir(dbConfig.modelsPath);

app.use(bodyParser.json());
app.use('/api', require('./app/routes'));

app.listen(3000);
