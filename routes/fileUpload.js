const multer = require('multer');
const models = require('../models/index');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {
    // const index = file.mimetype.indexOf('/');
    // const slice = file.mimetype.slice(index + 1);
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

module.exports = app => {
  app.post('/upload', upload.single('filetoUpload'), (req, res) => {
    const file = req.file.originalname;
    const path = req.file.path;
    const owner = req.user;
    models.file
      .create({
        filename: req.file.originalname,
        path: path,
        userId: owner
      })
      .then(file => {
        res.redirect('/');
      });
  });
};
