import React from 'react'

export default function SignUpOptions({icon}) {
  return (
    <>
        <button className='bg-white w-[100px] h-[40px] sm:w-[160px] sm:h-[61px] rounded-[5px] flex justify-center items-center hover:cursor-pointer' >
            <img src={icon} alt={`${icon}-icon`} className='h-[20px] w-[20px]  sm:h-[25px] sm:w-[25px]' />
        </button>
    </>
  )
}

// w-[105px] h-[40px] sm:w-[275px] sm:h-[71px] md:text-[24px]