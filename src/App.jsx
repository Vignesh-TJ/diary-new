
import './App.css'
import Auth from './pages/Auth'
import Auth2 from './pages/Auth2'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
// import Cart from './pages/Cart'
import SalesPage from './pages/SalesPage'
import ExpensePage from './pages/ExpensePage'
import Unknown from './pages/Unknown'
import AdminHome from './pages/AdminHome'
import { Route, Routes } from 'react-router-dom'
import Monthlyreport from './pages/Monthlyreport'
import Soft from './pages/Soft'
import WokersPage from './pages/WokersPage'
import Orginal from './pages/Orginal'

function App() {

  return (
   <>
 
   <Routes>
   <Route path='/' element={<Orginal/>}/>
    <Route path='/adminhome' element={<AdminHome/>}/>
    <Route path='/salespage' element={<SalesPage/>}/>
    <Route path='/expensepage' element={<ExpensePage/>}/>
    <Route path='*' element={<Unknown/>}/>
    <Route path='/login' element={<Auth/>}/>
    <Route path='/register' element={<Auth2/>}/>
    <Route path='/home' element={<Home/>}/>
    
    <Route path='/wishlist' element={<Wishlist/>}/>
    <Route path='/monthlyreport' element={<Monthlyreport/>}/>

    <Route path='/softcopy' element={<Soft/>}/>
    <Route path='/worker' element={<WokersPage/>}/>





   </Routes>
{/* <Cart/> */}
   </>
  )
}

export default App
