/* eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'dist/ebase')));
app.use(morgan('dev'));

require('./routes/user.route')(app);

app.use('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/ebase', 'index.html')));

app.use((error, req, res, next) => {
  return res.status(500).json({
    error
  })
});

mongoose.connect('mongodb://localhost:27017/ebase', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(8000, () => console.log('Server is ready!'));
});