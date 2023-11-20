
module.exports = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "ConFit API",
            version: "0.1.0",
            description:
                "This is the REST API from ConFit created and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Jannes Kasper",
                email: "jannes.kasper@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
    },
    apis: ["./documentation/apiDefinitions/*.yaml"],
};