import React, { useEffect, useState } from 'react';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Adminheader from '../components/Adminheader';
import Monthlybutton from '../components/Monthlybutton';
import { addExpenseApi, deleteExpenseApi, getExpenseApi } from '../../service/allApi';
import { serverUrl } from '../../service/serviceUrl';
import { ToastContainer, toast } from 'react-toastify';
import ExpenseEdit from '../components/ExpenseEdit';
import Footer from '../components/Footer';

function ExpensePage() {
  const [preview, setPreview] = useState('');
  const [expenseDetails, setExpenseDetails] = useState({ date: '', product: '', price: '', image: '' });
  const [expenses, setExpenses] = useState([]);
  const [show, setShow] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0); // Total number of products
  const [totalAmount, setTotalAmount] = useState(0); // Total expense amount
  const [status,setStatus]=useState(0)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExpenseDetails({ ...expenseDetails, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const fetchExpenses = async () => {
    try {
      const result = await getExpenseApi();
      setExpenses(result.data);
      setStatus(result)

    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const addExpense = async () => {
    try {
      if (!expenseDetails.date || !expenseDetails.product || !expenseDetails.price || !expenseDetails.image) {
        alert("All fields are required.");
        return;
      }

      const formData = new FormData();
      formData.append('date', expenseDetails.date);
      formData.append('product', expenseDetails.product);
      formData.append('price', expenseDetails.price);
      formData.append('image', expenseDetails.image);

      const result = await addExpenseApi(formData, { "Content-Type": "multipart/form-data" });
      if (result.status === 200) {
        toast.success('Expense added successfully');
      } else {
        toast.warning('Something went wrong');
      }
      handleClose();
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  const deleteAllExpenses = async () => {
    try {
      await deleteExpenseApi();
      setExpenses([]);
      setTotalExpenses(0);
      setTotalAmount(0);
    } catch (error) {
      console.error("Error deleting expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [status]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to calculate total expenses and total amount (only when button is clicked)
  const calculateTotals = () => {
    const totalExpenseCount = expenses.length;
    const totalExpenseAmount = expenses.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
    setTotalExpenses(totalExpenseCount);
    setTotalAmount(totalExpenseAmount);
  };

  // Callback function to receive update response from ExpenseEdit child
  const handleEditResponse = (response) => {
    console.log('Expense updated:', response);
    window.location.reload(); // Reload the page when update is received
  };

  return (
    <div className='bg-white'>
      <div className="container-fluid" style={{ height: '100%', background: 'wheat' }}>
        <Adminheader />
        <h3 className='text-black text-center mb-5 p-5'>Expense Page</h3>
        <div className="row">
          <div className="col-md-8">
            <div className='d-flex justify-content-between'>
              <button onClick={handleShow} className='btn btn-success p-3 text-black m-3' style={{ fontSize: '20px', fontWeight: '800' }}>Upload Report</button>
              <button onClick={deleteAllExpenses} className='btn btn-warning p-3 text-black m-3' style={{ fontSize: '20px', fontWeight: '800' }}>Clear Page</button>
            </div>
            <div className='table-responsive'>
              <table className='w-100 border border-dark shadow text-center'>
                <thead>
                  <tr>
                    <th className='border border-black p-3 bg-primary text-black'>Date</th>
                    <th className='border border-black p-3 bg-primary text-black'>Type</th>
                    <th className='border border-black p-3 bg-primary text-black'>Image</th>
                    <th className='border border-black p-3 bg-primary text-black'>Amount</th>
                    <th className='border border-black p-3 bg-primary text-black'>Action</th>
                  </tr>
                </thead>
                <tbody className='bg-white'>
                  {expenses.length > 0 ? (
                    expenses.map((item, index) => (
                      <tr key={index}>
                        <td className='p-3 border border-dark text-center text-warning'>{item.date}</td>
                        <td className='p-3 border border-dark text-center text-danger'>{item.product}</td>
                        <td className='p-3 border border-dark d-flex justify-content-center'>
                          <img src={`${serverUrl}/upload/${item.image}`} style={{ height: '120px' }} alt="Product" />
                        </td>
                        <td className='p-3 border border-dark text-center text-success'>{item.price}</td>
                        <td className='p-3 border border-dark text-center'>
                          {/* Pass the onEditResponse callback to the child */}
                          <ExpenseEdit project={item} onEditResponse={handleEditResponse} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-5">No expenses found. Start adding!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className='shadow bg-white p-5'>
              <h3 className='text-center text-warning'>EXPENSE TILL DATE</h3>
              <p className='mt-4 text-black'>Total number of products: <span className="fw-bold text-danger">{totalExpenses}</span></p>
              <p className='mt-4 text-black'>Grand Total: <span className="fw-bold text-success">₹{totalAmount.toLocaleString()}</span></p>
              <button 
                className='w-100 bg-success text-white p-3 mt-5 hover:border hover:border-green-600 hover:bg-white hover:text-green-600'
                onClick={calculateTotals}
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <Monthlybutton />
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} centered >
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Expense Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor='file-input'>
                  <img src={preview || "https://cdn-icons-png.flaticon.com/512/7889/7889938.png"} className='w-100' alt="Preview" />
                  <input id='file-input' onChange={handleFileChange} className='d-none' type="file" />
                </label>
              </div>
              <div className="col-md-6">
                <input type="date" placeholder='Date' onChange={(e) => setExpenseDetails({ ...expenseDetails, date: e.target.value })} className='form-control p-2 my-3' />
                <input type="text" placeholder='Product' onChange={(e) => setExpenseDetails({ ...expenseDetails, product: e.target.value })} className='form-control p-2 my-3' />
                <input type="number" placeholder='Price' onChange={(e) => setExpenseDetails({ ...expenseDetails, price: e.target.value })} className='form-control p-2 my-3' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>Cancel</Button>
          <Button onClick={addExpense} variant="success">Add Report</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' autoClose={2000} theme="colored" />
      <Footer/>
    </div>
  );
}

export default ExpensePage;
