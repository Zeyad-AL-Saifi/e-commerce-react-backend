const dotenv = require('dotenv');
const express = require("express");
const morgan = require('morgan');


const connectionDatabase = require('./config/db');
const app = require("./config/server");
const ApiError = require('./utils/apiError');


const errorMiddleware = require('./middlewares/errorMiddleware');


dotenv.config({ path: 'config.env' });

//connenct to database
connectionDatabase();


//Middelwares
app.use(express.json());

if (process.env.NODE_ENV === 'development')
{
    app.use(morgan("dev"));
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

