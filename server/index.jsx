/* eslint-disable no-console */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../services/reviews/src/App';
import layout from './layout';

const express = require('express');
const path = require('path');
// const controller = require('./controller');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, 'services', 'reviews', 'public');

console.log(PUBLIC_DIR);

app.use('/', express.static(`.${PUBLIC_DIR}`));

app.use('/homes/:listingId', (req, res) => {
  const { listingId } = req.params;
  res.send(layout(<App listingId={listingId} />));
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
