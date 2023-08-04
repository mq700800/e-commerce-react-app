import React,{useState} from 'react';
import {Row,Col,Button ,Form } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import  FormContainer from '../components/shared/FormContainer';
import { saveShippingAddress } from  '../actions/cartAction';
import CheckoutStep from '../components/shared/CheckoutStep';


const ShippingScreen = ({history}) => {
    
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address , SetAddress] = useState(shippingAddress.address)
    const [city , SetCity ] = useState( shippingAddress.city)
    const [ postalCode , SetPostalCode ] = useState(shippingAddress.postalCode)
    const [ country , SetCountry ] = useState( shippingAddress.country)

    const submitHandler = ( e )=>{
          e.preventDefault()
          dispatch(saveShippingAddress({address,city,postalCode,country}))
          history.push('/payment');
    }
    return (
        <FormContainer>
            <CheckoutStep step1 step2 />
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                   <Form.Label>Address:</Form.Label>
                   <Form.Control type='text' placeholder="enter address"
                    value={address} onChange={ e=> SetAddress(e.target.value) } required></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                   <Form.Label>City:</Form.Label>
                   <Form.Control type='text' placeholder="enter city"
                    value={city} onChange={ e=> SetCity(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalcode'>
                   <Form.Label>Postal Code:</Form.Label>
                   <Form.Control type='text' placeholder="enter postalcode"
                    value={postalCode} onChange={ e=> SetPostalCode(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                   <Form.Label>Country:</Form.Label>
                   <Form.Control type='text' placeholder="enter country"
                    value={country} onChange={ e=> SetCountry(e.target.value)} required></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' >
                 Continue
                </Button>
            </Form>
            
        </FormContainer>
    )
}

export default ShippingScreen
