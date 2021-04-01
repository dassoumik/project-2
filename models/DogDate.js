const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class DogDate extends Model {}

DogDate.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    dog1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'dog',
            key: 'id',
        },
    },
    dog2_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'dog',
            key: 'id',
        },
    },
    date_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'puppydate',
            key: 'id',
        },
    },
    
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dog_date',
});

module.exports = DogDate;