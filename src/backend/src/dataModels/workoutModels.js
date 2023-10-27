const {Sequelize, DataTypes} = require("sequelize")
const db = require("../config/database")

const Exercise = db.define("exercise", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    exerciseType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    targetMuscle: {
        type: DataTypes.STRING,
        allowNull: false
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

const WorkoutModels = db.define("workout", {
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

Exercise.belongsToMany(WorkoutModels, {through: "exerciseWorkout"})
WorkoutModels.belongsToMany(Exercise, {through: "exerciseWorkout"})
Exercise.belongsToMany(WorkoutProgram, {through: "exerciseWorkoutProgram"})
WorkoutProgram.belongsToMany(Exercise, {through: "exerciseWorkoutProgram"})
WorkoutModels.belongsToMany(WorkoutDay, {through: "workoutWorkoutDay"})
WorkoutDay.belongsToMany(WorkoutModels, {through: "workoutWorkoutDay"})
WorkoutDay.belongsToMany(WorkoutProgram, {through: "workoutDayProgram"})
WorkoutProgram.belongsToMany(WorkoutDay, {through: "workoutDayProgram"})

module.exports = {Exercise, Workout: WorkoutModels, WorkoutDay, WorkoutProgram}