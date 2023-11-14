const sequelize = require("../../config/database");
const createProfiles = require("./profileMock");


async function startDb(){
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: true})
    }catch (e) {
        console.error("Error: ", e.message)
    }
}

startDb().then(async () => {
    await createProfiles()
}).catch(e => {
    console.error("Error: ", e.message)
})