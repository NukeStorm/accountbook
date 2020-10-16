const Sequelize = require('sequelize');

class Content extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true,
          autoIncrement: true,
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          unique: false,
        },
        content: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: false,
        },
        payment: {
          type: Sequelize.STRING(45),
          allowNull: true,
          unique: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Content',
        tableName: 'CONTENT',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  // eslint-disable-next-line no-unused-vars
  static associate(db) {
    db.Content.belongsTo(db.User, { foreignKey: 'userid', targetKey: 'userid' });
    db.Content.belongsTo(db.Category, { foreignKey: 'category', targetKey: 'cid' });
    // db.Content.belongsTo(db.Payment, { foreignKey: 'payment', targetKey: 'pid' });
  }
}
module.exports = Content;
