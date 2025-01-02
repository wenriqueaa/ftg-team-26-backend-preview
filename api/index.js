const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const api = require('../src/routes/api.routes')
const path = require('path');

// Ruta explícita para servir favicon
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favicon.ico')); 
});

dotenv.config();
const port = process.env.PORT
const databaseConnect = require('../src/config/db');
const { applyVirtuals } = require('../src/models/Client');
databaseConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', api)

app.listen(port, () => {
    console.log(`Servidor conectado en el puerto ${port}`)
})

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'gestiON API',
            version: '1.0.0',
            description: 'API documentation for gestiON, MEAN stack application by the "Footalent - Team26-Nioche" team; 2024-2025',
        },
        servers: [
            {
                url: `/api`, // Replace with your server URL
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Adjust to the location of your route files
};

// Initialize Swagger documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Use Swagger-UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(`swaggerSpec ${process.env.BASE_URL}/api-docs`)
