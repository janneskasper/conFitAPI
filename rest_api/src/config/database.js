const {Sequelize} = require("sequelize")

const db = new Sequelize("test", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres",
    logging: console.log,
});

module.exports = db
