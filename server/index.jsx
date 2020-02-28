/* eslint-disable no-console */
import React from 'react';
import App from '../services/reviews/src/App';
import axios from 'axios';
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

  // API call
  axios.get(`http://localhost:3001/api/reviews/${listingId}`)
    .then((response) => {
      res.send(layout(<App listingId={listingId} payload={response.data} />));
    })
    .catch(() => {
      res.send(layout(<App listingId={listingId} />));
    });
});

app.use('/', (req, res) => {
  res.redirect('/homes/1');
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
