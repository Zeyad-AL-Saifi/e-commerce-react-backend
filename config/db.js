const mongoose = require("mongoose");

async function connectionDatabase ()
{
    await mongoose
        .connect(process.env.MONGO_URL)
        .then(() => { console.log("Database connection successfully ... 😉 "); });
    // .catch((error) => {
    //     console.log(`Database connention Faild...${error}`);
    // })
}

module.exports = connectionDatabase; 