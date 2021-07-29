const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../../../dbConnection");

class Membership extends Model { };

Membership.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    accountId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'memberships',
    timestamps: true,
    updatedAt: false,
    createdAt: 'createdOn'
});

Membership.sync({}).then(() => { });

module.exports = {
    Membership,
};