import React from 'react'
import lockFavoriteIcon from '../icons/favorite-locked.svg'
import unlockFavoriteIcon from '../icons/favorite-unlocked.svg'
import useWardrobeStore from '../store/wardrobeStore'
import useAuthenticationStore from '../store/userStore'
import useThemeStore from '../store/themeStore'
import { Tooltip } from '@mui/material'

export default function FavoriteIconCategory() {
  const { showFavoritesOnly, toggleFavoritesFilter } = useWardrobeStore()
  const { user } = useAuthenticationStore()
  
  // Theme store integration
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  return (
    <div 
      onClick={toggleFavoritesFilter} 
      className={`py-1 px-3 hover:cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md rounded-sm border ${theme.border}
        ${showFavoritesOnly 
          ? `${theme.primary} ${theme.primaryHover}` 
          : `${theme.backgroundSecondary || theme.light} ${theme.surfaceHover}`
        }`}
    >
      <Tooltip title={showFavoritesOnly ? 'Show All Items' : 'Show Favorites Only'} placement="left">
        <img 
          src={showFavoritesOnly ? unlockFavoriteIcon : lockFavoriteIcon} 
          alt={showFavoritesOnly ? 'showing favorites only' : 'showing all items'} 
          className={`h-10 transition-all duration-200 ${
            showFavoritesOnly 
              ? 'filter brightness-0 invert' // Make icon white when active
              : theme.isDark 
                ? 'filter brightness-0 invert opacity-80' // Make icon visible in dark mode
                : 'opacity-80' // Default opacity in light mode
          }`} 
        />
      </Tooltip>
    </div>
  )
}