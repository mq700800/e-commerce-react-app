import React,{useState, useEffect} from 'react'
import { useSelector,useDispatch} from 'react-redux';
// import axios from 'axios'
// import Products from '../Products'
import { listProductDetails } from '../actions/productActions'; 
import Rating from '../components/Rating'
import { Row,Col , ListGroup, Button, Image, ListGroupItem, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/shared/Loader';
import AlertMessage from '../components/shared/AlertMessage';
const ProductDetails = ({match,history}) => {
        const [qty , setQty]= useState(1); 
        const dispatch= useDispatch();
        const productDetails = useSelector(state => state.productDetails);
        const {loading, error, product} = productDetails;
    // const product = Products.find((pro)=> pro.id === match.params.id)
    // const[product,setProduct]=useState({});
    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
        // const fetchProduct = async()=>{
        //     const{data}= await axios.get(`/api/product/${match.params.id}`);
        //     setProduct(data);
        // };
        // fetchProduct();
    },[dispatch,match]);
    // console.log(product);
    const addToCartHandler = () =>{
            history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <div>
           
            <Link to='/' className='btn btn-light'>
                <i class='fas fa-arrow-left' />{' '}
                Go Back</Link>
                {
            loading ? <Loader/> : error ? <AlertMessage variant='danger'>{error}</AlertMessage>
            :
            <Row>
                <Col md={3}> 
                <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                     <ListGroup variant='flush'>
                         <ListGroupItem>
                             <h3>{product.name}</h3>
                         </ListGroupItem>
                         <ListGroupItem>
                             <Rating value={product.rating} text={`${product.numreviews} Reviews`} />
                         </ListGroupItem>
                         <ListGroupItem>
                             Price: Rs {product.price}
                         </ListGroupItem>
                    </ListGroup>
                    </Col>
                <Col md={3}>
                    <ListGroupItem>
                        <Row>
                            <Col>Status:</Col>
                            <Col>{product.countInStock > 0 ? 'In stock': 'Out of Stock'}</Col>
                        </Row>
                        </ListGroupItem>
                        {
                            product.countInStock >0 && (
                        <ListGroupItem>
                            <Row>
                                <Col> Qty </Col>
                                <Form.Control as='select' value={qty} 
                                  onChange={(e) => setQty(e.target.value)}>
                                    {
                                        [...Array(product.countInStock).keys()].map((val)=>(
                                            <option key={val+1} value={val+1}>
                                                {val+1}
                                                </option>
                                             
                                        ))
                                    }
                                </Form.Control>
                            </Row>
                        </ListGroupItem>
                            )
                        }
                        <ListGroupItem>
                            <Button className='btn-block' type='button' onClick={addToCartHandler}> Add to Cart</Button>
                        
                    </ListGroupItem> 
                </Col>
                
            </Row>
}
        </div>
            
    )
}

export default ProductDetails
