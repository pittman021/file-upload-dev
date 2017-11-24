const express = require('express');

const isLoggedIn = require('../services/isLoggedIn');

module.exports = app => {
  app.get('/', isLoggedIn, (req, res) => {
    res.render('home');
  });
};
