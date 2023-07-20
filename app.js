const dotenv = require('dotenv');
const express = require("express");
const morgan = require('morgan');
const path = require('path');

const cors = require('cors');
const compression = require('compression');


const connectionDatabase = require('./config/db');
const app = require("./config/server");
const ApiError = require('./utils/apiError');


const errorMiddleware = require('./middlewares/errorMiddleware');


dotenv.config({ path: 'config.env' });

//connenct to database
connectionDatabase();


// Enable other domains to access your application
app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression());



//Middelwares
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'uploads')));


if (process.env.NODE_ENV === 'development')
{
    app.use(morgan("dev"));
    console.log(`mode: ${ process.env.NODE_ENV }`);

}

//router
app.use("/api/v1/categories", require('./routes/categoryRoute'));
app.use("/api/v1/subcategories", require('./routes/subCategoryRoute'));
app.use("/api/v1/brands", require('./routes/brandRoute'));
app.use("/api/v1/products", require('./routes/productRoute'));
app.use("/api/v1/users", require('./routes/userRoute'));

app.all('*', (req, res, next) =>
{

    next(new ApiError(`Con't find this page: ${ req.originalUrl }`, 404));
});

//global error handling middleware
app.use(errorMiddleware)

