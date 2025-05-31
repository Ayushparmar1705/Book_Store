import React from 'react'

import { Routes, Route } from 'react-router-dom';
import Dashboard from './Admin/Component/AdminLogin/Dashboard';
import Adminlogin from './Admin/Component/AdminLogin/Adminlogin';
import Adminheaderlayout from './Admin/Component/AdminHeader/Adminheaderlayout';
import Headerlayout from './User/Component/Headerlayout';
import Addcategory from './Admin/Component/Category/Addcategory';
import Listcategory from './Admin/Component/Category/Listcategory';
import Addbooks from './Admin/Component/Books/Addbooks';
import Listbooks from './Admin/Component/Books/Listbooks';
import Updatebook from './Admin/Component/Books/Updatebook';
import Searchbook from './Admin/Component/Books/Searchbook';
import Usersignup from './User/Component/Usersignup';
import Userlogin from './User/Component/Userlogin';
import Home from './User/Component/Home';
import Profile from './User/Component/Profile';
import Bookdetails from './User/Component/Bookdetails';
import Shop from './User/Component/Shop';
import Cartpage from './User/Component/Cartpage';
import Manageuser from './Admin/Component/ManageUsers/Manageuser';
import Showcart from './User/Component/Showcart';
import Checkout from './User/Component/Checkout';

import Sucess_payment from './User/Component/Sucesspayment';
import Deleteuser from './Admin/Component/ManageUsers/Deleteuser';
import Logout from './User/Component/Logout';
import Deletebooks from './Admin/Component/Books/Deletebooks';
import Edituser from './Admin/Component/ManageUsers/Edituser';
import Footer from './User/Component/Footer';
import Manageuser_orders from './Admin/Component/ManageUsers/Manageuser_orders';


export default function App() {

  return (

    <div>
    
      <Routes>
        <Route path='/' element={<Adminlogin />}></Route>
        <Route path='/dashboard' element={<Adminheaderlayout><Dashboard /></Adminheaderlayout>}></Route>
        <Route path='/dashboard/addbooks' element={<Adminheaderlayout><Addbooks /></Adminheaderlayout>}></Route>
        <Route path='/dashboard/addcategory' element={<Adminheaderlayout><Addcategory /></Adminheaderlayout>}></Route>
        <Route path='/dashboard/listcategory' element={<Adminheaderlayout><Listcategory /></Adminheaderlayout>}></Route>
        <Route path='/dashboard/bookslist' element={<Adminheaderlayout><Listbooks /></Adminheaderlayout>}></Route>
        <Route path='/dashboard/onebook/:id' element={<Adminheaderlayout><Updatebook /></Adminheaderlayout>}></Route>
        <Route path='/dashboard/userorders' element={<Adminheaderlayout><Manageuser_orders></Manageuser_orders></Adminheaderlayout>}></Route>
        <Route path='/dashboard/deletebook/:id' element={<Adminheaderlayout><Deletebooks></Deletebooks></Adminheaderlayout>}></Route>
        <Route path='/dashboard/search' element={<Adminheaderlayout><Searchbook /></Adminheaderlayout>}></Route>
        <Route path='/admin/all-users' element={<Adminheaderlayout><Manageuser /></Adminheaderlayout>}></Route>
        <Route path='/admin/deleteuser/:id' element={<Headerlayout><Deleteuser/></Headerlayout>}></Route>
        <Route path='/admin/edituser/:id' element={<Adminheaderlayout><Edituser/></Adminheaderlayout>}></Route>
        <Route path='/users/signup' element={<Headerlayout><Usersignup /></Headerlayout>}></Route>
        <Route path='/users/login' element={<Headerlayout><Userlogin /></Headerlayout>}></Route>
        <Route path='/home' element={<Headerlayout><Home /></Headerlayout>}></Route>
        <Route path='/profile' element={<Headerlayout><Profile /></Headerlayout>}></Route>
        <Route path='/bookdetail/:id' element={<Headerlayout><Bookdetails /></Headerlayout>}></Route>
        <Route path='/shop' element={<Headerlayout><Shop /></Headerlayout>}></Route>
        <Route path='/add-cart' element={<Cartpage />} />
        <Route path='/user-cart' element={<Headerlayout><Showcart /></Headerlayout>} />
        <Route path='/checkout' element={<Headerlayout><Checkout /></Headerlayout>} />
        <Route path='/success' element={<Headerlayout><Sucess_payment></Sucess_payment></Headerlayout>}></Route>
        <Route path='/user-logout' element={<Headerlayout><Logout/></Headerlayout>}></Route>
     

      </Routes>



    </div>
  )
}
