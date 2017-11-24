'use strict';

const keys = require('../keys');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const db = {};

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

// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return file.indexOf('.') !== 0 && file !== 'index.js';
//   })
//   .forEach(function(file) {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach(function(modelName) {
//   if ('associate' in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('../models/user')(sequelize, Sequelize);
db.file = require('../models/file')(sequelize, Sequelize);

db.file.belongsTo(db.user);
db.user.hasMany(db.file);

module.exports = db;
