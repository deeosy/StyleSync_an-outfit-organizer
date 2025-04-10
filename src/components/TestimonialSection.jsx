import React from 'react'
import TestimonialCard from './TestimonialCard'
import { v4 as uuid } from 'uuid'

export default function TestimonialSection() {
  // i will later change the stars from hard coded to calculated
  const user = [  // in the future lets put this user array in a seperate JS file and collect the reviews from actual users from the backend
    {id:uuid(), userName:'Alicza', profileImage:'src/images/testimonial1.jpg', stars: '★★★★★', review: 'I used to forget what clothes I had — now I can create outfits on the go. Love it!' },
    {id:uuid(), userName:'Walter', profileImage:'src/images/testimonial2.jpg', stars: '★★★★★', review: 'Style Sync is such an easy web-app to use. It has helped me see the good clothing that I own out of the pile in my real wardrobe. And I am able to style my outfits for the day!' },
    {id:uuid(), userName:'Alliana', profileImage:'https://images.pexels.com/photos/3851309/pexels-photo-3851309.jpeg?auto=compress&cs=tinysrgb&w=600', stars: '★★★★★', review: 'This website made my wardrobe 100x more organized. Clients are impressed with how I plan outfits!' },
  ]

  return (
    <div className="bg-white w-full py-[60px] px-10 lg:px-20">
    <h2 className="font-bold text-[18px] md:text-[22px] xl:text-[30px] text-center">
      Join our club and use Style Sync to manage your wardrobe
    </h2>
    <p className="text-[14px] py-[20px] lg:py-[30px] md:text-[20px] xl:text-[22px] text-center">
      Hear from some of our users using Style Sync to manage their wardrobe
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1300px] mx-auto py-8">
      {/* Testimonial cards with hover effect */}
      {user.map((user) => 
          <TestimonialCard key={user.id} name={user.userName} image={user.profileImage} stars={user.stars} review={user.review}  />
      )}
    </div>
  </div>
  )
}

