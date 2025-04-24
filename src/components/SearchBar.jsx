import React, { useState } from 'react'
import mGlass from '../icons/Search-glass-icon.png'
import enterIcon from '../icons/searchBar-enter-icon.svg'
import { Tooltip } from '@mui/material'
import useWardrobeStore from '../store/wardrobeStore'
import delBtn from '../icons/delete-btn-icon.svg'

export default function SearchBar() {
  const [searchTerm, setSearchTerm ] = useState('')
  const { setSearchQuery, searchQuery } = useWardrobeStore()
  
  const handleInputChange = (e) => {  // handle input change
    setSearchTerm(e.target.value);
    setSearchTerm(currentValue);

    if(!currentValue){
      setSearchQuery('')   // Automatically clear search in store when input is empty
    }
  }

  const handleSearch = () => {  // handle search submission
    setSearchQuery(searchTerm)
  }

  const handleKeyPress = (e) => {  // handle search after pressing 'Enter' Key
    if(e.key === 'Enter'){
      handleSearch();
    }
  }

  const clearSearch = () => {  // handle clear search
    setSearchTerm('');
    setSearchQuery('');
  }

  return (
    <div className='bg-gray-200 flex w-full  py-2 px-4 sm:py-3 sm:px-6 border border-gray-200 rounded-sm '>
        <div className="flex w-full">
          <img src={mGlass} alt="search bar" className='h-[20px] mr-6 ' />
          <input value={searchTerm} onChange={handleInputChange} onKeyDown={handleKeyPress} type="text" placeholder='Search' className='w-full outline-none ' />
          {searchTerm && (
            <button onClick={clearSearch} className='mr-6 cursor-pointer text-gray-500 hover:text-gray-700' >
              <img src={delBtn} alt="Clear input" className='h-[20px]' />
            </button>
          )}
        </div>

        <div className="">
          <Tooltip title="Search" placement="left">
           <img onClick={handleSearch} src={enterIcon} alt="search button" className='h-6 cursor-pointer'  />
          </Tooltip>
        </div>
    </div>
  )
}
