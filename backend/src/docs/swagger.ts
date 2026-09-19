import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hackathon API',
      version: '1.0.0',
      description: 'API documentation for the MERN Starter',
    },
    servers: [
      { url: 'http://localhost:5000' }
    ],
  },
  // This tells Swagger to scan all files in the routes folder for comments!
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app?: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Swagger docs available at http://localhost:5000/api-docs');
};
