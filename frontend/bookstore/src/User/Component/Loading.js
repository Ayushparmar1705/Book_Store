import React from 'react'
import loading from "./loading.gif"
export default function Loading() {
  return (
    <div className='h-[100vh]'>
      <img className='m-[auto] h-[50px] w-[50px]' src={loading} alt='No'></img>
    </div>
  )
}
