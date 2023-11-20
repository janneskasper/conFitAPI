const {Sequelize} = require("sequelize")

const db = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: console.log,
});

module.exports = db
