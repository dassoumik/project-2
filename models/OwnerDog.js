const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class OwnerDog extends Model {}

OwnerDog.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'owner',
            key: 'id',
        },
    },
    dog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'dog',
            key: 'id',
        },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'owner_dog',
});

module.exports = OwnerDog;