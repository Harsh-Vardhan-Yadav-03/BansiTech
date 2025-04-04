const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/mernadmin";

const connectdb = async() =>{
    try {
        await mongoose.connect(URI);
        console.log("Connection to database successfully");        
    } catch (error) {
        console.error("Database connection failed");
        process.exit(0);
    }
}

module.exports = connectdb;