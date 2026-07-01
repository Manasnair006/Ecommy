const mongoose = require("mongoose")

async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection established")
    }catch(error){
        console.error("DB connection failed: ", error.message)
        process.exit(1)
    }
}

module.exports = connectDb;