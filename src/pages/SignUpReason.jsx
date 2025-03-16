import React from 'react'
import { motion } from "framer-motion";
import prevArrow from '../icons/leftArrow.png'
import wardrobe from '../icons/wardrobe-outline.png'
import SignUpReasonButton from '../components/SignUpReasonButton';
import brain from '../icons/brain-outline.png'
import camera from '../icons/camera-outline.png'
import discover from '../icons/discover-outline.png'
import bar from '../icons/bar-chart-outline.png'
import picture from '../icons/picture-outline.png'
import { Link } from 'react-router-dom';
import useAuthencationStore from '../store/userStore';

export default function SignUpReason() {
  const {user, updateUser} = useAuthencationStore();
  const isReasonSelected = Boolean(user.reason); // Check if a reason is selected

  const handleReason =(e) => { 
    updateUser("reason", e.currentTarget.dataset.reason )
  }
  console.log(user);

  return (
    <div>
        <div className="mx-4 sm:mx-10 py-[30px]">
          <div className="flex items-center justify-between w-full">
            <Link to='/authenticaion/sign-up-details'>
              <img src={prevArrow} alt="previous button" className='h-[30px] p-0.5' />
            </Link>
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
        <div className="flex flex-col gap-4 h-[300px] sm:h-full md:overflow-scroll no-scrollbar   ">
          <div className="flex flex-col gap-8 sm:flex-row justify-between ">
              <SignUpReasonButton handleReason={handleReason} reason='Organise' icon={wardrobe} text='Organise my wardrobe' />
              <SignUpReasonButton handleReason={handleReason} reason='AI recommendations' icon={brain} text='Get Personalised AI recommendations' />
          </div>
          <div className="flex flex-col gap-8 sm:flex-row justify-between ">
              <SignUpReasonButton handleReason={handleReason} reason='Visual record' icon={camera} text='Visual record of clothing' />
              <SignUpReasonButton handleReason={handleReason} reason='Discover outfit' icon={discover} text='Discover new outfit ideas' />
          </div>
          <div className="flex flex-col gap-8 sm:flex-row justify-between ">
              <SignUpReasonButton handleReason={handleReason} reason='Track wardrobe' icon={bar} text='See and track wardrobe value' />
              <SignUpReasonButton handleReason={handleReason} reason='Document' icon={picture} text='Document or refine my personal style' />
          </div>          
        </div>
        <div className="flex flex-col mt-[27px] ">
          {/* Routing extra security in case btn styling of btn is over written */}
          <Link to={isReasonSelected ? "/dashboard" : "#"} > 
            <button 
              type='submit' disabled={!isReasonSelected}
              className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
              isReasonSelected ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'}`} 
            >
              Continue
            </button>
          </Link>
          <Link to='/dashboard' >
              <p className='text-center pt-[13px] font-bold '>Skip</p>
          </Link>
        </div>
    </div>
    </div>
  )
}
