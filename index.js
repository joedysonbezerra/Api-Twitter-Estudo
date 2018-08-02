const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const Raven = require('./app/services/sentry');

const app = express();
mongoose.connect(dbConfig.url);
requireDir(dbConfig.modelsPath);

app.use(bodyParser.json());
//Raven - tratamento de erro no console externo sentry.io
app.use(Raven.requestHandler());
app.use('/api', require('./app/routes'));
app.use(Raven.errorHandler());

app.listen(3000);
