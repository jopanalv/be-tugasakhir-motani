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
    }
  }
  Products.init({
    ProfileId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    CloudinaryId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};