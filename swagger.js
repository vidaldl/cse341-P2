const swaggerAutogen = require('swagger-autogen')();





const doc = {
  info: {
    title: 'Contact API',
    description: 'A simple CRUD API for managing contacts'
  },
  // host: 'localhost:3000',
  host: 'cse341-p2-p2cj.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    auth0: {
        type: 'oauth2',
        authorizationUrl: 'https://dev-3spjq07b2t223qop.us.auth0.com/authorize',
        tokenUrl: "https://dev-3spjq07b2t223qop.us.auth0.com/oauth/token",
        flow: 'implicit',
        scopes: {

        },
    },
},
security: [{
    auth0: []
}]
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);