const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact API',
    description: 'A simple CRUD API for managing contacts'
  },
  host: 'localhost:3000'
  // host: 'cse341-p2-p2cj.onrender.com'
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);