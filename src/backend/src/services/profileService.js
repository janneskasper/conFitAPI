const db = require("../config/database")
const {Op} = require("sequelize")
const {ProfileInterests, Profile, ProfileIdentification} = require("../dataModels/profileModels")

exports.findAllProfiles = (req, res) => {
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
    Profile.findAll(options).then(data => {res.send(data)})
        .catch(err => {res.status(500).send({message: err.message || "Error in select all"})})
}

exports.findProfile = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const eager = req.body.eager ? req.body.eager !== "0": false
    console.log(eager)
    if (eager) {
        Profile.findByPk(req.params.id, {include: [ProfileInterests, ProfileIdentification]})
            .then(data => {res.send(data)})
            .catch(err => {res.status(500).send({message: err.message || "Error in profile id find with eager"})})
    }else {
        Profile.findByPk(req.params.id)
            .then(data => {res.send(data)})
            .catch(err => {res.status(500).send({message: err.message || "Error in profile id find"})})
    }
}