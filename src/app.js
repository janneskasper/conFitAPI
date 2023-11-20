require("dotenv").config();

const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("./config/swaggerConfig")

// app setup
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

// swagger documentation setup
const specs = swaggerJsdoc(swaggerConfig)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}))

// routes
const router = require("./routes/mainRouter")
app.use("/api", router)

const initApp = async () => {
    try {
        // await sequelize.authenticate();
        // console.log("Connection has been established successfully.");
        //
        // await sequelize.sync({alter: true}).then(() => {
        //     console.log("DB Sync was successful!")
        // })

        app.listen(process.env.LISTEN_PORT, () => {
            console.log(`Server is up and running at: http://localhost:${process.env.LISTEN_PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

initApp().then(e => {console.log("App initialized!")});
