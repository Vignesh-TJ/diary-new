import React, { useState } from 'react'
import '../pages/Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../../service/allApi'
import { ToastContainer, toast } from 'react-toastify';
function Auth2() {
  const navigate = useNavigate()
  const [user,setUser]=useState({
    username:"",
    email:"",
    password:""
  })
  const register = async()=>{
    const result = await registerApi(user)
    console.log(result)
    if(result.status==200){
     toast.success('Registration Successfull')
     setTimeout(()=>{
      navigate("/login")

    },2000)
    }
    else[
      toast.warning('eamil already used')
    ]
  }
  return (
    <>
    
    <div className="container-fluid one" >
     <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 two mt-5 w-90 rounded-3 p-5 pt-3 " style={{height:"90vh"}}>
          
         
         <h2 className='my-3 mt-5 text-center'>Registration Page</h2>
          <input type="text" onChange={(e)=>setUser({...user,username:e.target.value})} placeholder='username' className='form-control rounded-0 p-3 mt-5 mb-4 rounded-1 ' />
          <input type="text"  onChange={(e)=>setUser({...user,email:e.target.value})}  placeholder='email' className='form-control rounded-0 p-3 my-4 rounded-1 ' />
          <input type="password"  onChange={(e)=>setUser({...user,password:e.target.value})}  name="" id="" placeholder='password' className='form-control rounded-0 p-3 my-4 rounded-1  ' />
    
  

      <div className='text-center'>   <button className='btn btn-warning p-3 px-5 my-3' onClick={register}>Farmer Register</button></div>

     <p className='mt-3'>Already Registered?  <Link to={'/login'}><a href="">Login</a></Link></p>
                  
         
        </div>
        <div className="col-md-4"></div>
     </div>
    </div>
    <ToastContainer position='top-center' autoClose={2000} theme="colored" />
    
    </>
  )
}

export default Auth2