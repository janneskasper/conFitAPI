const {Sequelize, DataTypes, Model} = require("sequelize");
const WorkoutProgram = require("./program")
const Workout = require("./workout")
const sequelize = require("../config/database")

const ProfileIdentification = sequelize.define("profileIdentification_t", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
})

const Profile = sequelize.define("profile_t",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING
    },
    weight: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    height: {
        type: DataTypes.INTEGER
    }
})

Profile.hasOne(ProfileIdentification, {
    foreignKey: "profileIdent"
})
Profile.hasMany(Workout, {
    as: "workouts",
    foreignKey: "id"
})
Profile.hasMany(WorkoutProgram, {
    as: "workoutPrograms",
    foreignKey: "id"
})

module.exports = {Profile, ProfileIdentification}
