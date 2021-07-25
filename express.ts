import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';

import { api } from './routes';

const app = express();

app.use(cors());

app.use(helmet());

app.use(json());
app.use(urlencoded({ extended : false}));
app.use('/',express.static(__dirname));

// REST API entry point
app.use('/campaigns', api)

export { app }