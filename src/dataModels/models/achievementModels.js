const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../../config/databaseConfig")

const Achievement = sequelize.define("achievement", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Achievement