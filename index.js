const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const path = require('path');
const passport = require('passport');
const keys = require('./config/keys');
// const models = require('./models');
require('./services/passport');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set('models', require('./models'));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// testing DB Connection //

// models.sequelize
//   .authenticate()
//   .then(() => {
//     console.log('connection established');
//   })
//   .catch(err => {
//     console.log('unable to connect', err);
//   });
//
// models.sequelize
//   .sync()
//   .then(function() {
//     console.log('Database is good');
//   })
//   .catch(function(err) {
//     console.log('Something went wrong');
//   });

// models.user.sync().then(() => {
//   return models.User.create({
//     username: 'Tim',
//     password: '123455'
//   });
// });

// models.file.sync({ force: true }).then(() => {
//   return models.user.create({
//     filename: 'myfile.js',
//     path: '/uploads/myfile.js',
//     userId: 1,
//     owner_id: null
//   });
// });

// app routes //

require('./routes/fileUpload')(app);
require('./routes/index')(app);
require('./routes/authRoutes')(app);

app.post('/login', passport.authenticate('local-login', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

app.post('/signup', passport.authenticate('local-signup', { failureRedirect: '/singup' }), (req, res) => {
  res.redirect('/');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server running on', PORT);
});
