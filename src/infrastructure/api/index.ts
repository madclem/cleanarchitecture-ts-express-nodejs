import bodyParser from 'body-parser';
import express from 'express';
import { RegisterRoutes } from '../../../build/routes';
import SwaggerDocument from '../../../build/swagger.json';
import { serve, setup } from 'swagger-ui-express';

import config from './api.config';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/docs', serve, setup(SwaggerDocument));
app.get('/docs', () => {
  
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

RegisterRoutes(app);

const server = app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}`);
});
server.on('error', console.error);

// console.log(app._router.stack);
