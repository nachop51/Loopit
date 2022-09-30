const { Sequelize } = require('sequelize')
const { database } = require('./configORM')

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,
    {
        host: database.host,
        dialect: 'mysql'
    }
    );

module.exports = sequelize;