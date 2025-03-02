import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import '../pages/Auth.css'

function Footer() {
  return (
    <>
    <div className="container-fluid p-5 bg-primary text-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="row">
          
     <div className="col-md-3"> 
     <div>
     <h3 className='text-warning' style={{ fontSize: '22px', fontWeight: 'bold' }}>Cattle Management</h3>
      <ul className='list-unstyled' style={{ fontSize: '16px' }}>
        <li>Feeding & Nutrition</li>
        <li>Health & Vaccination</li>
        <li>Breeding & Genetics</li>
        <li>Housing & Hygiene</li>
      </ul>
     </div>
     </div>
            <div className="col-md-3">
                <h3 className='text-warning' style={{ fontSize: '22px', fontWeight: 'bold' }}>Get in Touch</h3>
                <p className='mt-3' style={{ fontSize: '16px' }}>
                    <strong>Yuva Dairy Farm</strong> <br />
                    Mathamangalam, Konnachal PO, <br />
                    Erumad, The Nilgiris, Tamil Nadu, 643239
                </p>
            </div>
            <div className="col-md-3">
                <h3 className='text-warning' style={{ fontSize: '22px', fontWeight: 'bold' }}>Our Services</h3>
                <ul className='list-unstyled' style={{ fontSize: '16px' }}>
                    <li>Milk Production</li>
                    <li>Organic Dairy Products</li>
                    <li>Livestock Consultancy</li>
                    <li>Training & Workshops</li>
                </ul>
            </div>
            <div className="col-md-3">
                <h3 className='text-warning' style={{ fontSize: '22px', fontWeight: 'bold' }}>Contact Us</h3>
                <div className='d-flex mt-3'>
                    <input type="text" placeholder='Enter your email' className='form-control border-0 p-2 rounded-3' style={{ fontSize: '14px' }} /> 
                    <button className='btn btn-warning ms-3 rounded-3' style={{ fontSize: '14px' }}>Subscribe</button>
                </div>
                <div className='mt-4 d-flex justify-content-evenly'>
                    <a href="" className='text-light'><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                    <a href="" className='text-light'><FontAwesomeIcon icon={faXTwitter} size="2x" /></a>
                    <a href="" className='text-light'><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                    <a href="" className='text-light'><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
                    <a href="" className='text-light'><FontAwesomeIcon icon={faWhatsapp} size="2x" /></a>
                </div>
            </div>
        </div>
        <div className="container-fluid border-top border-light mt-5 pt-3">
            <p className='text-center' style={{ fontSize:"14px", fontWeight: '500' }}>Yuva Dairy Farm &copy; 2025 | Committed to Sustainable Dairy Farming</p>
        </div>
    </div>
    </>
  )
}

export default Footer
