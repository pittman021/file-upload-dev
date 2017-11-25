'use strict';

const keys = require('../config/keys');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const db = {};

const sequelize = new Sequelize('file_upload_database', keys.username, keys.password, {
  host: keys.DATABASE_URL,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('../models/user')(sequelize, Sequelize);
db.file = require('../models/file')(sequelize, Sequelize);

db.file.belongsTo(db.user);
db.user.hasMany(db.file);

module.exports = db;
