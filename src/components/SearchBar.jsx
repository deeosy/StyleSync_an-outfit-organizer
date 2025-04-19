import React from 'react'
import MGlass from '../icons/Search-glass-icon.png'

export default function SearchBar() {
  return (
    <div className='bg-[#F5F5F5] flex w-full py-2 px-4 sm:py-3 sm:px-6 border border-gray-200 rounded-sm '>
        <img src={MGlass} alt="search bar" className='h-[20px] mr-6 ' />
        <input type="text" placeholder='Search' className='w-full outline-none ' />
    </div>
  )
}
