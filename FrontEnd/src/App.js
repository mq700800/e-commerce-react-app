import React from 'react'
import { Container} from 'react-bootstrap';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductDetails from './screens/ProductDetails';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreem';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
function App() {
  return (
    <Router>
    {/* <Switch> */}
      <Header />
      <main>
  <Container>
    {/* <h1>Ecommerce App</h1> */}
  
    <Route path='/' component={HomeScreen} exact  />
    <Route path='/login' component={LoginScreen}/>
    <Route path='/payment' component={PaymentScreen}/>
    <Route path='/placeorder' component={PlaceOrderScreen}/>
    <Route path='/order/:id' component={OrderScreen}/>
    <Route path='/shipping' component={ShippingScreen} />
    <Route path='/register' component={RegisterScreen}/>
    <Route path='/profile' component={ProfileScreen}/>
    <Route path='/product/:id' component={ProductDetails}/> 
    <Route path='/cart/:id?' component={CartScreen}/> 
     </Container>
  </main>
  <Footer />
  {/* </Switch> */}
  </Router>
   );
}

export default App;
