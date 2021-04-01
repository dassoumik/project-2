const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class DateList extends Model {}

DateList.init({
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
    dog1_id: {
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
        type: DataTypes.TIME,
        allownull: false,
    },
    location: {
        type: DataTypes.STRING,
        allownull: false,
    },
    zip: {
        type: DataTypes.INTEGER,
        allownull: false,
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'datelist',
});

module.exports = DateList;