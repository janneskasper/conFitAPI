const db = require("../db")
const config = require("../config")

async function getAll() {
    const data = await db.query("SELECT * FROM ...")

}

module.exports = {
    getAll
}