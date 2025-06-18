import React, { useState } from 'react';
import mGlass from '../icons/Search-glass-icon.png';
import enterIcon from '../icons/searchBar-enter-icon.svg';
import { Tooltip } from '@mui/material';
import useWardrobeStore from '../store/wardrobeStore';
import useThemeStore from '../store/themeStore';
import delBtn from '../icons/delete-btn-icon.svg';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { setSearchQuery } = useWardrobeStore();
  
  // Theme store integration
  const { getTheme } = useThemeStore();
  const theme = getTheme();

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
    <div className={`${theme.backgroundSecondary || theme.light} flex w-full py-2 px-4 sm:py-3 sm:px-6 border ${theme.border} rounded-sm transition-colors duration-200 ${theme.surfaceHover} shadow-sm`}>
      <div className="flex w-full items-center"> {/* Added items-center for vertical alignment */}
        <img 
          src={mGlass} 
          alt="search icon" 
          className={`h-[20px] mr-4 opacity-60 ${theme.isDark ? 'filter brightness-0 invert' : ''}`} 
        /> {/* Adjusted margin and added theme-aware filter */}
        <input
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder='Search wardrobe...' // More specific placeholder
          className={`w-full outline-none bg-transparent ${theme.textPrimary} placeholder:${theme.textMuted} focus:placeholder:${theme.textSecondary} transition-colors duration-200`} // Added theme colors
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className={`ml-4 cursor-pointer ${theme.textSecondary} ${theme.surfaceHover.replace('hover:', 'hover:text-')} hover:${theme.textPrimary.replace('text-', '')} transition-all duration-200 transform hover:scale-110 active:scale-95 p-1 rounded`} // Added theme colors and animations
            aria-label="Clear search" // Added aria-label for accessibility
          >
            <img 
              src={delBtn} 
              alt="Clear input" 
              className={`h-[20px] ${theme.isDark ? 'filter brightness-0 invert opacity-70' : 'opacity-70'}`} 
            />
          </button>
        )}
      </div>

      {/* Keep the explicit search button if desired, though filtering is now live */}
      <div className="ml-4 flex items-center"> {/* Added margin-left and items-center */}
        <Tooltip title="Search" placement="left">
          {/* The onClick here is now less critical but can remain */}
          <button
            onClick={handleSearch}
            className={`p-2 rounded transition-all duration-200 transform hover:scale-110 active:scale-95 ${theme.surfaceHover}`}
            aria-label="Execute search"
          >
            <img
              src={enterIcon}
              alt="search button"
              className={`h-6 cursor-pointer ${theme.isDark ? 'filter brightness-0 invert opacity-80' : 'opacity-80'}`}
            />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}