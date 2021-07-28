const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../../../dbConnection");

class Login extends Model { };

Login.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    loginName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    loginPassword: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    loginPasswordSalt: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    locked: {
        type: DataTypes.TINYINT(1),
        allowNull: false
    },
    loginMethod: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    passwordChangedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    changePasswordAtLogon: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },

    active: {
        type: DataTypes.TINYINT(1),
        allowNull: false
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
    modelName: 'login',
    timestamps: true,
    updatedAt: 'updatedOn',
    createdAt: 'createdOn'
});


Login.sync({}).then(() => { });

module.exports = {
    Login,
};