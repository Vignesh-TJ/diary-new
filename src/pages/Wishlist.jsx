import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Homeheader from '../components/Homeheader';


function Products() {
  return (
    <>
   <Homeheader/>
    <div className="container-fluid p-5 " style={{zIndex:'1',height:"100vh",background:'wheat'}}>
        <div className="row p-5">
            <div className="col-md-3">
            <Card style={{ width: '90%' }} className='shadow'>
      <Card.Img variant="top" src="https://i.pinimg.com/originals/01/ee/f8/01eef87c666b2f683fa9f2fb6883a257.jpg" height="50%" />
      <Card.Body>
        <Card.Title className='text-center'>milk</Card.Title>
        <Card.Text className='text-center'>
          price :$ 40
        </Card.Text>
        <div className='mt-2 d-flex justify-content-between'>
          <button onClick={()=>dispatch(addWishlistItems(item))} className='px-4 py-3 rounded text-white bg-danger'><FontAwesomeIcon fa="2x"  icon={faHeart} /></button>
          <button onClick={()=>dispatch(addItemToCart(item))} className='px-4 py-3 rounded text-white bg-success'><FontAwesomeIcon  icon={faCartShopping} /></button>
        </div>
      </Card.Body>
    </Card>  
        </div>
        <div className="col-md-3">
            <Card style={{ width: '90%' }} className='shadow'>
      <Card.Img variant="top" src="https://i.pinimg.com/originals/01/ee/f8/01eef87c666b2f683fa9f2fb6883a257.jpg" height="50%" />
      <Card.Body>
        <Card.Title className='text-center'>milk</Card.Title>
        <Card.Text className='text-center'>
          price :$ 40
        </Card.Text>
        <div className='mt-2 d-flex justify-content-between'>
          <button onClick={()=>dispatch(addWishlistItems(item))} className='px-4 py-3 rounded text-white bg-danger'><FontAwesomeIcon fa="2x"  icon={faHeart} /></button>
          <button onClick={()=>dispatch(addItemToCart(item))} className='px-4 py-3 rounded text-white bg-success'><FontAwesomeIcon  icon={faCartShopping} /></button>
        </div>
      </Card.Body>
    </Card>  
        </div>
        <div className="col-md-3">
            <Card style={{ width: '90%' }} className='shadow'>
      <Card.Img variant="top" src="https://i.pinimg.com/originals/01/ee/f8/01eef87c666b2f683fa9f2fb6883a257.jpg" height="50%" />
      <Card.Body>
        <Card.Title className='text-center'>milk</Card.Title>
        <Card.Text className='text-center'>
          price :$ 40
        </Card.Text>
        <div className='mt-2 d-flex justify-content-between'>
          <button onClick={()=>dispatch(addWishlistItems(item))} className='px-4 py-3 rounded text-white bg-danger'><FontAwesomeIcon fa="2x"  icon={faHeart} /></button>
          <button onClick={()=>dispatch(addItemToCart(item))} className='px-4 py-3 rounded text-white bg-success'><FontAwesomeIcon  icon={faCartShopping} /></button>
        </div>
      </Card.Body>
    </Card>  
        </div>
        <div className="col-md-3">
            <Card style={{ width: '90%' }} className='shadow'>
      <Card.Img variant="top" src="https://i.pinimg.com/originals/01/ee/f8/01eef87c666b2f683fa9f2fb6883a257.jpg" height="50%" />
      <Card.Body>
        <Card.Title className='text-center'>milk</Card.Title>
        <Card.Text className='text-center'>
          price :$ 40
        </Card.Text>
        <div className='mt-2 d-flex justify-content-between'>
          <button onClick={()=>dispatch(addWishlistItems(item))} className='px-4 py-3 rounded text-white bg-danger'><FontAwesomeIcon fa="2x"  icon={faHeart} /></button>
          <button onClick={()=>dispatch(addItemToCart(item))} className='px-4 py-3 rounded text-white bg-success'><FontAwesomeIcon  icon={faCartShopping} /></button>
        </div>
      </Card.Body>
    </Card>  
        </div>
   
       

    </div>
    
    </div>
    </>
  )
}

export default Products