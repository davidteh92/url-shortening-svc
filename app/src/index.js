const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const createError = require('http-errors');

// Import Routes
const api = require('./routes/api');


mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    if (err) {
      console.log('Unable to connect to database: ' + err);
      process.exit(1);
    } else {
      console.log('Successfully connected to the database');
    }
  });

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/health-check', api.healthCheck);
app.get('/:shortUrl', api.shortUrl);
app.post('/encode', api.encodeUrl);
app.post('/decode', api.decodeUrl);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res) => {
  const status = err.status || 500;
  res.status(status).json(err.message);
});

app.listen(process.env.PORT || 4000, () => console.log('Server is up and running at port 4000'));

module.exports = app;