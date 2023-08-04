const Product = require("../models/productModel");
const asyncHandler= require('express-async-handler');

const getProducts = asyncHandler(async (req,res)=>{
    const products = await Product.find({})
    // throw new Error('ERROR'); 
res.json(products);
})

const getProduct = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
    res.json(product);
    }
    else{
        res.status(404).json({messsage: "Product Not Found"});
    }
})

module.exports ={ getProduct,getProducts}