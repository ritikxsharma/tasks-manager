const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        const connection = await mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
        console.log(`Database Connected: ${connection.connection.host}`);
    }catch(error){
        console.log(`Failed to connect with database: ${error.message}`);
    }
}

module.exports = connectDB