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
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        content: {
          type: Sequelize.STRING(30),
          allowNull: false,
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
  }
}
module.exports = Content;
