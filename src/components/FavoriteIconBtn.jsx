import React from 'react'
import favBtn from '../icons/heart-svgrepo-com.svg'
import useWardrobeStore from '../store/wardrobeStore'
import useAuthenticationStore from '../store/userStore'
import { Tooltip } from '@mui/material'

export default function FavoriteIconBtn({id, isFavorite}) {
    const {toggleFavorite} = useWardrobeStore()
    const { user } = useAuthenticationStore()

    const handleToggleFavorite = (e) => {
      e.stopPropagation();  // prevent event bubbling
      if(user?.uid){
        toggleFavorite(id, user.uid);
      } else{
        console.error('User not authenticated, cannot update favorites')
      }
    };

  return (
    <div onClick={handleToggleFavorite} className={`p-1 cursor-pointer rounded-full ${isFavorite ? user.gender === 'male' ? 'bg-blue-200' : 'bg-pink-400'  : 'bg-gray-200'} `}>
        <Tooltip title="Add to favorite" placement="right">
            <img src={favBtn} alt="Favorite" className={`h-4 w-4 ${isFavorite ? 'filter-none' : 'opacity-80'} `} />
        </Tooltip>
    </div>
  )
}
