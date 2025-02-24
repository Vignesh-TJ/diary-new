import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addMonthlyExpenseApi } from '../../service/allApi';

function Monthlybutton() {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [expenseDetails, setExpenseDetails] = useState({
    months: "",
    products: "",
    amount: "",
    feedback: "",
    imagess: ""
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    setExpenseDetails({ ...expenseDetails, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFile = (e) => {
    const file = e.target.files[0];
    setExpenseDetails({ ...expenseDetails, imagess: file });
    setPreview(URL.createObjectURL(file));
  };

  // Submit Expense
  const submitExpense = async () => {
    const reqBody = new FormData();
    reqBody.append('months', expenseDetails.months);
    reqBody.append('products', expenseDetails.products);
    reqBody.append('amount', expenseDetails.amount);
    reqBody.append('feedback', expenseDetails.feedback);
    reqBody.append('imagess', expenseDetails.imagess);

    const reqHeader = {
      "Content-Type": "multipart/form-data"
    };

    const result = await addMonthlyExpenseApi(reqBody, reqHeader);
    console.log(result);
    handleClose();
  };

  return (
    <>
      <button onClick={handleShow} className='btn btn-danger text-black p-3 m-5' style={{ fontSize: '20px', fontWeight: '800' }}>
        Upload Monthly Report
      </button>

      <Modal show={show} onHide={handleClose} animation={false} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Monthly Expense</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body className='bg-black'>

          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor='file-upload'>
                  <img src={preview || "https://th.bing.com/th/id/OIP.mxmxkeYx1BpyCuZqgg_fhgHaHa?rs=1&pid=ImgDetMain"} className='w-100' alt="Preview" />
                  <input id='file-upload' onChange={(e)=>handleFile(e)} className='d-none' type="file" />
                </label>
              </div>
              <div className="col-md-6">
                <div>
                  <input type="month" name="months" value={expenseDetails.months} onChange={handleChange} className='form-control p-2 my-3' />
                </div>
                <div>
                  <input type="text" name="products" value={expenseDetails.products} onChange={handleChange} placeholder='Products' className='form-control p-2 my-3' />
                </div>
                <div>
                  <input type="number" name="amount" value={expenseDetails.amount} onChange={handleChange} placeholder='Expense Amount' className='form-control p-2 my-3' />
                </div>
                <div>
                  <textarea rows={5} name="feedback" value={expenseDetails.feedback} onChange={handleChange} placeholder='Feedback' className='form-control my-3' />
                </div>
              </div>
            </div>
          </div>

        </Modal.Body>
        <hr />
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={submitExpense}>
            Add Report
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Monthlybutton;
