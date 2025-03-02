import React from 'react'
import './Auth.css'
import Adminheader from '../components/Adminheader'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Footer from '../components/Footer';
export default function AdminHome() {
  return (
    <>
   <div className="container-fluid mains mb-5">
    <Adminheader/>
    
    
    <div className="container-fluid d-flex align-items-center" style={{height:'100vh'}}>
       <div className="row">
        <div className="col-md-7"></div>
        <div className="col-md-5">
    <Link to={'/adminhome'} style={{textDecoration:'none'}}>    <h1>Welcome User</h1></Link>
            <br />
            <h4 className='text-secondary'>🌾 "May the sunrise bring you hope and joy, as you till the soil and nurture the seeds. May the gentle breeze carry your dreams across the fields, and may the harvest be bountiful and rewarding. Wishing you a day filled with hard work, peace, and fulfillment. Happy farming!" 🌞</h4>
        </div>
       </div>
    </div>

   </div>
   <div className="container-fluid d-flex justify-content-center  rain" style={{width:'100%',height:'100vh'}}>
   <div className="row ms-5  container px-5">
     <h2 className='text-black text-center mt-4' style={{fontSize:'50px',fontWeight:'800'}}>Products overview</h2>
     <div className="col-md-4 mt-3">
     <Card style={{ width: '18rem',borderRadius:'20px' }} className='bg-white '>
       <Card.Img variant="top" src="https://akshayakalpa.org/wp-content/uploads/2022/01/Copy-of-Unnamed-Design-4.png" width='100%' height="100%" />
     </Card>
     </div>
     <div className="col-md-4 mt-3">
     <Card style={{ width: '18rem',borderRadius:'20px' }}  className='bg-white'>
       <Card.Img variant="top" src="https://akshayakalpa.org/wp-content/uploads/2022/01/Copy-of-Unnamed-Design-10-1.png" width='100%' height="100%" />
     </Card>
     </div>
     <div className="col-md-4 mt-3">
     <Card style={{ width: '18rem',borderRadius:'20px' }}  className='bg-white'>
       <Card.Img variant="top" src="https://akshayakalpa.org/wp-content/uploads/2022/01/Copy-of-Unnamed-Design-5.png" width='100%' height="100%" />
     </Card>
     </div>
     <div className="col-md-4 mt-3">
     <Card style={{ width: '18rem',borderRadius:'20px' }}  className='bg-white'>
       <Card.Img variant="top" src="https://akshayakalpa.org/wp-content/uploads/2022/01/Copy-of-Unnamed-Design-22.png" width='100%' height="100%" />
     </Card>
     </div>
     <div className="col-md-4 mt-3">
     <Card style={{ width: '18rem',borderRadius:'30px' }}  className='bg-white'>
       <Card.Img style={{borderRadius:'20px'}} variant="top" src="https://akshayakalpa.org/wp-content/uploads/2022/01/Copy-of-Unnamed-Design-8.png" width='100%' height="100%" />
     </Card>
     </div>
     <div className="col-md-4 mt-3">
     <Card style={{ width: '18rem',borderRadius:'20px' }}  className='bg-white'>
       <Card.Img style={{borderRadius:'20px'}}  variant="top" src="https://akshayakalpa.org/wp-content/uploads/2024/08/Copy-of-Unnamed-Design-24.png" width='100%' height="100%" />
     </Card>
     </div>
    
   </div>
 </div>
 <div className="container-fluid pt-5 " style={{height:'100vh',background:'white',overflow:'scroll'}}>
  <div className="row p-5">
    <div className="col-md-6">
      <img src="https://akshayakalpa.org/wp-content/uploads/2021/01/sustainable-future@2x.png" height='620px' width='770px' alt="" />
    </div>
    <div className="col-md-6 border border-black  p-5" style={{backgroundColor:'black'}}>
      <div>
        <h3 className='text-white' style={{fontWeight:'700'}}>KRISHNA FARMS</h3>
        <br />
        <p style={{color:'violet',fontSize:"25px",fontWeight:'800'
        }}>"Krishna Farms is a serene and sustainable cow farm nestled in the heart of nature. Dedicated to providing the highest quality dairy products, our farm practices ethical and environmentally friendly farming methods. Our happy cows graze on lush green pastures, ensuring they produce rich, nutritious milk. At Krishna Farms, we believe in a harmonious balance between traditional farming practices and modern technology, creating a nurturing environment for our cows and offering the best to our community."</p>
      </div>

    </div>
  </div>
</div>
<Footer />
 </>
  )
}
