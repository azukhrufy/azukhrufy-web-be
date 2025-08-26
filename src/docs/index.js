const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDef = require('./swaggerDef');

const options = {
  swaggerDefinition: swaggerDef,
  apis: ['src/routes/v1/*.js', 'src/docs/*.yml'], // sesuaikan
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
