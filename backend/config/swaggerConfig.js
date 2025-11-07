const swaggerJSDoc = require('swagger-jsdoc');
// const s = require('../routes/index')

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',  // Use OpenAPI 3.0 specification
    info: {
      title: 'Node.js API',
      version: '1.0.0',
      description: 'A simple API',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
    //   servers: [
    //     {
    //       url: 'http://localhost:8000',
    //     },
    //   ],
    },
  },
  apis: ['../routes/*.js'], // Path to the API docs (JSDoc comments)
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
