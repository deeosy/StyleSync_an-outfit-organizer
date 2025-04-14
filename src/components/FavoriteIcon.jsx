import React from 'react'
import favoriteIcon from '../icons/favorite-icon.png'

export default function FavoriteIcon() {
  return (
    <div  className=' px-3 py-2 sm:px-5 sm:py-3 bg-[#F5F5F5] '>
        <img src={favoriteIcon} alt="favorite icon" className='h-[18px] sm:h-[22px]' />
    </div>
  )
}
