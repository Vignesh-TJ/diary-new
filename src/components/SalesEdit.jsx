import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { serverUrl } from '../../service/serviceUrl';
import { updateSalesApi } from '../../service/allApi';
import Footer from './Footer';

function SalesEdit({ project, onEditResponse }) {
  const [updateStatus, setUpdateStatus] = useState('');
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState('');
  const [key, setKey] = useState(0);
  const [salesDetails, setSalesDetails] = useState({ 
    date: project.date, 
    litres: project.litres, 
    price: project.price, 
    images: "" 
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setSalesDetails({ ...salesDetails, images: file });
  };

  useEffect(() => {
    if (salesDetails.images) {
      setPreview(URL.createObjectURL(salesDetails.images));
    }
  }, [salesDetails.images]);

  const handleCancel = () => {
    setSalesDetails({ 
      date: project.date, 
      litres: project.litres, 
      price: project.price, 
      images: "" 
    });
    setPreview('');
    setKey(prev => (prev === 0 ? 1 : 0));
  };

  const handleUpdate = async () => {
    const { date, litres, price } = salesDetails;
    if (!date || !litres || !price) {
      toast.info('Fill the form completely');
      return;
    }

    try {
      const reqBody = new FormData();
      reqBody.append("date", date);
      reqBody.append("litres", litres);
      reqBody.append("price", price);
      // Append new image if selected, otherwise send the existing one
      preview
        ? reqBody.append("images", salesDetails.images)
        : reqBody.append("images", project.images);

      const reqHeader = {
        "Content-Type": "multipart/form-data"
      };

      const result = await updateSalesApi(project._id, reqBody, reqHeader);
      console.log(result);
      if (result.status === 200) {
        setUpdateStatus(result);
        toast.success('Project updated successfully');
        // Send the update response to the parent component
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
          <Modal.Title className='text-success'>Edit Sales Details</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor='file-upload'>
                  <img 
                    src={preview ? preview : `${serverUrl}/upload/${project.images}`} 
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
                <div>
                  <input 
                    type="text" 
                    onChange={(e) => setSalesDetails({ ...salesDetails, date: e.target.value })} 
                    value={salesDetails.date} 
                    placeholder='Date' 
                    className='form-control p-2 my-3' 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    onChange={(e) => setSalesDetails({ ...salesDetails, litres: e.target.value })} 
                    value={salesDetails.litres} 
                    placeholder='Litres' 
                    className='form-control p-2 my-3' 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    onChange={(e) => setSalesDetails({ ...salesDetails, price: e.target.value })} 
                    value={salesDetails.price} 
                    placeholder='Price' 
                    className='form-control p-2 my-3' 
                  />
                </div>
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

export default SalesEdit;
