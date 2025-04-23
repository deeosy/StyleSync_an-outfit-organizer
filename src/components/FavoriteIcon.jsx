import React from 'react'
import favoriteIcon from '../icons/favorite-icon.png'

export default function FavoriteIcon() {
  return (
    <div  className=' px-3 py-2 sm:px-5 sm:py-3 hover:cursor-pointer bg-gray-200 border border-gray-200  rounded-sm '>
        <img src={favoriteIcon} alt="favorite icon" className='h-[18px] sm:h-[22px]' />
    </div>
  )
}
