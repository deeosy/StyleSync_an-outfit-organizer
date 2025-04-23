import React from 'react'
import lockFavoriteIcon from '../icons/favorite-locked.svg'
import unlockFavoriteIcon from '../icons/favorite-unlocked.svg'
import useWardrobeStore from '../store/wardrobeStore'
import useAuthenticationStore from '../store/userStore'
import { Tooltip } from '@mui/material'

export default function FavoriteIconCategory() {
  const { showFavoritesOnly, toggleFavoritesFilter } = useWardrobeStore()
  const { user } = useAuthenticationStore()

  return (
    <div onClick={toggleFavoritesFilter} 
    className={`py-1 px-3 hover:cursor-pointer 
      ${showFavoritesOnly ? user.gender === 'male' ? 'bg-blue-200' : 'bg-pink-400' : 'bg-gray-200'} border border-gray-200  rounded-sm `}
    >
      <Tooltip title={showFavoritesOnly ? 'Lock Favorite' : 'Unlock Favorite'} placement="left">
        <img src={ showFavoritesOnly ? unlockFavoriteIcon: lockFavoriteIcon } alt="favorite icon" className='h-10 ' />
      </Tooltip>
    </div>
  )
}
