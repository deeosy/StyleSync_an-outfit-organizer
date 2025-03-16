// components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='bg-[#f5f5f5] text-black manrope  ' >
      <div className="container mx-auto px-3">
        <div className="bagel text-black text-[48px] pt-[20px] pb-[20px] sm:pb-[0px] sm:text-center  ">StyleSync</div>
        <div className="hidden sm:flex justify-between items-center gap-[4px] lg:gap-[74px]xl:gap-[174px] text-[16px] md:text-[24px] w-full py-[33px] ">
          <div className=""></div>
          <div className="flex justify-center items-center py-4 text-[#212529] manrope">
            <ul className='flex space-x-6'>
              <li>
                <Link to='/dashboard' className='hover:bg-[#F06D99] px-3 py-2 rounded transition-colors' >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/wardrobe' className='hover:bg-[#F06D99] px-3 py-2 rounded transition-colors' >
                  My StyleSync
                </Link>
              </li>
              <li>
                <Link to='/outfits' className='hover:bg-[#F06D99] px-3 py-2 rounded transition-colors' >
                  Outfit Builder
                </Link>
              </li>
            </ul>
          </div>
          <Link to='/sign-in' >
            <button className='rounded-[3px] bg-[#F06D99] manrope h-[57px] w-[140px] ' >Sign In</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
