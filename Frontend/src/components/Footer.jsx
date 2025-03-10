import React from 'react'
import ssLogo from '../icons/StyleSync-Logo.png'


export default function Footer({position}) {
  return (
    <div className={`bg-[#171717] text-white ${position} p-3 `} >
        <img src={ssLogo} alt='style-sync-icon' className='w-[60px] h-[60px] '/>
    </div>
  )
}
