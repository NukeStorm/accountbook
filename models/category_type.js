const Sequelize = require('sequelize');

class CategoryType extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        typeid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: false,
        },
      },

      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'CategoryType',
        tableName: 'CATEGORY_TYPE',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  // eslint-disable-next-line no-unused-vars
  static associate(db) {
    db.CategoryType.hasMany(db.Category, { foreignKey: 'type', sourceKey: 'typeid' });
  }
}
module.exports = CategoryType;
