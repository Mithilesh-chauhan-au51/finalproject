import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
 import ListGroup from "react-bootstrap/ListGroup";




import logo from "/images/reshell.jpg";
import sellicons from "/images/sell9.jpg"
import chat from "/images/chat2.png"
import profile from "/images/pro2.webp"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";


function Navigationbar() {
  
  const[otherdata,setother]=useState("") 
  const[token,settoken]=useState("")  
  const navigate = useNavigate();
  
  const logout=()=>{
    localStorage.removeItem("token")
   localStorage.removeItem("user")
    localStorage.removeItem("selectedProduct")
    navigate('/login')
  }

  

  useEffect(() => {
  const token = localStorage.getItem("token");
  const others=JSON.parse(localStorage.getItem("user"))
  //console.log(token,others)
  if(token){settoken(token)} else {settoken("")} 
  if(others){setother(others) }  else {setother("")}
  }, [localStorage.getItem("token")]);
  
  return (
    <Navbar  expand="md" className="mb-3"style={{ backgroundColor: '#D3D3D3' }}>
      <Container fluid>
      <Navbar.Brand as={Link} to="/">
  <img src={logo} height="30"className="d-inline-block align-top"
   alt="Logo" /> EasySell</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end" >
           <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            
            
  
            
            <Nav className="justify-content-end flex-grow-1 pe-5">
              <Nav.Link as={Link} to="/addproducts"><img
            src={sellicons}
            height="30"
             width="40"                            
            className="d-inline-block align-top"
            alt="add sell"
          /></Nav.Link>

              { token && ( 
 <NavDropdown
                title={<img src={profile} 
                               height="40" 
                               width="40"                            
                               className="d-inline-block align-top" 
                               alt="profile" />}
                id={`offcanvasNavbarDropdown-expand-md`}
              >
                <NavDropdown.Item >Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                
                <NavDropdown.Item >
                Name: {otherdata.firstname} {otherdata.lastname}
                </NavDropdown.Item>
                <NavDropdown.Item >
                 Email: {otherdata.email}
                </NavDropdown.Item>
                <NavDropdown.Item >
                 Phone number: {otherdata.phoneNumber}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                
                <NavDropdown.Item as={Link} to="/myadds">
                 My ads
                </NavDropdown.Item>
                 <NavDropdown.Item as={Link} to="/myfavourite">
                My favourite
                </NavDropdown.Item>
     
                
              </NavDropdown>      


)}


               { token && ( 
              <Nav.Link as={Link} to="/chat"><img
            src={chat}
            height="30"
            className="d-inline-block align-top"
            alt="chat"
          /></Nav.Link>
)}
 

              
             
{token ?   
  <Nav.Link onClick={()=>logout()}>Log out</Nav.Link> :
  <Nav.Link as={Link} to="/login">Log in</Nav.Link>}

     </Nav>       
             </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
     
    </Navbar>
    
  );
}

export default Navigationbar;
