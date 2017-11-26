module.exports = function(sequelize, Sequelize) {
  const File = sequelize.define('file', {
    filename: Sequelize.STRING,
    path: Sequelize.STRING
  });
  return File;
};
