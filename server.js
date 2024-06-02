const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { errorHandler } = require('./middleware/errorHandler');
const port = 3000;

// Routes
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  .use(errorHandler);

const mongodb = require('./db/connect');

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});