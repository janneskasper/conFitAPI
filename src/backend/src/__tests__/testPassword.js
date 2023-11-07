const {encryptPassword} = require("../utils/encryption")
const {ProfileIdentification} = require("../dataModels/models/profileModels")
const sequelize = require("../config/database");

async function startDb(){
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
    }catch (e) {
        console.error("Error: ", e.message)
    }
}

startDb().then(() => {
    ProfileIdentification.findByPk(2).then(profile => {
        const a = profile.passwordCorrect("password_1")
        console.log(profile)
        console.log(a)
        // expect(a).toBe(true)
    })
}).catch(e => {
    console.error("Error: ", e.message)
})