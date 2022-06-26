require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); 
const morgan = require('morgan');
const ExpressError = require('./utils/ExpressError');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/toddle';
const PORT = process.env.PORT || 3000;

const app = express();

const indexRoutes = require('./routes/index');

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// app.use((req, res, next) => {
//     next();
// });

const options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Toddle API",
            version: "1.0.0",
        },
        servers: [{
            url: process.env.BASE_URL
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        }
    },
    apis: ['./docs/**/*.yml'],
};

const swaggerSpecs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(indexRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Internal Server Error!'
    console.log("==========================ERROR START==============================");
    console.log(err);
    console.log("==========================ERROR END==============================");
    res.status(statusCode).json({ success: false, error: true, message: err.message });
});

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
});