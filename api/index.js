const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const api = require('../src/routes/api.routes')
const serveStatic = require('serve-static');

// app.get('/favicon.ico', (req, res) => {
//     res.status(204).end(); // Devuelve un código 204 No Content
// });

// Definición de rutas
app.get('/api/example', (req, res) => {
    res.json({ message: 'This is a valid route' });
});

dotenv.config();
const port = process.env.PORT
const databaseConnect = require('../src/config/db');
databaseConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', api)

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

const options = {
    swaggerOptions: {
        docExpansion: 'none', // Colapsar encabezados
    },
};

// Ruta para servir los archivos estáticos de Swagger UI
const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath();
app.use('/api/api-docs-static', express.static(swaggerUiAssetPath));
app.use('/swagger-static', serveStatic('./node_modules/swagger-ui-dist'));

// Use Swagger-UI
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));
console.log(`swaggerSpec ${process.env.BASE_URL}/api/api-docs`)

// Servir los archivos estáticos de Swagger UI manualmente
const swaggerUiPath = require('swagger-ui-dist').getAbsoluteFSPath();
app.use('/api/api-docs-static', express.static(swaggerUiPath));


app.listen(port, () => {
    console.log(`Servidor conectado en el puerto ${port}`)
})
