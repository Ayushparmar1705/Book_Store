import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Adminlogin from '../Admin/Component/AdminLogin/Adminlogin'
import Adminheaderlayout from '../Admin/Component/AdminHeader/Adminheaderlayout'
import Dashboard from '../Admin/Component/AdminLogin/Dashboard'
import Addbooks from '../Admin/Component/Books/Addbooks'
import Addcategory from '../Admin/Component/Category/Addcategory'
import Listcategory from '../Admin/Component/Category/Listcategory'
import Listbooks from '../Admin/Component/Books/Listbooks'
import Updatebook from '../Admin/Component/Books/Updatebook'
import Manageuser_orders from '../Admin/Component/ManageUsers/Manageuser_orders'
import Deletebooks from '../Admin/Component/Books/Deletebooks'
import Searchbook from '../Admin/Component/Books/Searchbook'
import Manageuser from '../Admin/Component/ManageUsers/Manageuser'
import Deleteuser from '../Admin/Component/ManageUsers/Deleteuser'
import Edituser from '../Admin/Component/ManageUsers/Edituser'


export default function AdminRoutes() {

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
        <Route path='/admin/deleteuser/:id' element={<Adminheaderlayout><Deleteuser /></Adminheaderlayout>}></Route>
        <Route path='/admin/edituser/:id' element={<Adminheaderlayout><Edituser /></Adminheaderlayout>}></Route>
      </Routes>
    </div>
  )
}
