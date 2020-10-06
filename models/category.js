const Sequelize = require('sequelize');

class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        cid: {
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
        modelName: 'Category',
        tableName: 'CATEGORY',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  // eslint-disable-next-line no-unused-vars
  static associate(db) {
    db.Category.hasMany(db.Content, { foreignKey: 'category', sourceKey: 'cid' });
    db.Category.belongsTo(db.CategoryType, { foreignKey: 'type', targetKey: 'typeid' });
  }
}
module.exports = Category;
