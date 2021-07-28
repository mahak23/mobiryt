const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../../../dbConnection");
const { Membership } = require('./membershipModel');

class User extends Model { };

User.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    emailId: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    addressLine1: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    addressLine2: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    town: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    postCode: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    county: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    telephone: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    mobile: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    userInfo: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    photo: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    photoBase64: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    photoID: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    defaultTimeZone: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    active: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },
    isVerified: {
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

    isFirstTimeLoggedIn: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        default: 1
    },
}, {
    sequelize,
    modelName: 'users',
    timestamps: true,
    updatedAt: 'updatedOn',
    createdAt: 'createdOn'
});

User.sync({}).then(() => { });

module.exports = {
    User,
};