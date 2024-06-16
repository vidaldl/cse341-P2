const routes = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

routes.use('/', require('./swagger'));
routes.use('/companies', requiresAuth(), require('./companies'));
routes.use('/vending', requiresAuth(), require('./vending'));


module.exports = routes