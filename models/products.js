'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Categories);
      this.belongsTo(models.Profiles);
      this.hasMany(models.Transactions, {
        foreignKey: 'ProductId'
      });
    }
  }
  Products.init({
    ProfileId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    CloudinaryId: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};