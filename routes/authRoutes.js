module.exports = app => {
  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });
};
