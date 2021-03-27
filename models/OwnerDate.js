const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class OwnerDate extends Model {}

OwnerDate.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    owner1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'owner',
            key: 'id',
        },
    },
    owner2_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'owner',
            key: 'id',
        },
    },
    date_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'date',
            key: 'id',
        },
    },
    
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'owner_date',
});

module.exports = OwnerDate;