import React ,{useState,useEffect}from 'react';
import {Link} from 'react-router-dom';
import {Button,Form,Row,Col, Table} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import AlertMessage from '../components/shared/AlertMessage';
import Loader from '../components/shared/Loader';
import {getUserDetails,updateUserProfile} from '../actions/userAction';
import {listMyOrders} from '../actions/orderAction'
import FormContainer from '../components/shared/FormContainer';
import { LinkContainer} from 'react-router-bootstrap'
import { ORDER_CREATE_REQUEST } from '../constants/orderConstant';

const ProfileScreen = ({location,history}) => {
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [password , SetPassword] = useState('');
    const [confirmPassword , SetConfirmPassword] = useState('');
    const [message , SetMessage] = useState('');

    // const redirect = location.search ? location.search.split('=')[1]:'/';
    const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin)
    const userDetails = useSelector(state=> state.userDetails)
    const {loading, error,user} = userDetails
    const { userInfo} = userLogin;

    const userUpdateProfile =  useSelector(state=>state.userUpdateProfile)
    const {success} = userUpdateProfile 

   const orderListMy = useSelector(state => state.orderListMy)
   const {loading:loadingOrders , orders , error:errorOrders} = orderListMy
 

    useEffect(()=>{
        if(!userInfo) {history.push('/login')}
        else{
        if(!user.name){
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        }else{
            SetName(user.name)
            SetEmail(user.email)
        }
        }
    },[history,userInfo,user,dispatch]);

    const submitHandler = (e)=>{
            e.preventDefault()
           dispatch(updateUserProfile({id:user._id, name,email,password}))
    };
    return (
        <>
          <Row>
              <Col md={5}>
              <FormContainer>
                <h1>UPDATE INFROMATION</h1>
                     {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

                     {success && <AlertMessage variant="success">Profile Updated</AlertMessage>}
                     {loading &&<Loader/>}    
                     {message &&<AlertMessage variant='danger'>{message}</AlertMessage>}  
                     {Loader} 
       
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                        <Form.Label> Name </Form.Label>
                        <Form.Control type='name' 
                        placeholder="enter name" value={name}
                         onChange={(e)=> SetName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label> Email Address </Form.Label>
                        <Form.Control type='email' 
                        placeholder="enter email" value={email}
                         onChange={(e)=> SetEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label> Password </Form.Label>
                        <Form.Control type='password' 
                        placeholder="enter password" value={password}
                         onChange={(e)=> SetPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password </Form.Label>
                        <Form.Control type='password' 
                        placeholder="Re-enter password" value={confirmPassword}
                         onChange={(e)=> SetConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>UPDATE</Button>

                </Form>
                <Row>
                    {/* <Col>
                    Already have an account! 
                    <Link to ={redirect ?`login?redirect=${redirect}`:'/login'}>Log in</Link>
                    </Col> */}
                </Row>
            </FormContainer>
              </Col>
              
              <Col md={7}>
                        <h2>     MY ORDERS</h2>
                 {
                    loadingOrders ? <Loader /> : errorOrders ? <AlertMessage variant="danger">{errorOrders}</AlertMessage>
                    :(
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>DATE</td>
                                    <td>TOTAL</td>
                                    <td>PAID</td>
                                    <td>DELIVERED</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0,10)}</td>
                                            <td>{order.totalprice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0,10):(
                                                <i className="fas-fa-times" style={{color:'red'}}></i>
                                            )}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0,10):(
                                                <i className="fas-fa-times" style={{color:'red'}}></i>
                                            )}</td>

                                            <td><LinkContainer to={`/order/${order._id}`}>
                                                <Button variant="light">Details</Button>
                                            </LinkContainer></td>
                                            

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                 }
              </Col>
          </Row>
        </>
    )
}

export default ProfileScreen
