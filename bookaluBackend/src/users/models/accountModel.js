const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../../../dbConnection");

class Account extends Model { };

Account.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'accounts',
    timestamps: true,
    updatedAt: 'updatedOn',
    createdAt: 'createdOn'
});


Account.sync({}).then(() => { });

module.exports = {
    Account,
};