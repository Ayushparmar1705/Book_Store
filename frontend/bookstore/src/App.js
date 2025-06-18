import React from 'react'
import AdminRoutes from "../src/Admin_Routes/AdminRoutes"
import ScrollTop from './User/Component/ScrollTop';
import UserRoutes from './User_Routes/UserRoutes';



export default function App() {

  return (

    <div>
      <ScrollTop />

      <AdminRoutes />
      <UserRoutes />


    </div>
  )
}
