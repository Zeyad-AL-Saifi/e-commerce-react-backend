
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

const errorMiddleware = (err, req, res, next) =>
{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === "development")
    {
        sendErrorforDev(err, res);
    } else
    {
        sendErrorforProduction(err, res);
    }
};
module.exports = errorMiddleware;