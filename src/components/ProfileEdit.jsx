import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../../service/serviceUrl';
import { updateProfileApi } from '../../service/allApi';

function ProfileEdit({ items }) {
  const [preview, setPreview] = useState('');
  const [show, setShow] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());
  const [profile, setProfile] = useState({
    name: items.name,
    ids: items.ids,
    joinDate: items.joinDate,
    profileImage: items.profileImage,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update profile with the new file
      setProfile((prev) => ({ ...prev, profileImage: file }));
      // Refresh the file input key if needed
      setInputKey(Date.now());
    }
  };
  const handleCancel = () => {
    setSalesDetails({ 
        name: items.name,
        ids: items.ids,
        joinDate: items.joinDate,
        profileImage: ""
    
    });
    setPreview('');
    setKey(prev => (prev === 0 ? 1 : 0));
  };

  const handleChange= async()=>{
 
        const { name, id, joinDate } = profile;
        if (!name || !id || !joinDate) {
          toast.info('Fill the form completely');
          return;
        }
    
        try {
          const reqBody = new FormData();
          reqBody.append("name", name);
          reqBody.append("ids", ids);
          reqBody.append("joinDate", joinDate);
          // Append new image if selected, otherwise send the existing one
          preview
            ? reqBody.append("images", profile.profileImage)
            : reqBody.append("images", items.profileImage);
    
          const reqHeader = {
            "Content-Type": "multipart/form-data"
          };
    
          const result = await updateProfileApi(items._id, reqBody, reqHeader);
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
    

  }

  useEffect(() => {
    let objectUrl;
    if (profile.profileImage instanceof Blob) {
      objectUrl = URL.createObjectURL(profile.profileImage);
      setPreview(objectUrl);
    } else {
      // If it's not a blob, we can clear the preview
      setPreview('');
    }
    // Cleanup the object URL when component unmounts or when profile changes
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [profile.profileImage]);

  return (
    <>
      <button onClick={handleShow} className='btn btn-warning py-2'>
        Update
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor='file-upload' style={{ cursor: 'pointer' }}>
                  <img 
                    src={preview || `${serverUrl}/upload/${items.profileImage}`} 
                    className='w-100' 
                    alt="Profile Preview" 
                  />
                  <input 
                    id='file-upload' 
                    key={inputKey} 
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
                    onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))} 
                    value={profile.name} 
                    placeholder='Name' 
                    className='form-control p-2 my-3' 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    onChange={(e) => setProfile((prev) => ({ ...prev, ids: e.target.value }))} 
                    value={profile.ids} 
                    placeholder='ID' 
                    className='form-control p-2 my-3' 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    onChange={(e) => setProfile((prev) => ({ ...prev, joinDate: e.target.value }))} 
                    value={profile.joinDate} 
                    placeholder='Join Date' 
                    className='form-control p-2 my-3' 
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileEdit;
