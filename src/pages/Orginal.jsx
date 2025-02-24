import React from 'react'
import './Auth.css'
import { Link } from 'react-router-dom'

function Orginal() {
  return (
<>

<div className="container-fluid main">

    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">

        <div className='d-flex align-items-center justify-content-center' style={{height:'100vh'}} >

           <div> 
         
         <Link to={'/login'}>
         <div className='text-center'><button className='btn btn-warning text-black px-4 my-3' style={{fontSize:'20px'}}>Farmer Login</button></div></Link>
         </div>

        </div>

      </div>
      <div className="col-md-4"></div>
    </div>

</div>

</>
  )
}

export default Orginal