import React from 'react'
import skyBG from '../images/image.png'
import useAuthencationStore from '../store/userStore' 
import Footer from '../components/Footer'
import { Link, Outlet, useLocation } from 'react-router-dom'


export default function Authentication() {
    const { resetUser } = useAuthencationStore(); //get reset function from Zustand
    const location = useLocation()  // get current route pathname
    const hideButtons = ['/authenticaion/sign-up-reason', '/authenticaion/sign-up-details'].includes(location.pathname)    // hide buttons if user is on these pages
    
  return (
    <div className="relative overflow-hidden w-full h-full manrope text-[#212529] ">
        <img src={skyBG} alt="sky background" className='h-full w-full object-cover absolute ' />
        <div className="bg-[#f5f5f5] rounded-[15px] relative md:mx-auto md:max-w-[500px]    my-[100px] sm:mx-[40px] mx-[20px] py-4    ">
            {/* hide buttons when on particular pages */}
            {!hideButtons && (
                <>
                    <p className='text-center sm:text-[27px] font-bold '>Welcome to StyleSync</p>
                    {/* Sign in / Sign Out Navigation  */}
                    <div className=" sm:mx-10 flex justify-around  px-3 md:gap-[30px] mt-[20px] md:mt-[58px] mb-[33px] ">
                        <Link to='/authenticaion/sign-in' onClick={resetUser} >
                            <button className={`rounded-[5px] px-4 py-2 sm:px-6 sm:py-3 text-[16px] sm:text-2xl cursor-pointer ${location.pathname === '/authenticaion/sign-in' ? 'bg-[#B1D2F1]' : 'bg-white'}`}>Sign In</button>
                        </Link>
                        <Link to='/authenticaion' onClick={resetUser} >
                            <button className={`rounded-[5px] px-4 py-2 sm:px-6 sm:py-3 text-[16px] sm:text-2xl cursor-pointer ${location.pathname === '/authenticaion' ? 'bg-[#B1D2F1]' : 'bg-white'} `} >Sign Up</button>
                        </Link>
                    </div>
                </>
            )}
            <Outlet />
        </div>
        <Footer position={'relative'} />
    </div>
  )
}