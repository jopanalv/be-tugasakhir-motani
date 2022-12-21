'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Profiles);
      this.belongsTo(models.Products);
    }
  }
  Review.init({
    ProfileId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    rate: DataTypes.DOUBLE,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};