import React from 'react'

function Unknown() {
  return (
   <div className="container-fluid bg-white p-5">
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <h2 className='text-danger text-center my-5'>Lost Somewhere</h2>
            <img className='my-5' src="https://img.lovepik.com/element/40021/7866.png_1200.png" width="100%" alt="" />
            <div className='text-center'><button className='btn btn-success text-white my-5'>Back Home</button></div>

        </div>
        <div className="col-md-4"></div>
    </div>
   </div>
  )
}

export default Unknown