const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../../config/databaseConfig")

const Activity = sequelize.define("activity", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = Activity