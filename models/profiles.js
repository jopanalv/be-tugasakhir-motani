'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users);
      this.hasMany(models.Products, {
        foreignKey: 'ProfileId'
      });
      this.hasMany(models.Transactions, {
        foreignKey: 'ProfileId'
      });
    }
  }
  Profiles.init({
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    CloudinaryId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profiles',
  });
  return Profiles;
};