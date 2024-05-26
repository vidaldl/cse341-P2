const routes = require('express').Router();


routes.use('/', require('./swagger'));
routes.use('/companies', require('./companies'));


module.exports = routes