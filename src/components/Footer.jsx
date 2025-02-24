import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import '../pages/Auth.css'

function Footer() {
  return (
    <>
    <div className="container-fluid  p-5 onn">
        <div className="row">
          
     <div className="col-md-4"> <div>
     <h3 className='text-black'>Guides</h3>
      <p>React</p>
      <p>React-bootstrap</p>
      <p>Bootswatch</p>
     </div>
     </div>
            <div className="col-md-4">
                <h3 className='text-black'>Get in Touch</h3>
                <br />
                <p>
                    Krishna Farms pvt Ltd. <br />
                        3/9G1, Thirumangalam ho, <br />
                    konnachal po, <br />
                    erumad, <br />
                    The Nilgiris <br />
                    Tamil Nadu.... 
                </p>
            </div>
            <div className="col-md-4"><h3>Contact us</h3>
     <div className='d-flex mt-3'>
     <input type="text" placeholder='Email id' className='form-control border border-black' /> 
     <button className='btn btn-warning ms-3'>subsccribe</button>
     </div>
     <div className=' mt-4 d-flex justify-content-evenly'>
     <a href="" className='text-success'><FontAwesomeIcon icon={faInstagram
     }  size="2x" /></a>
      <a href="" className='text-success'><FontAwesomeIcon icon={faXTwitter}  size="2x" /></a>
      <a href="" className='text-success'><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
      <a href="" className='text-success'><FontAwesomeIcon icon={faLinkedin}  size="2x" /></a>
      <a href="" className='text-success'><FontAwesomeIcon icon={faWhatsapp}  size="2x" /></a>
     </div></div>
        </div>
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-md-4"></div>
                <div className="col-md-4 border-top border-white">

                    <p className='text-center mt-3' style={{fontSize:"13px"}}>krishna farms pvt Ltd  since 2002 ,copyright issued</p>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer