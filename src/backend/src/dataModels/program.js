const {Sequelize, DataTypes} = require("sequelize")
const db = require("../config/database")

const WorkoutProgram = db.define("workoutProgram_t", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false
    }
})

module.exports = WorkoutProgram