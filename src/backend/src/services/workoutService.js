const db = require("../config/database")
const {where} = require("sequelize");
const {Exercise,Workout,WorkoutDay,WorkoutProgram} = require("../dataModels/models/workoutModels")

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.workoutType) {
        res.status(400).send({
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
        .catch(err => {res.status(500).send({message: err.message || "Error occurred while creating workout"})})
};

exports.findAll = (req, res) => {
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
        .catch(err => {res.status(500).send({message: err.message || "Error in select all"})})
}

// Retrieve all Tutorials from the database.
exports.findAllByType = (req, res) => {
    if (!req.body.workoutType) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    wk.findAll({
        where: {
            workoutType: req.body.workoutType
        }
    }).then(data => {res.send(data)})
        .catch(err => {res.status(500).send({message: err.message || "Error in workout select all"})})
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};