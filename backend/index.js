const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const users = require('./app/users')

const app = express();

const port = 8000;


app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/notebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Mongoose connected")

  app.use('/users', users());

  app.listen(port, error => {
    if (error) return console.error(`Server error ${error}`);
    console.log(`Server started on ${port} port`);
  });
})

