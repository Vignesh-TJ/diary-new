import React, { useEffect, useState } from 'react'
import Adminheader from '../components/Adminheader'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getMonthlyExpenseApi, getMonthlySalesApi } from '../../service/allApi';
import { serverUrl } from '../../service/serviceUrl';
import Footer from '../components/Footer';

function Monthlyreport() {
  const [monthlySales,setMonthlySales]=useState([])
  const [monthlyExpense,setMonthlyExpense]=useState([])

   const getting =async()=>{
    const result = await getMonthlySalesApi()
    console.log(result)
    setMonthlySales(result.data)
   }

   const gettings=async()=>{
    const result = await getMonthlyExpenseApi()
    console.log(result)
    setMonthlyExpense(result.data)
   }

   useEffect(()=>{
   
  getting(),
  gettings()
 },[])
  return (
    <>
    <Adminheader/>
    <div className="container-fluid p-3" style={{height:'100%',background:'wheat'}}>
        <h3 className='text-center text-black'>Monthly Sales Report</h3>

        <div className="row  px-5">
           {monthlySales?.map((item)=>( <div className="col-md-3 mt-3">
            <Card style={{ width: '90%',backgroundColor:'white' }}>
      <Card.Img variant="top" src={`${serverUrl}/upload/${item.imagesss}`} height='250px' />
      <Card.Body>
        <Card.Title className='text-center text-black'>Month:{item.months}</Card.Title>
        <hr className='text-black' />
        <Card.Text>
         <p className='text-center '>total litres:{item.litre}</p>
         <p className='text-center '>total amount:{item.amount}</p>
         <hr   className='text-black'/>
         <p className='text-black'>{item.feedback}</p>
        </Card.Text>
       
      </Card.Body>
    </Card>
            </div>))}
           
        </div>
        
    </div>
    <div className="container-fluid p-3" style={{height:'100%',background:'wheat' }}>
        <h3 className='text-center text-black'>Monthly Expense Report</h3>
        <div className="row px-5">
         {monthlyExpense?.map((item)=>(   <div className="col-md-3 mt-3">
            <Card style={{ width: '90%',backgroundColor:'white' }}>
      <Card.Img variant="top" src={`${serverUrl}/upload/${item.imagess}`} height='250px'/>
      <Card.Body>
        <Card.Title className='text-center text-black'>Month:{item.month}</Card.Title>
        <hr className='text-black' />
        <Card.Text>
         <p className='text-center'>total proucts:{item.products}</p>
      
         <p className='text-center'>total expense:{item.amount}</p>
         <hr   className='text-black'/>
         <p className='text-black'>{item.feedback}</p>
        </Card.Text>
       
      </Card.Body>
    </Card>
            </div>))}
            
        </div>
        
    </div>
    <Footer/>
    </>
  )
}

export default Monthlyreport