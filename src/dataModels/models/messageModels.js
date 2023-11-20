const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../../config/databaseConfig")

const Message = sequelize.define("message", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attachment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM,
        values: ["NOTIFICATION", "FRIEND_REQUEST", "SHARE"]
    }
})

module.exports = Message