const dbConfig = require('../config/dbConfig');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

// authenticate details
sequelize.authenticate()
.then(() => {
    console.log('connected');
})
.catch(err => {
    console.log('Error: ' + err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./usersModel')(sequelize, DataTypes)

// this is used if the table is not there, it would be created once and not over and over again if you se it to true
db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done');
})


module.exports = db
