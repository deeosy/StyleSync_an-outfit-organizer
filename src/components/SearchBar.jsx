import React from 'react'
import mGlass from '../icons/Search-glass-icon.png'
import enter from '../icons/searchBar-enter-icon.svg'
import { Tooltip } from '@mui/material'

export default function SearchBar() {
  return (
    <div className='bg-gray-200 flex w-full  py-2 px-4 sm:py-3 sm:px-6 border border-gray-200 rounded-sm '>
        <div className="flex w-full">
          <img src={mGlass} alt="search bar" className='h-[20px] mr-6 ' />
          <input type="text" placeholder='Search' className='w-full outline-none ' />
        </div>
        <div className="">
          <Tooltip title="Search" placement="left">
           <img src={enter} alt="" className='h-6 cursor-pointer'  />
          </Tooltip>
        </div>
    </div>
  )
}
