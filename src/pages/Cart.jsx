import React from 'react'
import { faBackward, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Adminheader from '../components/Adminheader';
import Monthlysales from '../components/monthlysales';
import Homeheader from '../components/Homeheader';


function Cart() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <div className="container-fluid  " style={{height:'100vh',background:'wheat'}}>
        <Homeheader/>


       

       
        <div className="row mt-5">
            <div className="col-md-8">
           
            <table className='w-100 border border-dark  shadow text-center'> 
  <thead>
    <tr>
      <th className='border border-black p-3 bg-primary text-black'>s.no</th>
      <th className='border border-black p-3 bg-primary text-black'>name</th>
      <th className='border border-black p-3 bg-primary text-black'>Image</th>
      <th className='border border-black p-3 bg-primary text-black'>Amount</th>
      <th className='border border-black p-3 bg-primary text-black'>Action</th>
    </tr>
  </thead>
  <tbody className='bg-white'>
  
    <tr>
    <td className='p-3 border border-dark text-center text-warning'>1</td>
    <td className='p-3 border border-dark text-center text-danger'>milk</td>
    <td className='p-3 border border-dark d-flex justify-content-center'><img src=""style={{height:'120px'}} alt="" /></td>
    <td className='p-3 border border-dark text-center text-success'>$ 100</td>
    <td className='p-3 border border-dark text-center'><button onClick={()=>dispatch(removeCartItem(item?.id))} className='bg-primary text-danger py-3 px-5 rounded'><FontAwesomeIcon icon={faTrash} /></button></td>
  </tr>
  </tbody>
</table>
            </div>
            <div className="col-md-4 b ">
            <div className='shadow bg-white p-5'>
       <h3 className='text-center text-warning'>Grand Total</h3>
       <p className='mt-4 '>number of products:</p>
       <p  className='mt-4 '>Total Amount : $ 1000000</p>
       <button  className='w-100 bg-success text-white p-3 mt-5 hover:border hover:border-green-600 hover:bg-white hover:text-green-600'>Calculate</button>
     </div>
            </div>
        </div>
    </div>
   
    </>
  )
}

export default Cart




























  
 
