import React, { useState } from 'react';
import mGlass from '../icons/Search-glass-icon.png';
import enterIcon from '../icons/searchBar-enter-icon.svg';
import { Tooltip } from '@mui/material';
import useWardrobeStore from '../store/wardrobeStore';
import delBtn from '../icons/delete-btn-icon.svg';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { setSearchQuery } = useWardrobeStore();

  const handleInputChange = (e) => {
    const currentValue = e.target.value;
    setSearchTerm(currentValue);
    // Update the search query in the store on every input change
    setSearchQuery(currentValue);
  };

  // This function might still be useful if you want an explicit search action elsewhere,
  // but it's not strictly necessary for live filtering.
  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  // This is also less critical for live filtering but can be kept for accessibility
  // or user preference.
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Optionally, you could ensure the latest value is set, though handleInputChange should cover it.
      // setSearchQuery(searchTerm);
      // You might want to prevent form submission if this input is inside a form
      // e.preventDefault();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  return (
    <div className='bg-gray-200 flex w-full py-2 px-4 sm:py-3 sm:px-6 border border-gray-200 rounded-sm '>
      <div className="flex w-full items-center"> {/* Added items-center for vertical alignment */}
        <img src={mGlass} alt="search icon" className='h-[20px] mr-4' /> {/* Adjusted margin */}
        <input
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder='Search wardrobe...' // More specific placeholder
          className='w-full outline-none bg-transparent text-gray-700 placeholder-gray-500' // Added bg-transparent and text colors
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className='ml-4 cursor-pointer text-gray-500 hover:text-gray-700' // Added margin-left
            aria-label="Clear search" // Added aria-label for accessibility
          >
            <img src={delBtn} alt="Clear input" className='h-[20px]' />
          </button>
        )}
      </div>

      {/* Keep the explicit search button if desired, though filtering is now live */}
      <div className="ml-4 flex items-center"> {/* Added margin-left and items-center */}
        <Tooltip title="Search" placement="left">
          {/* The onClick here is now less critical but can remain */}
          <img
            onClick={handleSearch}
            src={enterIcon}
            alt="search button"
            className='h-6 cursor-pointer'
          />
        </Tooltip>
      </div>
    </div>
  );
}