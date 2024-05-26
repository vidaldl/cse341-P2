const routes = require('express').Router();

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/api-docs', swaggerUI.serve);
routes.get('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = routes;