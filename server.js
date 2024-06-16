const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { errorHandler } = require('./middleware/errorHandler');
const port = 3000;
const dotenv = require('dotenv');
dotenv.config();


// Auth Setup
const { auth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: 'cnRHoVV850wSQzi9TzXDxic05xgsgsBM',
  issuerBaseURL: 'https://dev-3spjq07b2t223qop.us.auth0.com'
};


// Routes
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(auth(config))
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