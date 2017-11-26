module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return User;
};
