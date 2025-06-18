import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Usersignup from '../User/Component/Usersignup'
import Userlogin from '../User/Component/Userlogin'
import Home from '../User/Component/Home'
import Profile from '../User/Component/Profile'
import Bookdetails from '../User/Component/Bookdetails'
import Shop from '../User/Component/Shop'
import Cartpage from '../User/Component/Cartpage'
import Showcart from '../User/Component/Showcart'
import Checkout from '../User/Component/Checkout'
import Sucesspayment from '../User/Component/Sucesspayment'
import Logout from '../User/Component/Logout'
import Headerlayout from '../User/Component/Headerlayout'

export default function UserRoutes() {
    return (
        <div>
            <Routes>


                <Route path='/users/signup' element={<Headerlayout><Usersignup /></Headerlayout>}></Route>
                <Route path='/users/login' element={<Headerlayout><Userlogin /></Headerlayout>}></Route>
                <Route path='/home' element={<Headerlayout><Home /></Headerlayout>}></Route>
                <Route path='/profile' element={<Headerlayout><Profile /></Headerlayout>}></Route>
                <Route path='/bookdetail/:id' element={<Headerlayout><Bookdetails /></Headerlayout>}></Route>
                <Route path='/shop' element={<Headerlayout><Shop /></Headerlayout>}></Route>
                <Route path='/add-cart' element={<Cartpage />} />
                <Route path='/user-cart' element={<Headerlayout><Showcart /></Headerlayout>} />
                <Route path='/checkout' element={<Headerlayout><Checkout /></Headerlayout>} />
                <Route path='/success' element={<Headerlayout><Sucesspayment></Sucesspayment></Headerlayout>}></Route>
                <Route path='/user-logout' element={<Headerlayout><Logout /></Headerlayout>}></Route>


            </Routes>
        </div>
    )
}
