const { Sequelize } = require('sequelize');
const { config } = require('./config/config');
const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: 'mysql',
    logging: console.log,
});

module.exports = { sequelize };
