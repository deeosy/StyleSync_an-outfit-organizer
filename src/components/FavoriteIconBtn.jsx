import React from 'react'
import favBtn from '../icons/heart-svgrepo-com.svg'
import useWardrobeStore from '../store/wardrobeStore'
import useAuthenticationStore from '../store/userStore'
import useThemeStore from '../store/themeStore'
import { Tooltip } from '@mui/material'

export default function FavoriteIconBtn({id, isFavorite}) {
    const {toggleFavorite} = useWardrobeStore()
    const { user } = useAuthenticationStore()
    
    // Theme store integration
    const { getTheme } = useThemeStore()
    const theme = getTheme()

    const handleToggleFavorite = (e) => {
      e.stopPropagation();  // prevent event bubbling
      if(user?.uid){
        toggleFavorite(id, user.uid);
      } else{
        console.error('User not authenticated, cannot update favorites')
      }
    };

  return (
    <div 
      onClick={handleToggleFavorite} 
      className={`p-1 cursor-pointer rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md border ${theme.border}
        ${isFavorite 
          ? `${theme.primary} ${theme.primaryHover}` 
          : `${theme.backgroundSecondary || theme.light} ${theme.surfaceHover}`
        }`}
    >
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"} placement="right">
            <img 
              src={favBtn} 
              alt={isFavorite ? "Remove from favorites" : "Add to favorites"} 
              className={`h-6 w-4 transition-all duration-200 ${
                isFavorite 
                  ? 'filter brightness-0 invert opacity-100' // White heart when favorited
                  : theme.isDark 
                    ? 'filter brightness-0 invert opacity-60' // Visible in dark mode
                    : 'opacity-60' // Subtle in light mode
              } hover:opacity-100`} 
            />
        </Tooltip>
    </div>
  )
}