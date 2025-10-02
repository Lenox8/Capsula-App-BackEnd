import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Mern -Cadastro de usuarios",
            version: "1.0.0",
            description: "Documentacao da API ",
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["./routes/*.js"]
}

const swaggerSpec = swaggerJsDoc(options)

export  {
    swaggerUi,
    swaggerSpec
}