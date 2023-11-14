const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("./config/swaggerConfig")

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

const sequelize = require("./config/database.js");
require("./dataModels/associations")
const {render} = require("express/lib/application");
require("./routes/workoutRouter")(app)
require("./routes/profileRouter")(app)

const specs = swaggerJsdoc(swaggerConfig)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}))

const listenPort = 3000;

app.get("/", (req, res) => {
    res.send({message: "OKAY"})
})

const initApp = async () => {
    try {
        // await sequelize.authenticate();
        // console.log("Connection has been established successfully.");
        //
        // await sequelize.sync({alter: true}).then(() => {
        //     console.log("DB Sync was successful!")
        // })

        app.listen(listenPort, () => {
            console.log(`Server is up and running at: http://localhost:${listenPort}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

initApp().then(e => {console.log("App initialized!")});
