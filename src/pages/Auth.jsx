import React, { useState } from 'react'
import '../pages/Auth.css'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { LoginApi } from '../../service/allApi'
import { ToastContainer, toast } from 'react-toastify';

function Auth() {
  const navigate = useNavigate()
  const [loginDetails,setLoginDetails]=useState({
    email:"",
    password:""
  })
  console.log(loginDetails);
  
    const login =async()=>{
      const result = await LoginApi(loginDetails)
      console.log(result)
      if(result.status==200){
        toast.success('login successfull')
        sessionStorage.setItem('existingUsers',JSON.stringify(result.data.existingUsers))
        sessionStorage.setItem('token',result.data.token)
        setTimeout(()=>{
          navigate("/adminhome")
    
        },2000)

      }
      else if(result.status ==404){
        toast.warning('incorrect email or password')
      }
      else{
        toast.warning('something went wrong')
      }
    }
  return (
    <>
    
    <div className="container-fluid one" >
     <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 two mt-5 w-90 rounded-3 p-5 " style={{height:"90vh"}}>
          
         
         <h2 className='my-3 mt-5 mb-5 text-center'>Login Page</h2>
          <input type="text" placeholder='email' onChange={(e)=>setLoginDetails({...loginDetails,email:e.target.value})} className='form-control rounded-0 p-3 my-4 rounded-1 ' />
          <input type="password" onChange={(e)=>setLoginDetails({...loginDetails,password:e.target.value})} name="" id="" placeholder='password' className='form-control rounded-0 p-3 my-4 rounded-1  ' />
         

     <div className='text-center'>   <button className='btn btn-primary p-3 px-5 my-3' onClick={login}>Farmer Login</button></div>

    <p className='mt-3'>New user?  <Link to={'/register'}> <a href="">Register</a></Link></p>
      
       
                  
         
        </div>
        <div className="col-md-4"></div>
     </div>
    </div>
     <ToastContainer position='top-center' autoClose={2000} theme="colored" />
    </>
  )
}

export default Auth