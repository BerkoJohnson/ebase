const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const multer  = require('multer')

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'dist/ebase')));
app.use(morgan('dev'));

fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
  require('./routes/'+file)(app);
});

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
  app.listen(port)
    .on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
      }
    }).on('listening', () => {
      console.log(`Server listening on port ${port}. You can now visit http://localhost:${port}`);
    }).on('close', () => {
      console.log('Server closed. Good bye');
    });
});
