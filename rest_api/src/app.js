const express = require("express");
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const listenPort = 3000;

const sequelize = require("./config/database.js");
require("./dataModels/associations")
const {render} = require("express/lib/application");
require("./routes/workoutRouter")(app)
require("./routes/profileRouter")(app)

app.get("/", (req, res) => {
    res.message("ok")
})

const initApp = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync({alter: true}).then(() => {
            console.log("DB Sync was successful!")
        })

        app.listen(listenPort, () => {
            console.log(`Server is up and running at: http://localhost:${listenPort}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

initApp().then(e => {console.log("App initialized!")});
