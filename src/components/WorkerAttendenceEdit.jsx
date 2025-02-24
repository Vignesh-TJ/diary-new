import { faPenToSquare, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from 'react-toastify';
import { updateAttendenceApi } from '../../service/allApi';

function WorkerAttendenceEdit({ project, onEditResponse }) {
  const [updateStatus, setUpdateStatus] = useState('');
  const [show, setShow] = useState(false);
  const [attendenceDetails, setAttendenceDetails] = useState({
    date: project.date,
    idd: project.idd,
    name: project.name,
    status: project.status, // "present" or "absent"
    wage: project.wage      // "paid" or "unpaid"
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Reset to original values on cancel
  const handleCancel = () => {
    setAttendenceDetails({
      date: project.date,
      idd: project.idd,
      name: project.name,
      status: project.status,
      wage: project.wage
    });
  };

  const handleUpdate = async () => {
    const { date, idd, name, status, wage } = attendenceDetails;
    if (!date || !idd || !name || !status || !wage) {
      toast.info('Fill the form completely');
      return;
    }

    try {
      const result = await updateAttendenceApi(project._id, attendenceDetails);
      console.log(result);
      if (result.status === 200) {
        setUpdateStatus(result);
        toast.success('Attendence updated successfully');
        onEditResponse(result);
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        handleCancel();
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error updating attendence:', error);
      toast.error('Something went wrong');
    }
  };

  // Helper functions to render dropdown title with icon and color
  const renderStatusTitle = () => {
    if (attendenceDetails.status === "present") {
      return <span style={{ color: 'green' }}>Present <FontAwesomeIcon icon={faAngleDown} /></span>;
    } else if (attendenceDetails.status === "absent") {
      return <span style={{ color: 'red' }}>Absent <FontAwesomeIcon icon={faAngleDown} /></span>;
    }
    return <>Select Status <FontAwesomeIcon icon={faAngleDown} /></>;
  };

  const renderWageTitle = () => {
    if (attendenceDetails.wage === "paid") {
      return <span style={{ color: 'green' }}>Paid <FontAwesomeIcon icon={faAngleDown} /></span>;
    } else if (attendenceDetails.wage === "unpaid") {
      return <span style={{ color: 'red' }}>Unpaid <FontAwesomeIcon icon={faAngleDown} /></span>;
    }
    return <>Select Wage <FontAwesomeIcon icon={faAngleDown} /></>;
  };

  return (
    <>
      <FontAwesomeIcon
        className='text-danger me-4 fa-xl'
        onClick={handleShow}
        icon={faPenToSquare}
      />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Edit Attendence Details</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <div className="container">
            <input
              type="text"
              onChange={(e) =>
                setAttendenceDetails({ ...attendenceDetails, date: e.target.value })
              }
              value={attendenceDetails.date}
              placeholder='Date'
              className='form-control p-1 my-3'
            />
            <input
              type="text"
              onChange={(e) =>
                setAttendenceDetails({ ...attendenceDetails, idd: e.target.value })
              }
              value={attendenceDetails.idd}
              placeholder='ID'
              className='form-control p-2 my-3'
            />
            <input
              type="text"
              onChange={(e) =>
                setAttendenceDetails({ ...attendenceDetails, name: e.target.value })
              }
              value={attendenceDetails.name}
              placeholder='Name'
              className='form-control p-2 my-3'
            />

            {/* Status Dropdown */}
            <Dropdown className='my-3'>
              <Dropdown.Toggle 
                variant="light" 
                id="dropdown-status-edit" 
                className='w-100 text-black'
                style={{ backgroundColor: 'white', border: '1px solid #ced4da' }}
              >
                {renderStatusTitle()}
              </Dropdown.Toggle>
              <Dropdown.Menu className='w-100'>
                <Dropdown.Item 
                  onClick={() =>
                    setAttendenceDetails({ ...attendenceDetails, status: 'present' })
                  }
                >
                  <span style={{ color: 'green' }}>Present</span>
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() =>
                    setAttendenceDetails({ ...attendenceDetails, status: 'absent' })
                  }
                >
                  <span style={{ color: 'red' }}>Absent</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Wage Dropdown */}
            <Dropdown className='my-3'>
              <Dropdown.Toggle 
                variant="light" 
                id="dropdown-wage-edit" 
                className='w-100 text-black'
                style={{ backgroundColor: 'white', border: '1px solid #ced4da' }}
              >
                {renderWageTitle()}
              </Dropdown.Toggle>
              <Dropdown.Menu className='w-100'>
                <Dropdown.Item 
                  onClick={() =>
                    setAttendenceDetails({ ...attendenceDetails, wage: 'paid' })
                  }
                >
                  <span style={{ color: 'green' }}>Paid</span>
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() =>
                    setAttendenceDetails({ ...attendenceDetails, wage: 'unpaid' })
                  }
                >
                  <span style={{ color: 'red' }}>Unpaid</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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

export default WorkerAttendenceEdit;
