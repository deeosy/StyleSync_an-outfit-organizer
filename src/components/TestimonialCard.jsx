import React from 'react'

export default function TestimonialCard({name, image, stars, review}) {
    
  return (
    <div data-aos="fade-up" data-aos-delay="0"
     className="border border-gray-200 h-[560px] rounded-lg p-4 flex flex-col hover:shadow-md"
    >
      <div className="mb-4">
        <img src={image} alt="User testimonial" className="rounded-lg h-[390px] w-full object-cover"/>
      </div>
      <h3 className="font-bold text-lg ">{name}</h3>
      <span className='flex mb-2'>{stars}</span>
      <p className="text-[14px] flex-grow overflow-hidden line-clamp-3">{review}</p>
    </div>
  )
}