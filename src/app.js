require("dotenv").config()
const fs = require("fs")
const express = require("express");
const cors = require("cors")

const bodyParser = require("body-parser")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

const swaggerConfig = require("./config/swaggerConfig")
const router = require("./routes/mainRouter")

// swagger documentation setup
const specs = swaggerJsdoc(swaggerConfig)
fs.writeFileSync(`./documentation/apiDefinitions/fullDocumentations/v${process.env.API_VERSION}.json`, JSON.stringify(specs))

// app setup
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use("/api", router)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}))

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
