import React, { useEffect, useState } from 'react'
import Adminheader from '../components/Adminheader'
import './Auth.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { addProfileApi, attendenceAddApi, deleteProfileApi, getAttendenceApi, getProfileApi } from '../../service/allApi';
import { serverUrl } from '../../service/serviceUrl';
import WorkerAttendenceEdit from '../components/WorkerAttendenceEdit';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function WokersPage() {
  const navigate = useNavigate();
  const [profileStatus, setProfileStatus] = useState('');
  const [preview, setPreview] = useState('');
  const [attendenceDetails, setAttendenceDetails] = useState({
    date: "",
    idd: "",
    name: "",
    status: "", // "present" or "absent"
    wage: ""    // "paid" or "unpaid"
  });
  const [profile, setProfile] = useState({
    name: "",
    ids: "",
    joinDate: "",
    profileImage: ""
  });
  const [showProfile, setShowProfile] = useState([]);
  const [sho, setSho] = useState(false);
  const [show, setShow] = useState(false);
  const [attendence, setAttedence] = useState([]);

  // Modal handlers for Profile modal
  const handlClose = () => setSho(false);
  const handlShow = () => setSho(true);

  // Modal handlers for Attendance modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Add new profile
  const handlAdd = async () => {
    const reqBody = new FormData();
    reqBody.append('name', profile.name);
    reqBody.append('ids', profile.ids);
    reqBody.append('joinDate', profile.joinDate);
    reqBody.append('profileImage', profile.profileImage);

    const reqHeader = {
      "Content-Type": "multipart/form-data"
    };
    const result = await addProfileApi(reqBody, reqHeader);
    console.log(result);
    handlClose();
  };

  // Add attendance entry
  const add = async () => {
    const result = await attendenceAddApi(attendenceDetails);
    console.log(result);
    if (result.status === 200) {
      handleClose();
    }
  };

  // Fetch attendance data
  const gets = async () => {
    const result = await getAttendenceApi();
    console.log(result);
    setAttedence(result.data);
  };

  // Fetch profile data
  const getProfile = async () => {
    const result = await getProfileApi();
    console.log(result);
    setShowProfile(result.data);
    setProfileStatus(result);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, profileImage: file });
    setPreview(URL.createObjectURL(file));
  };

  // This callback receives response from the child and reloads the page.
  const handleEditResponse = (response) => {
    console.log('Response from child:', response);
    window.location.reload();
  };

  const deletion = (id) => {
    deleteProfileApi(id);
  };

  useEffect(() => {
    gets();
    getProfile();
  }, [attendenceDetails, profileStatus]);

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
      <Adminheader />

      <div className="container-fluid py-5 off">
        <h3 className='text-center text-black'>workers profile</h3>
        <div className="row px-3 mt-5">
          {showProfile?.map((item) => (
            <div className="col-md-3 mt-5" key={item._id}>
              <Card style={{ width: '100%', background: 'black' }}>
                <Card.Img variant="top" src={`${serverUrl}/upload/${item.profileImage}`} height="300px" />
                <Card.Body>
                  <Card.Title className='text-center text-white'>Name: {item.name}</Card.Title>
                  <hr />
                  <Card.Text>
                    <p className='text-center text-white'>Id: {item.ids}</p>
                    <p className='text-center text-white'>Join date: {item.joinDate}</p>
                  </Card.Text>
                  <hr />
                  <div className='text-center'>
                    <button onClick={() => deletion(item._id)} className='btn btn-danger'>delete</button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <div className='text-center'>
          <button onClick={handlShow} className='btn btn-warning text-black p-2 mt-5'>add member</button>
        </div>
      </div>

      <div className="container-fluid pt-5 not">
        <h3 className='text-center text-white mb-4'>worker attendence</h3>
        <button onClick={handleShow} className='btn btn-success py-3 px-5 ms-4 text-white'>entry</button>
        <div className='table-responsive'>
          <table className='w-100 container border border-dark shadow text-center mt-4'>
            <thead>
              <tr>
                <th className='border border-black p-3 bg-primary text-black'>date</th>
                <th className='border border-black p-3 bg-primary text-black'>id</th>
                <th className='border border-black p-3 bg-primary text-black'>name</th>
                <th className='border border-black p-3 bg-primary text-black'>attendence</th>
                <th className='border border-black p-3 bg-primary text-black'>daily wage</th>
                <th className='border border-black p-3 bg-primary text-black'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {attendence?.map((item) => (
                <tr key={item._id}>
                  <td className='p-3 border border-dark text-center text-warning'>{item.date}</td>
                  <td className='p-3 border border-dark text-center text-danger'>{item.idd}</td>
                  <td className='p-3 border border-dark text-black'>{item.name}</td>
                  <td className='p-3 border border-dark text-center' 
                      style={{ color: item.status === 'present' ? 'green' : 'red' }}>
                    {item.status}
                  </td>
                  <td className='p-3 border border-dark text-center' 
                      style={{ color: item.wage === 'paid' ? 'green' : 'red' }}>
                    {item.wage}
                  </td>
                  <td className='p-3 border border-dark text-center'>
                    <button className='bg-primary text-danger py-3 px-5 rounded'>
                      <WorkerAttendenceEdit project={item} onEditResponse={handleEditResponse} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className='text-center text-danger'>Attendence Form</Modal.Title>
          </Modal.Header>
          <Modal.Body className='p-3'>
            <input
              onChange={(e) => setAttendenceDetails({ ...attendenceDetails, date: e.target.value })}
              type="date"
              placeholder='date'
              className='form-control text-black p-2 my-3'
            />
            <input
              onChange={(e) => setAttendenceDetails({ ...attendenceDetails, idd: e.target.value })}
              type="text"
              placeholder='id'
              className='form-control text-black p-2 my-3'
            />
            <input
              onChange={(e) => setAttendenceDetails({ ...attendenceDetails, name: e.target.value })}
              type="text"
              placeholder='name'
              className='form-control text-black p-2 my-3'
            />

            {/* Attendance Status Dropdown */}
            <Dropdown className='my-3'>
              <Dropdown.Toggle 
                variant="light" 
                id="dropdown-status" 
                className='w-100 text-black'
                style={{ backgroundColor: 'white', border: '1px solid #ced4da' }}
              >
                {renderStatusTitle()}
              </Dropdown.Toggle>
              <Dropdown.Menu className='w-100'>
                <Dropdown.Item 
                  onClick={() => setAttendenceDetails({ ...attendenceDetails, status: 'present' })}
                >
                  <span style={{ color: 'green' }}>Present</span>
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => setAttendenceDetails({ ...attendenceDetails, status: 'absent' })}
                >
                  <span style={{ color: 'red' }}>Absent</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Wage Dropdown */}
            <Dropdown className='my-3'>
              <Dropdown.Toggle 
                variant="light" 
                id="dropdown-wage" 
                className='w-100 text-black'
                style={{ backgroundColor: 'white', border: '1px solid #ced4da' }}
              >
                {renderWageTitle()}
              </Dropdown.Toggle>
              <Dropdown.Menu className='w-100'>
                <Dropdown.Item 
                  onClick={() => setAttendenceDetails({ ...attendenceDetails, wage: 'paid' })}
                >
                  <span style={{ color: 'green' }}>Paid</span>
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => setAttendenceDetails({ ...attendenceDetails, wage: 'unpaid' })}
                >
                  <span style={{ color: 'red' }}>Unpaid</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={add}>
              upload
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Profile Modal */}
        <Modal show={sho} onHide={handlClose}>
          <Modal.Header closeButton>
            <Modal.Title>WORKER DETAILS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor='file-upload'>
                    <img
                      src={preview || "https://th.bing.com/th/id/OIP.mxmxkeYx1BpyCuZqgg_fhgHaHa?rs=1&pid=ImgDetMain"}
                      className='w-100'
                      alt="Preview"
                    />
                    <input
                      id='file-upload'
                      onChange={handleFile}
                      className='d-none'
                      type="file"
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder='Worker name'
                    className='form-control p-2 my-2'
                  />
                  <input
                    type="text"
                    onChange={(e) => setProfile({ ...profile, ids: e.target.value })}
                    placeholder='Worker id'
                    className='form-control p-2 my-2'
                  />
                  <input
                    type="date"
                    onChange={(e) => setProfile({ ...profile, joinDate: e.target.value })}
                    placeholder='Worker joinDate'
                    className='form-control p-2 my-2'
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlClose}>
              Close
            </Button>
            <Button variant="success" onClick={handlAdd}>
              Add Member
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default WokersPage;
