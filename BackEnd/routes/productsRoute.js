const express = require('express');
// const Product = require("../models/productModel");
// const asyncHandler= require('express-async-handler');
const {getProducts,getProduct} = require('../controllers/productsController')
const router = express.Router();

router.route('/product').get(getProducts);

//  asyncHandler(async (req,res)=>{
//         const products = await Product.find({})
//         // throw new Error('ERROR'); 
//     res.json(products);
// })
// );



router.route('/product/:id').get(getProduct);
//  asyncHandler(async (req,res)=>{
//     const product = await Product.findById(req.params.id);
//     if(product){
//     res.json(product);
//     }
//     else{
//         res.status(404).json({messsage: "Product Not Found"});
//     }
// })
// );  

module.exports= router;