import React, { useEffect, useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Adminheader from '../components/Adminheader';
import { allSalesReportApi, deleteSalesReportApi, salesReportApi } from '../../service/allApi';
import { serverUrl } from '../../service/serviceUrl';
import { ToastContainer, toast } from 'react-toastify';
import SalesEdit from '../components/SalesEdit';
import Footer from '../components/Footer';

function SalesPage() {
  const [token, setToken] = useState('');
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const [salesList, setSalesList] = useState([]);
  const [salesDetails, setSalesDetails] = useState({ date: "", litres: "", price: "", images: "" });
  const [totalLitres, setTotalLitres] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [resulting, setResulting] = useState("");

  const calculateTotals = () => {
    const totalLitresCalc = salesList.reduce((total, sale) => total + Number(sale.litres), 0);
    const grandTotalCalc = salesList.reduce((total, sale) => total + Number(sale.price), 0);
    setTotalLitres(totalLitresCalc);
    setGrandTotal(grandTotalCalc);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch sales data
  const getSales = async () => {
    try {
      const result = await allSalesReportApi();
      setSalesList(result.data);
      setResulting(result.status);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  // Handle file upload for report
  const handleFile = (e) => {
    const file = e.target.files[0];
    setSalesDetails({ ...salesDetails, images: file });
    setPreview(URL.createObjectURL(file));
  };

  // Upload sales report
  const salesReport = async () => {
    if (!salesDetails.date || !salesDetails.litres || !salesDetails.price || !salesDetails.images) {
      alert("Please fill all fields and upload an image.");
      return;
    }
    
    try {
      const reqBody = new FormData();
      reqBody.append("date", salesDetails.date);
      reqBody.append("litres", salesDetails.litres);
      reqBody.append("price", salesDetails.price);
      reqBody.append("images", salesDetails.images);

      if(token){
        const reqHeader = { 
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${token}`
        };
        const result = await salesReportApi(reqBody, reqHeader);
        if(result.status === 200){
          toast.success('Daily sales added successfully');
        } else {
          toast.warning('Something went wrong');
        }
        getSales();
        handleClose();
      } else {
        toast.error('Please login');
      }
    } catch (error) {
      console.error("Error uploading sales report:", error);
    }
  };

  // Delete all sales reports
  const deleteAll = async () => {
    try {
      await deleteSalesReportApi();
      setSalesList([]);
    } catch (error) {
      console.error("Error deleting sales data:", error);
    }
  };

  // Callback from SalesEdit: reload the page when a child update is received
  const handleEditResponse = (response) => {
    console.log('Received update from SalesEdit:', response);
    window.location.reload();
  };

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }
    getSales();
  }, [resulting, salesDetails]);

  return (
    <div className="container-fluid" style={{ height: '100%', background: 'wheat' }}>
      <Adminheader />
      <h3 className='text-black text-center mt-5 mb-5 p-5'>Sales Page</h3>

      <div className="row">
        <div className="col-md-8">
          <div className='d-flex justify-content-between'>
            <button onClick={handleShow} className='btn btn-success p-3 m-3' style={{ fontSize: '20px', fontWeight: '800' }}>Upload Report</button>
            <button onClick={deleteAll} className='btn btn-warning p-3 m-3' style={{ fontSize: '20px', fontWeight: '800' }}>Clear Page</button>
          </div>
          <div className='table-responsive'>
            <table className='w-100 border border-dark shadow text-center '>
              <thead>
                <tr>
                  <th className='border border-black p-3 bg-primary text-black'>Date</th>
                  <th className='border border-black p-3 bg-primary text-black'>Quantity</th>
                  <th className='border border-black p-3 bg-primary text-black'>Image</th>
                  <th className='border border-black p-3 bg-primary text-black'>Amount</th>
                  <th className='border border-black p-3 bg-primary text-black'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {salesList.map((item, index) => (
                  <tr key={index}>
                    <td className='p-3 border border-dark text-warning'>{item.date}</td>
                    <td className='p-3 border border-dark text-danger'>{item.litres} litres</td>
                    <td className='p-3 border border-dark d-flex justify-content-center'>
                      <img src={`${serverUrl}/upload/${item.images}`} style={{ height: '120px' }} alt="Sales" />
                    </td>
                    <td className='p-3 border border-dark text-success'>{item.price}</td>
                    <td className='p-3 border border-dark text-center'>
                      {/* Pass the callback to the child SalesEdit component */}
                      <SalesEdit project={item} onEditResponse={handleEditResponse} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
               
        <div className="col-md-4 mt-2">
          <div className='shadow bg-white p-5'>
            <h3 className='text-center text-warning'>SALES TILL DATE</h3>
            <p>Total number of litres: <span className='text-danger'>{totalLitres}</span></p>
            <p>Grand Total: ₹ <span className='text-success'>{grandTotal}</span></p>
            <button onClick={calculateTotals} className='w-100 bg-success text-white p-3 mt-5'>Calculate</button>
          </div>
        </div>
      </div>

      <div className='text-center'>
        <Monthlysales />
      </div>

      {/* Modal for Sales Report Upload */}
      <Modal show={show} onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Sales Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <label htmlFor='upload'>
                  <img src={preview || "https://cdn-icons-png.flaticon.com/512/7889/7889938.png"} className='w-100' alt="Preview" />
                  <input id='upload' className='d-none' type="file" onChange={handleFile} />
                </label>
              </div>
              <div className="col-md-6">
                <input type="date" placeholder='Date' onChange={(e) => setSalesDetails({ ...salesDetails, date: e.target.value })} className='form-control p-2 my-3' />
                <input type="number" placeholder='Litres' onChange={(e) => setSalesDetails({ ...salesDetails, litres: e.target.value })} className='form-control p-2 my-3' />
                <input type="number" placeholder='Price' onChange={(e) => setSalesDetails({ ...salesDetails, price: e.target.value })} className='form-control p-2 my-3' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>Cancel</Button>
          <Button onClick={salesReport} variant="success">Add Report</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' autoClose={2000} theme="colored" />
      <Footer/>
    </div>
  );
}

export default SalesPage;
