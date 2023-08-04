const express = require('express');

const {addOrderItem, getOrderById , updateOrderToPaid, getMyOrders} = require('../controllers/orderController')
const {protect} = require('../MiddleWares/authMiddleware')
const router =  express.Router()

router.route('/').post(protect , addOrderItem);

router.route('/:id/pay').put(protect,updateOrderToPaid);

router.route('/myorders').get(protect,getMyOrders)

router.route("/:id").get(protect , getOrderById)



module.exports= router;