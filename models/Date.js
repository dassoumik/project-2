const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Date extends Model {}

Date.init({
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
        type: DataTypes.DATE,
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
    modelName: 'date',
});

module.exports = Date;