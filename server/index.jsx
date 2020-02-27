/* eslint-disable no-console */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../services/reviews/App';

const express = require('express');
const path = require('path');
// const controller = require('./controller');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

app.use('/', express.static(PUBLIC_DIR));

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
  console.log(ReactDOMServer.renderToString(<App />));
});
