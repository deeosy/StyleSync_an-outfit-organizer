import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroImage1 from '../images/Hero-image-1.png'

const clothingItems = [
    { id: 1, image: heroImage1 },
    { id: 1, image: heroImage1 },
    { id: 1, image: heroImage1 },
    { id: 1, image: heroImage1 },
    { id: 1, image: heroImage1 },
  ];
  

export default function SliderHeroSection() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      };

  return (
    <div className='px-10  sm:h-[400px] sm:w-[300px] md:w-[400px] ' >
      <Slider {...settings}>
        {clothingItems.map((item) => (
          <div key={item.id} className='sm:h-[400px]' >
            <img
              src={item.image}
              alt={`Outfit ${item.id}`}
            //   style={{ width: "100%",  }}
              className=' sm:h-[400px] sm:w-[300px] md:w-[400px] sm:object-contain '
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}
