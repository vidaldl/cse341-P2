const routes = require('express').Router();


routes.use('/', require('./swagger'));
routes.use('/companies', require('./companies'));
routes.use('/vending', require('./vending'));


module.exports = routes