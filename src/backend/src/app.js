const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 3000;

const sequelize = require("./config/database.js");
require("./dataModels/associations")
require("./routes/workoutRouter")(app)
require("./routes/profileRouter")(app)

app.get("/", (req, res) => {
    res.json({message: "Welcome to the workout tracker application."});
})

const initApp = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync({alter: true}).then(() => {
            console.log("DB Sync was successful!")
        })

        app.listen(port, () => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

initApp().then(e => {console.log("App initialized!")});
