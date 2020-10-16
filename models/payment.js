const Sequelize = require('sequelize');

class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        pid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true,
          autoIncrement: true,
        },

        content: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: false,
        },
      },

      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Payment',
        tableName: 'PAYMENT',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  // eslint-disable-next-line no-unused-vars
  static associate(db) {
    db.Payment.belongsTo(db.Content, { foreignKey: 'payment', targetKey: 'pid' });
  }
}
module.exports = Category;
