const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const keys = require('./keys');

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize('file_upload_database', keys.username, keys.password, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// testing DB Connection //
sequelize
  .authenticate()
  .then(() => {
    console.log('connection established');
  })
  .catch(err => {
    console.err('unable to connect', err);
  });

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

const File = sequelize.define('file', {
  filename: Sequelize.STRING,
  path: Sequelize.STRING
});

// Creating User Table
User.sync({ force: true }).then(() => {
  return User.create({
    firstName: 'Tim',
    lastName: 'Pittman'
  });
});

File.sync({ force: true }).then(() => {
  return File.create({
    filename: 'myfile.js',
    path: '/users/files/path'
  });
});

File.belongsTo(User);

const PORT = 5000;
app.listen(PORT, () => {
  console.log('server running on', PORT);
});
