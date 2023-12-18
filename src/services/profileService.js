const db = require("../config/databaseConfig")
const {Op} = require("sequelize")
const { Profile, ProfileIdentification, ProfileSetting} = require("../dataModels/models/profileModels")
const {CLIENT_ERROR,SUCCESS,SERVER_ERROR,INFORMATION,REDIRECT} = require("../utils/responseCodes")
const {NOTFOUND} = require("sqlite3");

exports.getAll = (req, res) => {
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
        res.status(SUCCESS.SUCCESS).send(data)
    })
        .catch(err => {res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).send({message: err.message || "Error in select all"})})
}

exports.getById = (req, res) => {
    if (!req.params.id) {
        res.status(CLIENT_ERROR.BAD_REQUEST).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const eager = req.query.eager ? req.query.eager !== "0": false
    let includeOptions = []
    if (eager) {
        includeOptions = [{model: ProfileIdentification}, {model: ProfileSetting}]
    }
    Profile.findByPk(req.params.id, {include: includeOptions})
        .then(data => {res.status(SUCCESS.SUCCESS).send(data)})
        .catch(err => {res.status(CLIENT_ERROR.NOT_FOUND).send({message: err.message || "Profile not found"})})
}

exports.createOne = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    console.log(req.body)
    const returnVal = req.params.returnVal ? req.params.returnVal !== "0": false
    Profile.create(req.body, {include: [ProfileIdentification, ProfileSetting]})
        .then(data => {if (returnVal) res.status(SUCCESS.CREATED).send(data)
        else res.status(SUCCESS.CREATED).send({message: "Profile created successfully"})})
        .catch(err => {res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).send({message: err.message + "Profile Create error" || "Error in profile create"})})
}

exports.updateById = (req, res) => {
    if (!req.params.id || !req.body) {
        res.status(CLIENT_ERROR.BAD_REQUEST).send({
            message: "Content can not be empty!"
        })
    }
    const id = req.params.id
    Profile.update(req.body, {where: {id: id}})
        .then(num => {
            if (num === 1) {
                res.status(SUCCESS.SUCCESS).send({
                    message: "Profile was updated successfully!"
                });
            } else {
                res.status(CLIENT_ERROR.NOT_FOUND).send({
                    message: `Cannot update Profile with id=${id}. Maybe Profile was not found!`
                });
            }
        })
        .catch(err => {
            res.status(CLIENT_ERROR.NOT_FOUND).send({
                message: "Could not update Profile with id=" + id
            });
        });
}

exports.deleteById = (req, res) => {
    if (!req.params.id) {
        res.status(CLIENT_ERROR.BAD_REQUEST).send({
            message: "Content can not be empty!"
        })
    }
    Profile.destroy({where: {id: req.params.id}})
        .then(num => {
            if (num === 1) {
                res.status(SUCCESS.SUCCESS).send({
                    message: "Profile was deleted successfully!"
                });
            } else {
                res.status(CLIENT_ERROR.NOT_FOUND).send({
                    message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`
                });
            }
        })
        .catch(err => {
            res.status(CLIENT_ERROR.NOT_FOUND).send({
                message: "Could not delete Profile with id=" + id
            });
        });
}