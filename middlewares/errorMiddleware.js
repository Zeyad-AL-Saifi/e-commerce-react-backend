const ApiError = require("../utils/apiError");

const sendErrorforDev = (err, res) =>
{
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorforProduction = (err, res) =>
{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

const handleJwtInvalidToken = () => new ApiError("Invalid token ,please login again");
const handleJwtExpired = () => new ApiError("Expired token ,please login again");

const errorMiddleware = (err, req, res, next) =>
{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === "development")
    {
        sendErrorforDev(err, res);
    } else
    {
        if (err.name === 'JsonWebTokenError') err = handleJwtInvalidToken();
        if (err.name === 'TokenExpiredError') err = handleJwtExpired();
        sendErrorforProduction(err, res);
    }
};
module.exports = errorMiddleware;