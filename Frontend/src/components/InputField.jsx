import React from 'react'

export default function InputField({name,value, icon, handleChange, placeholder, focus}) {
  return (
    <div className={`flex gap-[12px] py-[12px] px-[16px] border border-gray-400 rounded-[5px] h-auto w-full ${focus}  `}>
			<img src={icon} alt="" className='w-[24px] h-[24px] '/>
			<input type="text" placeholder={placeholder} className='text-[14px] text-gray-900 font-medium outline-none placeholder:text-gray-400 ' onChange={handleChange} name={name} value={value} />
    </div>
  )
}