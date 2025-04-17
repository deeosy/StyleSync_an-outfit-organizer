import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide CSS for default styling
import heroImage1 from '../images/Landing-Page-Hero-Section-Images/HeroImage-1.png';
import heroImage2 from '../images/Landing-Page-Hero-Section-Images/HeroImage-2.png';
import heroImage3 from '../images/Landing-Page-Hero-Section-Images/HeroImage-3.png';
import heroImage4 from '../images/Landing-Page-Hero-Section-Images/HeroImage-4.png';
import heroImage5 from '../images/Landing-Page-Hero-Section-Images/HeroImage-5.png';

// Define the clothing items array with unique IDs
const clothingItems = [
  { id: 1, image: heroImage1 },
  { id: 2, image: heroImage2 },
  { id: 3, image: heroImage3 },
  { id: 4, image: heroImage4 },
  { id: 5, image: heroImage5 },
];

export default function SliderHeroSection() {
  // Splide options to match the previous react-slick behavior
  const options = {
    type: 'loop', // Enable looping (equivalent to infinite: true in react-slick)
    perPage: 1, // Show one slide at a time (equivalent to slidesToShow: 1)
    perMove: 1, // Move one slide at a time (equivalent to slidesToScroll: 1)
    speed: 700, // Transition speed in milliseconds (same as react-slick)
    autoplay: true, // Enable autoplay (equivalent to autoPlay: true in react-slick)
    interval: 8000, // Autoplay interval in milliseconds (default value, can be adjusted)
    arrows: false, // Hide navigation arrows (same as react-slick)
    pagination: true, // Show pagination dots (equivalent to dots: true in react-slick)
  };

  return (
    <div className="px-10 sm:max-h-[700px] sm:w-full  ">
      <Splide options={options} aria-label="Hero Section Clothing Items">
        {clothingItems.map((item) => (
          <SplideSlide key={item.id}>
            <div className="sm:max-h-[800px]  w-full  ">
              <img
                src={item.image}
                alt={`Outfit ${item.id}`}
                className="sm:max-h-[800px]  mx-auto object-contain"
              />              
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
  );
}