import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='flex text-center justify-center'>

      <div className='flex flex-col shadw-xl p-[10px]'>
      <p className='p-[10px] text-[20px] font-bold'>Pages</p>
        <Link className='p-[10px] hover:border-b-[2px]' to="/home">Home</Link>
        <Link className='p-[10px] hover:border-b-[2px]' to="/shop">Shop</Link>
        <Link className='p-[10px] hover:border-b-[2px]' to="/about">About us</Link>
        <Link className='p-[10px] hover:border-b-[2px]' to="/contactus">Contact us</Link>
      </div>


      <div className='flex flex-col shadw-xl p-[10px]'>
      <p className='p-[10px] text-[20px] font-bold'>Follow</p>
        <Link className='p-[10px] hover:border-b-[2px]' to="https://github.com/Ayushparmar1705">Github</Link>
        <Link className='p-[10px] hover:border-b-[2px]' to="instagram.com/ayushparmar1705">Shop</Link>
        <Link className='p-[10px] hover:border-b-[2px]' to="https://www.youtube.com/@PowerMash">Youtube</Link>

      </div>
      
    </div>
  )
}
