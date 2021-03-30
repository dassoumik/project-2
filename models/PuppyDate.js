const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class PuppyDate extends Model {}

PuppyDate.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    participant1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'owner',
            key: 'id',
        },
    },
    participant2_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'owner',
            key: 'id',
        },
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
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allownull: false,
    },
    location: {
        type: DataTypes.STRING,
        allownull: false,
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'puppydate',
});

module.exports = PuppyDate;