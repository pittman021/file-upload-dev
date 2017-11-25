const express = require('express');

const isLoggedIn = require('../services/isLoggedIn');
const models = require('../models/index');

module.exports = app => {
  app.get('/', isLoggedIn, (req, res) => {
    models.file.findAll({ where: { userId: req.user } }).then(files => {
      res.render('home', {
        files: files
      });
    });
  });
};
