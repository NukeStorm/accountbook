const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userid: {
          type: Sequelize.STRING(25),
          allowNull: false,
          unique: true,
          primaryKey: true,
        },

        pw: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'USER',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  // eslint-disable-next-line no-unused-vars
  static associate(db) {
    db.User.hasMany(db.Content, { foreignKey: 'userid', sourceKey: 'userid' });
  }
}
module.exports = User;
