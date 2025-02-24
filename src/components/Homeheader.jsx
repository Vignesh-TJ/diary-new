import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';


function Homeheader() {
  const navigate = useNavigate()


  // const out = () => {
  //   navigate("/login");
   
  // };

  return (
    <div>
      <Navbar expand="lg" className="bg-primary">
        <Container>
          <Link to="/home" className="text-decoration-none">
            <Navbar.Brand className="text-white" style={{ fontSize: '25px', fontWeight: '800' }}>
              Krishna Farms
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/home" className="text-white mx-3 text-decoration-none" style={{ fontSize: '20px', fontWeight: '600' }}>
                Home
              </Link>
              <Link to="/products" className="text-white mx-3 text-decoration-none" style={{ fontSize: '20px', fontWeight: '600' }}>
                Products
              </Link>
              <Link to="/wishlist" className="text-white mx-3 text-decoration-none" style={{ fontSize: '20px', fontWeight: '600' }}>
                Wishlist
              </Link>
              <Link to="/cart" className="text-white mx-3 text-decoration-none" style={{ fontSize: '20px', fontWeight: '600' }}>
                Cart
              </Link>
           
            </Nav>
          
          </Navbar.Collapse>
         
        </Container>

      </Navbar>
    </div>
  );
}

export default Homeheader;
