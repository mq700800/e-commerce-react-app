const mongoose = require("mongoose");
require('colors');

const connectDb= async ()=>{
 try{
    const conn= await mongoose.connect(process.env.MONGO_URI,{
        // useNewParser:true,
        // useCreateIndex:true,
        useUnifiedTopology:true
        });
        console.log(`MongoDB connected ${conn.connection.host}`.yellow.inverse);
 } catch (error){
     console.error(`Error : ${error.message}`)
     process.exit(1);

 }

};  
module.exports = connectDb;