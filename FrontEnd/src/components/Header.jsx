import React from 'react'
import { Navbar , Nav , NavDropdown, Container } from 'react-bootstrap'
import { LinkContainer} from "react-router-bootstrap"
import { Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { logout } from '../actions/userAction';


const Header = () => {
  const userLogin = useSelector( state => state.userLogin)

  const {userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = ()=>{
    //  console.log('Logout');
    dispatch(logout())
  }
    return (
            <Navbar bg="dark" expand="lg"  variant='dark' collapseOnSelect>
  <Container>
    <LinkContainer to='/'>   
     <Navbar.Brand>Online shop</Navbar.Brand> 
      </LinkContainer>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">

<LinkContainer to='/cart'>
        <Nav.Link > <i class="fa fa-shopping-cart" />&nbsp; Cart </Nav.Link>
        </LinkContainer>
        {
          userInfo ? (
            <NavDropdown title={userInfo.name} id ='username'>
              <LinkContainer to ='/profile'>
                <NavDropdown.Item>
                    Profile
                </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout            
                </NavDropdown.Item>
              
            </NavDropdown>
          ) : (
          <LinkContainer to='/login'>
          <Nav.Link > <i class="fa fa-user" />&nbsp; Sign In </Nav.Link>
          </LinkContainer>
          )
        }
        
        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

export default Header
