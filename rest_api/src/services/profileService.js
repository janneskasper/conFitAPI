const db = require("../config/database")
const {Op} = require("sequelize")
const {ProfileInterests, Profile, ProfileIdentification, ProfileSetting} = require("../dataModels/models/profileModels")

exports.getAllProfiles = (req, res) => {
    const maxRes = req.query.max ? req.query.max: undefined
    const nameFilter = req.query.name ? req.query.name: undefined
    const options = {
        limit: maxRes
    };
    if (nameFilter) {
        options.where = {[Op.or]: [
            {firstName: {[Op.substring]: nameFilter}},
            {lastName: {[Op.substring]: nameFilter}}
        ]}
    }
    Profile.findAll(options).then(data => {
        // res.header("Access-Control-Expose-Headers", "Content-Range")
        // res.header("Content-Range", `profiles 0-${data.length}/${data.length}`)
        // res.header("Content-Range", `bytes : 0-9/*`)
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).send(data)
    })
        .catch(err => {res.status(500).send({message: err.message || "Error in select all"})})
}

exports.getProfile = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const eager = req.body.eager ? req.body.eager !== "0": false
    let includeOptions = []
    if (eager) {
        includeOptions = [{model: ProfileIdentification}, {model: ProfileSetting}]
    }
    Profile.findByPk(req.params.id, {include: includeOptions})
        .then(data => {res.status(200).send(data)})
        .catch(err => {res.status(404).send({message: err.message || "Profile not found"})})
}

// write methods for creating, updating and deleting profiles here
exports.createProfile = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    const returnVal = req.params.returnVal ? req.params.returnVal !== "0": false
    Profile.create(req.body, {include: [ProfileInterests, ProfileIdentification]})
        .then(data => {if (returnVal) res.status(201).send(data)
                        else res.status(201).send({message: "Profile created successfully"})})
        .catch(err => {res.status(500).send({message: err.message || "Error in profile create"})})
}

exports.updateProfile = (req, res) => {
    if (!req.params.id || !req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    const id = req.params.id
    Profile.update(req.body, {where: {id: id}})
        .then(num => {
            if (num === 1) {
                res.status(200).send({
                    message: "Profile was updated successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Profile with id=${id}. Maybe Profile was not found!`
                });
            }
        })
        .catch(err => {
            res.status(404).send({
                message: "Could not update Profile with id=" + id
            });
        });
}

exports.deleteProfile = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    Profile.destroy({where: {id: req.params.id}})
        .then(num => {
            if (num === 1) {
                res.status(200).send({
                    message: "Profile was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`
                });
            }
        })
        .catch(err => {
            res.status(404).send({
                message: "Could not delete Profile with id=" + id
            });
        });
}