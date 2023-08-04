import React ,{useState,useEffect}from 'react';
import {Link} from 'react-router-dom';
import {Button,Form,Row,Col} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import AlertMessage from '../components/shared/AlertMessage';
import Loader from '../components/shared/Loader';
import {register} from '../actions/userAction';
import FormContainer from '../components/shared/FormContainer';

const RegisterScreen = ({location,history}) => {
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [password , SetPassword] = useState('');
    const [confirmPassword , SetConfirmPassword] = useState('');
    const [message , SetMessage] = useState('');

    const redirect = location.search ? location.search.split('=')[1]:'/';
    const dispatch = useDispatch()
    const userRegister = useSelector(state=> state.userRegister)
    const {loading, error,userInfo} = userRegister

    useEffect(()=>{
        if(userInfo) {history.push(redirect)}
    },[history,userInfo,redirect]);

    const submitHandler = (e)=>{
            e.preventDefault()
            if(password !== confirmPassword){
                   SetMessage('Password do not match')
            }else{
            dispatch(register(name, email,password))
            }
    }
    return (
        <>
            <FormContainer>
                <h1>REGISTER</h1>
                     {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
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
                    <Button type='submit' variant='primary'>SignIn</Button>

                </Form>
                <Row>
                    <Col>
                    Already have an account! 
                    <Link to ={redirect ?`login?redirect=${redirect}`:'/login'}>Log in</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default RegisterScreen
