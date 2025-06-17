import React from 'react'


export default function Footer() {
  return (
    <div className=' bg-gray-700 text-white flex justify-center'>

      <div className='shadw-xl p-[10px]'>
        <div className='flex'></div>
        <p className='text-center'>Book Haven</p>
        <div className='flex p-[10px]'>
          <img src='./images/location_on.png' alt='Noimage'></img><p>A-605 Pearl-79 Behind divya jyot school</p>
        </div>
        <div className='flex p-[10px]'>
          <img src='./images/email.png' alt='Noimage'></img><p>ayushparmar1705@gmail.com</p>
        </div>
        <div className='flex p-[10px]'>
          <img src='./images/call.png' alt='Noimage'></img><p>8849580017</p>
        </div>



      </div>
      <div className='p-[10px]'>

        <p className='p-[10px] font-bold'>Our Pages</p>

        <p className='p-[10px]'>Login</p>
        <p className='p-[10px]'>Sign Up</p>
        <p className='p-[10px]'>Home</p>
        <p className='p-[10px]'>About us</p>
        <p className='p-[10px]'>Contact us</p>
      </div>
      <div className='p-[10px]'>

        <p className='p-[10px] font-bold'>Our Social Media</p>

        <p className='p-[10px]'>Dribble</p>
        <p className='p-[10px]'>Github</p>
        <p className='p-[10px]'>Instagram</p>
        <p className='p-[10px]'>Facebook</p>

      </div>


    </div>
  )
}
