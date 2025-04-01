import React from 'react'


export default function SmartFeaturesCard({title, icon, description, delay}) {
  return (
    <>
        <div data-aos="flip-down" data-aos-delay={delay} className="flex flex-col rounded-[5px] w-full px-4 pt-5 pb-8 bg-[#F5F5F5] hover:shadow-md    ">
          <img src={icon} alt="" className='h-[32px] w-[32px]  ' />
          <p className='text-[20px] text-left font-bold mb-[5px]'>{title}</p>
          <p className="text-left mb-[5px]">{description}</p>
        </div>
    </>
  )
}
