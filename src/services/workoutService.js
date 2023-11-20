const db = require("../config/databaseConfig")
const {where} = require("sequelize");
const {Exercise,Workout,WorkoutDay,WorkoutProgram} = require("../dataModels/models/workoutModels")
const {CLIENT_ERROR,SUCCESS,SERVER_ERROR,INFORMATION,REDIRECT} = require("../utils/responseCodes")

exports.create = (req, res) => {
    if (!req.body.workoutType) {
        res.status(CLIENT_ERROR.BAD_REQUEST).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Tutorial
    const workout = {
        id: req.body.id ? req.body.id : undefined,
        workoutType: req.body.workoutType
    };

    Workout.create(workout)
        .then(data => {res.send(data)})
        .catch(err => {res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).send({message: err.message || "Error occurred while creating workout"})})
};

exports.getAll = (req, res) => {
    const maxRes = res.body.max ? res.body.max: undefined
    if (req.body.max) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    Workout.findAll({
        limit: maxRes
    }).then(data => {res.send(data)})
        .catch(err => {res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).send({message: err.message || "Error in select all"})})
}

exports.getAllByType = (req, res) => {
    if (!req.body.workoutType) {
        res.status(CLIENT_ERROR.BAD_REQUEST).send({
            message: "Content can not be empty!"
        });
        return;
    }
    Workout.findAll({
        where: {
            workoutType: req.body.workoutType
        }
    }).then(data => {res.send(data)})
        .catch(err => {res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).send({message: err.message || "Error in workout select all"})})
};