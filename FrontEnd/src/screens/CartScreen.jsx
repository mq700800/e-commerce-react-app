import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/shared/AlertMessage';
import {Row, Col ,Form ,Button,Card,Image, ListGroup, ListGroupItem} from "react-bootstrap";
import {addToCart,removeFromCart} from '../actions/cartAction';
import {Link} from 'react-router-dom';

const CartScreen = ({match,location,history}) => {
    const productId = match.params.id;
    const qty = location.search ?Number( location.search.split("=")[1]) : 1
    const dispatch = useDispatch()

    useEffect(()=>{
        if(productId){
             dispatch(addToCart(productId,qty))
        }
        else
        {

        }
    },[dispatch,productId,qty]);

    const cart = useSelector(state =>state.cart )
    const { cartItems}= cart;
    console.log(cartItems);
    const  removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id));
    };
    const checkout =()=>{
        history.push('/login?redirect=shipping');
    };
    return (
        <>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {
                        cartItems.length === 0 ? (
                            <Message>Your Cart is Empty !
                                <Link to='/'>Go Back</Link>
                            </Message>
                        
                        ):
                        (
                            <ListGroup variant='flush'>
                               {
                                cartItems.map(item =>(
                                    <ListGroupItem>
                                        <Row>
                                            <Col md={2}>
                                                <Image src ={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={2}>

                                                <Link to= {`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                Rs {item.price}
                                            </Col>
                                            <Col md={2}>
                                            <Form.Control as='select' value={item.qty} 
                                          onChange={(e) =>
                                           dispatch(addToCart(item.product , 
                                            Number(e.target.value)))}>
                                    {
                                        [...Array(item.countInStock).keys()].map((val)=>(
                                            <option key={val+1} value={val+1}>
                                                {val+1}
                                                </option>
                                             
                                        ))
                                    }
                                </Form.Control>
                                <Button type='button' variant='light' onClick={()=>
                                removeFromCartHandler(item.product)}>
                                    <i className='fa fa-trash' aria-hidden='true'></i>
                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))
                                 }
                            </ListGroup>
                        )
                    }
                </Col>
                <Col md ={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>subtotal ({cartItems.reduce((acc,item)=> acc+item.qty,0)}) items</h2>

                                Rs{cartItems.reduce((acc,item)=>acc + item.qty * item.price,0).toFixed(2)}
                            </ListGroupItem>
                            <Button type='button' className='btn btn-block' disabled={
                                cartItems.length === 0 } onClick={checkout}
                            >Proceed to CheckOut</Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen
