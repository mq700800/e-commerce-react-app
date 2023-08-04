import React,{useEffect} from 'react';
// import axios from 'axios';
// import Products from '../Products'
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';
import { Row ,Col} from 'react-bootstrap';
import ProductScreen from './ProductScreen';
import Loader from '../components/shared/Loader';
import AlertMessage from '../components/shared/AlertMessage';
const HomeScreen = () => {
        const dispatch= useDispatch();
        const productList = useSelector(state => state.productList);
        const {loading, error, products} = productList;
    //  const [Products , setProducts]=useState([]);
     useEffect(()=>{
         dispatch(listProducts())
        //  const fetchProducts = async () =>{
        //      const {data}= await axios.get('/api/product');
        //     //  console.log(data);  
        //      setProducts(data);
        //  };
        //  fetchProducts();
     }, [dispatch]);
const Products =[];
    return (
        <>
        {
            loading ? <Loader/> : error ? <AlertMessage variant='danger'>{error}</AlertMessage>
            :
        
             <Row>
                 { 
                     products.map((product)=> (
                          
                 <Col key={product._id} md={3}>   
                     <ProductScreen  product={product}/>
                     </Col>
                     ))
                 }
                   </Row>
}
        </>
    )
}

export default HomeScreen
