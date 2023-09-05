import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const currentDir = dirname(currentFilePath)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: [resolve(currentDir,'../../docs/**/*.yaml')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;