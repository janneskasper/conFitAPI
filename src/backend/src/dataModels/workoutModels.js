const {Sequelize, DataTypes} = require("sequelize")
const db = require("../config/database")

const Exercise = db.define("exercise", {
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
    exerciseType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    targetMuscle: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

const WorkoutDay = db.define("workoutDay", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    dayId: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 7
        }
    }
})

const WorkoutProgram = db.define("workoutProgram", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false
    }
})

const Workout = db.define("workout", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    workoutType: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {Exercise, Workout, WorkoutDay, WorkoutProgram}