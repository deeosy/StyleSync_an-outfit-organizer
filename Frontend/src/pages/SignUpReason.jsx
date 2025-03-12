import React from 'react'
import { motion } from "framer-motion";
import prevArrow from '../icons/weui_arrow-outlined.png'

export default function SignUpReason() {
  return (
    <div>
            <div className="mx-4 sm:mx-10 py-[30px]">
        <div className="flex items-center justify-between w-full">
            <img src={prevArrow} alt="previous button" className='h-[24px] ' />
            <p className='text-center sm:text-[20px] font-bold '>Why are you here?</p>
            <div className=""></div>
        </div>
        <div className="flex gap-3 my-[27px] w-full z-10">
            <div className="w-full border border-[#F06D99] "></div>
            <div className="w-full border border-[#F06D99] "></div>
            <motion.div
                initial={{ x: "-100%", border:'1px solid black',  }} // Starts from right
                animate={{ x: "0%", border:'1px solid #F06D99', }} // Moves to original position
                transition={{ duration: 1, ease: "linear" }} // 3s linear transition
                className="w-full "                
            />
        </div>
        <p className='text-[12px] text-gray-500 mb-[25px]'>Select your main reason for signing up to StyleSync and we’ll customize your experience so you can get the most out of your wardrobe.</p>


    </div>
    </div>
  )
}
