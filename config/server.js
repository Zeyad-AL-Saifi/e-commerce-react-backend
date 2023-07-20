const express = require("express");

const app = express();


const PORT = process.env.PORT || 5500;



const server = app.listen(PORT, () =>
{
    console.log(`Server is running on port ${ PORT }`);
});

//handle rejection outside express
//any error out of express like databese 
process.on('unhandledRejection', (err) =>
{
    console.error(`Unhandled Rejection Error:${ err.name }| ${ err.message }`);
    server.close(() =>
    {//to close the server after colse the app or reqs
        console.error(`Shutting down....!😞`);
        process.exit(1);//to close the app

    });
});


module.exports = app;