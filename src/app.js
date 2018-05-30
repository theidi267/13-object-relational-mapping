'use strict';

import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './api/api.js';

import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

mongoose.connect(process.env.MONGODB_URI);

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(router);

app.use(notFound);
app.use(errorHandler);

let isRunning = false;

module.exports = {
  start: (port) => {
    if(! isRunning) {
      app.listen(port, (err) => {
        if(err) { throw err; }
        isRunning = true;
        console.log(`Server up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
  stop: () => {
    app.close( () => {
      isRunning = false;
      console.log('Server has been stopped');
    });
  },
};

