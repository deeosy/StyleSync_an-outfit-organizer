import React from 'react'
import alertCircle from '../icons/alert-circle.png'

export default function PasswordError() {
  return (
    <>
			<div className="flex gap-[9px] ">
				<img src={alertCircle} alt="" className='w-[20px] h-[20px] ' />
				<p className='text-[12px] text-[#ED4F9D]'>Your password is not strong enough. Use at least 8 characters</p>
			</div>
    </>
  )
}
