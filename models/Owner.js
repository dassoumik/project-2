const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Owner extends Model {}


Owner.init({
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
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
  },
  gender: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    allownull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id',
    }
  }
}, {

  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'owner',
});

module.exports = Owner;