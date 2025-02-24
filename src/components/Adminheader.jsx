import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Adminheader() {
  const navigate = useNavigate()
  const out =()=>{
    sessionStorage.clear()
    navigate('/login')

  }
  return (
    <>
       <div className=' '>
   <Navbar expand="lg" className="bg-primary" style={{position:'sticky',top:'0px'}} >
      <Container>
<Link to={'/Adminhome'}>        <Navbar.Brand href="#home" className='text-white' style={{fontSize:'25px',fontWeight:'800'}} >Welcome User</Navbar.Brand>
</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           <Link to={'/Adminhome'}> <Nav.Link href="#home" className='text-white mx-3 ' style={{fontSize:'20px',fontWeight:'600'}} >Home</Nav.Link></Link>
           <Link to={'/salespage'}>            <Nav.Link href="#link" className='text-white mx-3 ' style={{fontSize:'20px',fontWeight:'600'}}>Sales Page</Nav.Link></Link>
           <Link to={'/expensepage'}>            <Nav.Link href="#link" className='text-white mx-3 ' style={{fontSize:'20px',fontWeight:'600'}}>Expense Page</Nav.Link></Link>
           <Link to={'/monthlyreport'}>            <Nav.Link href="#link" className='text-white mx-3 ' style={{fontSize:'20px',fontWeight:'600'}}>Monthly Report</Nav.Link></Link>
           <Link to={'/softcopy'}>            <Nav.Link href="#link" className='text-white mx-3 ' style={{fontSize:'20px',fontWeight:'600'}}>soft copy</Nav.Link></Link>
           <Link to={'/worker'}>            <Nav.Link href="#link" className='text-white mx-3 ' style={{fontSize:'20px',fontWeight:'600'}}>Worker Page</Nav.Link></Link>

<button onClick={out} className='btn btn-danger text-black ms-5 px-4 py-2'>log out</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </div>
    </>
  )
}

export default Adminheader