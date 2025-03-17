import React from 'react'

export default function SignUpReasonButton({text, icon, reason, handleReason}) {
  return (
    <>
        <button onClick={handleReason} data-reason={reason} className="flex flex-col justify-center rounded-[5px] w-full items-center px-8 py-8 bg-white hover:cursor-pointer focus:border focus:p-[31px]  ">
          <img src={icon} alt="" className='h-[25px] ' />
          <p className='text-[12px] text-center text-gray-500 mb-[25px] !m-0 '>{text}</p>
        </button>
    </>
    
  )
}
