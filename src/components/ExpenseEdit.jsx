import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { serverUrl } from '../../service/serviceUrl';
import { updateExpenseApi } from '../../service/allApi';

function ExpenseEdit({ project, onEditResponse }) {
  const [updateStatus, setUpdateStatus] = useState('');
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState('');
  const [key, setKey] = useState(0);
  const [expenseDetails, setExpenseDetails] = useState({
    date: project.date,
    product: project.product,
    price: project.price,
    image: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setExpenseDetails({ ...expenseDetails, image: file });
  };

  useEffect(() => {
    if (expenseDetails.image) {
      setPreview(URL.createObjectURL(expenseDetails.image));
    }
  }, [expenseDetails.image]);

  const handleCancel = () => {
    setExpenseDetails({
      date: project.date,
      product: project.product,
      price: project.price,
      image: ''
    });
    setPreview('');
    setKey(prev => (prev === 0 ? 1 : 0));
  };

  const handleUpdate = async () => {
    const { date, product, price } = expenseDetails;
    if (!date || !product || !price) {
      toast.info('Fill the form completely');
      return;
    }

    try {
      const reqBody = new FormData();
      reqBody.append("date", date);
      reqBody.append("product", product);
      reqBody.append("price", price);
      // Append the new image if selected; otherwise, send the existing image
      preview
        ? reqBody.append("image", expenseDetails.image)
        : reqBody.append("image", project.image);

      const reqHeader = {
        "Content-Type": "multipart/form-data"
      };

      const result = await updateExpenseApi(project._id, reqBody, reqHeader);
      console.log(result);
      if (result.status === 200) {
        setUpdateStatus(result);
        toast.success('Expense updated successfully');
        // Call the parent's callback to send the update response
        if (onEditResponse) {
          onEditResponse(result);
        }
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        handleCancel();
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <FontAwesomeIcon
        className='text-info me-4 fa-xl'
        onClick={handleShow}
        icon={faPenToSquare}
      />
      <Modal show={show} onHide={handleClose} animation={false} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Edit Expense Details</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor='file-upload'>
                  <img
                    src={preview ? preview : `${serverUrl}/upload/${project.image}`}
                    className='w-100'
                    alt="Preview"
                  />
                  <input
                    id='file-upload'
                    key={key}
                    className='d-none'
                    type="file"
                    onChange={handleFile}
                  />
                </label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  onChange={(e) => setExpenseDetails({ ...expenseDetails, date: e.target.value })}
                  value={expenseDetails.date}
                  placeholder='Date'
                  className='form-control p-2 my-3'
                />
                <input
                  type="text"
                  onChange={(e) => setExpenseDetails({ ...expenseDetails, product: e.target.value })}
                  value={expenseDetails.product}
                  placeholder='Product'
                  className='form-control p-2 my-3'
                />
                <input
                  type="text"
                  onChange={(e) => setExpenseDetails({ ...expenseDetails, price: e.target.value })}
                  value={expenseDetails.price}
                  placeholder='Price'
                  className='form-control p-2 my-3'
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <hr />
        <Modal.Footer>
          <Button variant="warning me-3" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExpenseEdit;
