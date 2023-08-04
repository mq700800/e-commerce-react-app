import React, { useState,useEffect } from 'react'
import {PayPalButton} from 'react-paypal-button-v2'
// import axios from 'axios'
import {ORDER_PAY_RESET} from '../constants/orderConstant'
import {Button , Row , Col , ListGroup, Image , Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {getOrderDetails, payOrder} from '../actions/orderAction'
import {useDispatch , useSelector} from 'react-redux'
import AlertMessage from '../components/shared/AlertMessage'
import Loader from '../components/shared/Loader'
import axios from 'axios'

const OrderScreen = ({match}) => {
    const orderId = match.params.id
    const [sdkReady , SetSdkReady] = useState(false)
    const dispatch = useDispatch()
    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay , success:successpay} = orderPay
    const orderDetails = useSelector(state => state.orderDetails)
    const {order , loading , error } = orderDetails

    if(!loading){
        const addDecimal = (num) =>{
            return(Math.round((num*100)/100).toFixed(2))
        }   
    
       order.itemsPrice = addDecimal(order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0))
    }

    const successPaymentHandler = (paymentResult) => {

        console.log(paymentResult)
        dispatch(payOrder(orderId,paymentResult))

    }

    useEffect(() => {
        const addPaypalScript = async () => {
            const {data : clientId} = await axios.get('/api/config/paypal')
            const script  = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true

            script.onload = () => {
                SetSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successpay){
        dispatch(getOrderDetails(orderId));
        dispatch({type:ORDER_PAY_RESET})
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                SetSdkReady(true)
            }
        }
    },[dispatch,orderId , order , successpay])
    return loading ? <Loader/>
    :error ? <AlertMessage variant='danger'>{error}</AlertMessage>
    :<>
            <h2>Order {order._id}</h2>
            <Row>
                <Col md={8}>
                    <ListGroup.Item variant='flush'>
                        <h2>Shipping</h2>
                       <p>
                           <strong>
                               Name:
                           </strong>

                           {/* {order.user.name} */}
                       </p>
                        <p>
                            <strong>Address :</strong>
                            {order.shippingAddress.address}&nbsp;
                            {order.shippingAddress.city}&nbsp;
                            {order.shippingAddress.postalcode}&nbsp;
                            {order.shippingAddress.country}&nbsp;
                        </p>
                        {order.isDelivered ?(
                            <AlertMessage variant='success'>Paid On {order.paidAt}</AlertMessage>
                        ):(
                               <AlertMessage variant='danger'>Not Deliverd</AlertMessage>
                        )}

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method :</strong>
                        <strong>{order.paymentMethod}</strong>
                        </p>

                        {order.isPaid ?(
                            <AlertMessage variant='success'>Paid On {order.paidAt}</AlertMessage>
                        ):(
                               <AlertMessage variant='danger'>Not Paid</AlertMessage>
                        )}

                    </ListGroup.Item>
                    <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 
                            ?(<AlertMessage>Your Cart Is Empty</AlertMessage>)
                            :(<ListGroup variant='flush'>
                                {order.orderItems.map((item , index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid />
                                            </Col>
                                            <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} X Rs{item.price} = Rs{item.price}

                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>)
                            }
                        </ListGroup.Item>
                </Col>
                <Col md={4}>
                <Card>
                           <ListGroup>
                               <ListGroup.Item>
                                   <h2>Order Summary</h2>
                               </ListGroup.Item>
                               <ListGroup.Item>
                                   <Row>
                                       <Col>Items</Col>
                                       <Col>Rs{order.itemsPrice}</Col>
                                   </Row>
                                   <Row>
                                       <Col>Shipping</Col>
                                       <Col>Rs{order.shippingPrice}</Col>
                                   </Row>
                                   <Row>
                                       <Col>Tax</Col>
                                       <Col>Rs{order.taxPrice}</Col>
                                   </Row>
                                   <Row>
                                       <Col>Total</Col>
                                       <Col>Rs{order.totalPrice}</Col>
                                   </Row>
                               </ListGroup.Item>
                               <ListGroup.Item>
                                   {error && <AlertMessage variant='danger'>{error}</AlertMessage> }
                                   {/* {success && <AlertMessage variant="success">{error}</AlertMessage>} */}
                               </ListGroup.Item>

                             
                           </ListGroup>
                       </Card>
                    {!order.isPaid && (<ListGroup.Item>
                        {loadingPay && <Loader/>}
                        {!sdkReady ? (<Loader/>) : (
                            <PayPalButton amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                             />
                        )}
                    </ListGroup.Item>)}
                </Col>
            </Row>
    </>
}

export default OrderScreen
