import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Adminheader from '../components/Adminheader';
import { addCopyApi, deleteSoftApi, getCopyApi } from '../../service/allApi';
import { serverUrl } from '../../service/serviceUrl';
import Footer from '../components/Footer';



function Soft() {
    const [show, setShow] = useState(false);
    const [preview,setPreview]=useState('')
    const [photo,setPhoto]=useState([])
    const [soft,setSoft]=useState({
      copy:"",
      monthly:""
    })
    console.log(soft)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleFile = (e) => {
      const file = e.target.files[0];
      setSoft({ ...soft, copy: file });
      setPreview(URL.createObjectURL(file));
  };
  const addCopy =async()=>{
    const reqBody = new FormData()
    reqBody.append('copy',soft.copy)
    reqBody.append("monthly",soft.monthly)
   const reqHeader ={
      "Content-Type":"multipart/form-data"
    }
    const result = await addCopyApi(reqBody,reqHeader)
    console.log(result)
    handleClose()

  }
  const deleter = (id)=>{
    const result = deleteSoftApi(id)
    console.log(result)

  }

  const getCopy =async()=>{
    const result = await getCopyApi()
    console.log(result)
    setPhoto(result.data)
   
  }

  useEffect(()=>{
    getCopy()
  },[photo])
  
  return (
   <>
   <Adminheader/>
   <div className="container-fluid py-3 on">
  
   <button onClick={handleShow} className='btn btn-danger px-4 my-3 ms-3 py-2'>Add</button>
    <div className="row p-3 mb-5 ">
   
      {photo?.map((item)=>(
        <div className="col-md-4">
        <Card style={{ width: '90%'
         }} className='mt-5 '>
      <Card.Img variant="top" src={`${serverUrl}/upload/${item.copy}`} height='400px' />
     <h5 className='text-center'>Month: <span className='text-success'>{item.monthly}</span></h5>
     <div className='text-center'> <button onClick={()=>deleter(item._id)} className='btn btn-danger my-2'>delete</button></div>
    </Card>
        </div>))}
       
        
    </div>
    <Footer/>
    
   </div>
   <Modal show={show} onHide={handleClose} className='w-100' >
    
        <Modal.Body>
        <label htmlFor='upload'>
                                    <img src={preview || "https://cdn-icons-png.flaticon.com/512/7889/7889938.png"} className='w-100' alt="Preview" />
                                    <input id='upload' className='d-none' type="file" onChange={(e)=>handleFile(e)} />
                                </label>
                                <input type="text" placeholder='enter month' onChange={(e)=>setSoft({...soft,monthly:e.target.value})}  className='form-control my-3'/>

                                <button className='btn btn-warning ' onClick={addCopy}>add photo</button>
        </Modal.Body>
       
        
      </Modal>
   

   
   </>
  )
}

export default Soft