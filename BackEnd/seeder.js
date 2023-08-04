const mongoose = require("mongoose");
const dotenv = require('dotenv');
const users = require("./data/Users");
const User = require("./models/userModel");
const Order = require("./models/orderModel");
const Product = require("./models/productModel");
const products = require('./data/Products');
const connectDb = require('./configuration/config');
const product = require("./data/Products");
require('colors');

dotenv.config();
connectDb();

const importData= async () =>{
 
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        
         
        const createUser= await User.insertMany(users);
        const adminUser = createUser[0].id;
        const sampleData = products.map( product =>{
            return{...product, User:adminUser};
        })
        await Product.insertMany(sampleData)
        console.log('Data Imported'.blue.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }

}


const dataDestory = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('data destroy'.blue);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse)
    process.exit(1);
    }

}

if(process.argv[2]==="-d"){
    dataDestory();
}else{
    importData();
}

