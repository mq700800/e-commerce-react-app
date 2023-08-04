import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import HomeScreen from './HomeScreen'
const ProductScreen = ({product}) => {
    return (
        <div>
            <Card className='my-3 p-3 rounded '>
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant='top' />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as ='div'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as='div'>
                     <div className='my-3'>
                         Rs {product.price}
                     </div>
                    </Card.Text>
                    <Card.Text as='div'>
                     <div className='my-3'>
                      <Rating  value={product.rating} text={`${product.numreviews} reviews`} />
                     </div>
                    </Card.Text>
                </Card.Body>

                </Card>
  
        </div>
    )
}

export default ProductScreen
