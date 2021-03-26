const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Dog extends Model {}

Dog.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allownull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allownull: true,
  },
  image: {
    type: DataTypes.STRING,
    allownull: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'owner',
      key: 'id',
    }
  }
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'dog',
});

module.exports = Dog;