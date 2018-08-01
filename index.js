const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database');

const app = express();
mongoose.connect(dbConfig.url);

app.listen(3000);
