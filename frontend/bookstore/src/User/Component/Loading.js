import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Loading() {
  const location = useLocation();
  return (
    <div className='h-[100vh] w-[100%]'>
      <img src='./images/loading.gif' className={`${location.pathname === '/home' ? "m-auto h-[100px] w-[100px]" : "ml-[300px] h-[100px] w-[100px] max-[900px]:m-auto"}`} alt='No '></img>
    </div>
  )
}
