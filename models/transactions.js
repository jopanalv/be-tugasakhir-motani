'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
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
  Transactions.init({
    BuyerId: DataTypes.INTEGER,
    SellerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    offer_price: DataTypes.INTEGER,
    start_rent: DataTypes.DATE, 
    duration: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};