import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addMonthlySalesApi } from '../../service/allApi';

function Monthlysales() {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");

  const [salesDetails, setSales] = useState({
    months: "",
    litre: "",
    amount: "",
    feedback: "",
    imagesss: ""
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    setSales({ ...salesDetails, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFile = (e) => {
    const file = e.target.files[0];
    setSales({ ...salesDetails, imagesss: file });
    setPreview(URL.createObjectURL(file));
  };

  // Submit sales data
  const adding = async () => {
    const reqBody = new FormData();
    reqBody.append('months', salesDetails.months);
    reqBody.append('litre', salesDetails.litre);
    reqBody.append('amount', salesDetails.amount);
    reqBody.append('feedback', salesDetails.feedback);
    reqBody.append('imagesss', salesDetails.imagesss);

    const reqHeader = {
      "Content-Type": "multipart/form-data"
    };

    const result = await addMonthlySalesApi(reqBody, reqHeader);
    console.log(result);
    setShow(false);
  };

  return (
    <>
      <button onClick={() => setShow(true)} className='btn btn-danger text-black p-3 m-5' style={{ fontSize: '20px', fontWeight: '800' }}>
        Upload Monthly Sales
      </button>

      <Modal show={show} onHide={() => setShow(false)} animation={false} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Monthly Sales</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body className='bg-black'>

          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor='file-upload'>
                  <img src={preview || "https://th.bing.com/th/id/OIP.mxmxkeYx1BpyCuZqgg_fhgHaHa?rs=1&pid=ImgDetMain"} className='w-100' alt="Preview" />
                  <input id='file-upload' onChange={handleFile} className='d-none' type="file" />
                </label>
              </div>
              <div className="col-md-6">
                <div>
                  <input type="month" name="months" value={salesDetails.months} onChange={handleChange} className='form-control p-2 my-3' />
                </div>
                <div>
                  <input type="number" name="litre" value={salesDetails.litre} onChange={handleChange} placeholder='Litres' className='form-control p-2 my-3' />
                </div>
                <div>
                  <input type="number" name="amount" value={salesDetails.amount} onChange={handleChange} placeholder='Sales Amount' className='form-control p-2 my-3' />
                </div>
                <div>
                  <textarea rows={5} name="feedback" value={salesDetails.feedback} onChange={handleChange} placeholder='Feedback' className='form-control my-3' />
                </div>
              </div>
            </div>
          </div>

        </Modal.Body>
        <hr />
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={adding}>
            Add Report
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Monthlysales;
