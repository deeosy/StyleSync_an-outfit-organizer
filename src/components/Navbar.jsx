// components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import useAuthencationStore from '../store/userStore'

export default function Navbar() {
  const { isAuthenticated } = useAuthencationStore()  // this gets authenticated status

  return (
    <nav className='bg-[#f5f5f5] text-black manrope  ' >
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center gap-[4px] lg:gap-[74px]xl:gap-[174px] text-[16px] md:text-[24px] w-full py-[33px] ">
          <div className="bagel text-black text-[48px] ">
            <Link to='/'>
              StyleSync
            </Link>
          </div>
          { // shows links only if the user is logged in
            isAuthenticated && (
              <div className=" hidden sm:flex justify-center items-center py-4 text-[#212529] manrope">
                <ul className='flex space-x-6'>
                  <li>
                    <Link to='/dashboard' className='hover:bg-pink-400  px-3 py-2 rounded transition-colors' >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to='/wardrobe' className='hover:bg-pink-400  px-3 py-2 rounded transition-colors' >
                      My StyleSync
                    </Link>
                  </li>
                  <li>
                    <Link to='/outfits' className='hover:bg-pink-400  px-3 py-2 rounded transition-colors' >
                      Outfit Builder
                    </Link>
                  </li>
                </ul>
              </div>
            )
          }
          { // removes sign in button when user is logged in
            !isAuthenticated && (
              <Link to='/authenticaion/sign-in' >
                <button className='text-white rounded-[3px] bg-pink-400 manrope px-4 py-3 md:px-10 md:py-4 hover:cursor-pointer ' >Sign In</button>
              </Link>
            )
          }
        </div>
      </div>
    </nav>
  )
}
