// Import React library, useState, and useEffect hooks for managing component state and side effects
import React, { useState, useEffect, useRef } from 'react';

// Import images for the Splide slider
import howItWorksImage1 from '../images/image2.png';
import howItWorksImage2 from '../images/HowItWorksImage2.png';

// Import Splide components for creating a carousel
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

// Import Splide CSS for default styling
import '@splidejs/react-splide/css';

// Define custom CSS for the progress bar styling
const customStyles = `
  /* Style the progress bar container and bar */
  .splide__progress {
    background: #f9a8d4; /* Equivalent to bg-pink-300 */
    border-top-right-radius: 9999px; 
    border-top-left-radius: 9999px;
    height: 0.5rem; /* Equivalent to h-2 */
    margin-top: 1rem; /* Equivalent to mt-4 */
  }
  .splide__progress__bar {
    background: #ec4899; /* Equivalent to bg-pink-400 */
    height: 0.5rem; /* Equivalent to h-2 */
    border-top-right-radius: 9999px;
    border-top-left-radius: 9999px;
    transition: width 0.05s linear; /* Smooth transition for progress */
  }
`;

// Define the HowSSyncWorks component
export default function HowSSyncWorks() {
  // State to track the currently active slide index (0-based)
  const [activeSlide, setActiveSlide] = useState(0);

  // State to track viewport visibility
  const [isInViewport, setIsInViewport] = useState(false);

  // Ref to the slider container for IntersectionObserver
  const sliderContainerRef = useRef(null);
  
  // Ref to the Splide instance for direct control
  const splideRef = useRef(null);

  // Constant for interval duration (matches Splide interval)
  const intervalDuration = 3000; // 3 seconds

  // Constant for the active step background color
  const activeBGColor = 'bg-[#D5EBF9]';

  // Effect to handle viewport visibility using IntersectionObserver
  useEffect(() => {
    // Create an IntersectionObserver to monitor the slider's visibility
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isVisible = entry.isIntersecting;
        setIsInViewport(isVisible);
        
        // Directly control the Splide instance based on visibility
        if (splideRef.current && splideRef.current.splide && splideRef.current.splide.Components.Autoplay) {
          if (isVisible) {
            splideRef.current.splide.Components.Autoplay.play();
          } else {
            splideRef.current.splide.Components.Autoplay.pause();
          }
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the slider is visible
    );

    // Observe the slider container
    if (sliderContainerRef.current) {
      observer.observe(sliderContainerRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (sliderContainerRef.current) {
        observer.unobserve(sliderContainerRef.current);
      }
    };
  }, []); // Empty dependency array to run only on mount and unmount

  // Handle slide change to update the active slide index
  const handleSlideChange = (splide) => {
    setActiveSlide(splide.index);
  };

  return (
    <>
      {/* Inject custom styles into the document */}
      <style>{customStyles}</style>

      {/* Main container for the "How Style Sync Works" section */}
      <div className="bg-[#f5f5f5] w-full py-[60px] px-10 lg:px-20">
        {/* Section title */}
        <h2 className="font-bold text-[18px] md:text-[22px] xl:text-[30px] text-center">
          How Style Sync Works
        </h2>

        {/* Section subtitle */}
        <p className="text-[14px] py-[20px] lg:py-[30px] md:text-[20px] xl:text-[24px] text-center">
          Three simple steps to revolutionize your wardrobe experience
        </p>

        {/* Main content layout: flex column on small screens, row on large screens */}
        <div className="flex flex-col lg:flex-row max-w-[1300px] mx-auto gap-8 py-8 items-center">
          {/* Left Side: Image Slider */}
          <div className="w-full px-3 pt-4 lg:w-1/2" ref={sliderContainerRef}>
            {/* Splide slider for displaying images */}
            <Splide
              ref={splideRef}
              hasTrack={false} // Use SplideTrack for custom wrapper
              options={{
                type: 'loop', // Loop the slides
                perPage: 1, // Show one slide at a time
                autoplay: true, // Always enable autoplay (will be controlled programmatically)
                interval: intervalDuration, // Autoplay interval in milliseconds (3 seconds)
                pauseOnHover: true, // Pause autoplay on hover
                arrows: false, // Hide navigation arrows
                pagination: false, // Hide pagination dots
                resetProgress: false, // Keep elapsed time when interrupted
              }}
              onMounted={(splide) => {
                // Initialize based on current visibility
                if (!isInViewport && splide.Components.Autoplay) {
                  splide.Components.Autoplay.pause();
                }
              }}
              onMoved={handleSlideChange} // Update active slide index on slide change
              aria-label="How Style Sync Works Images"
            >
              {/* Custom wrapper for Splide content */}
              <div className="custom-wrapper ">
                {/* Splide progress bar */}
                <div className="splide__progress">
                  <div
                    className="splide__progress__bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label="Time remaining until next slide"
                  />
                </div>

                {/* SplideTrack to wrap the slides */}
                <SplideTrack>
                  {/* Slide 1: Corresponds to Step 1 */}
                  <SplideSlide>
                    <img
                      src={howItWorksImage1}
                      alt="Step 1: Curate your closet easily"
                      className="rounded-lg shadow-md w-full h-auto"
                    />
                  </SplideSlide>
                  {/* Slide 2: Corresponds to Step 2 */}
                  <SplideSlide>
                    <img
                      src={howItWorksImage2}
                      alt="Step 2: Organize and visualize your wardrobe"
                      className="rounded-lg shadow-md w-full h-auto"
                    />
                  </SplideSlide>
                  {/* Slide 3: Corresponds to Step 3 (using howItWorksImage1 as a placeholder) */}
                  <SplideSlide>
                    <img
                      src={howItWorksImage1} // Replace with a third image if available
                      alt="Step 3: AI Styling"
                      className="rounded-lg shadow-md w-full h-auto"
                    />
                  </SplideSlide>
                </SplideTrack>
              </div>
            </Splide>
          </div>

          {/* Right Side: Steps */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Step 1: Curate Your Closet */}
            <div
              className={`p-6 transition-all ${
                activeSlide === 0 ? `${activeBGColor} rounded-lg shadow-md` : ''
              }`}
              aria-current={activeSlide === 0 ? 'step' : undefined}
            >
              <div className="flex items-center mb-4">
                {/* Step number indicator with conditional background */}
                <div
                  className={`rounded-full w-10 h-10 flex items-center justify-center mr-4 ${
                    activeSlide === 0 ? 'bg-pink-400' : 'bg-pink-300'
                  }`}
                >
                  <span className="font-bold text-lg">1</span>
                </div>
                <h3 className="font-bold text-lg transition-colors">Curate your closet, easily</h3>
              </div>
              <p className="text-[14px] md:text-[16px]">
                Add to your wardrobe by taking pictures of your clothes with/without the background. Or search our database and add items similar to the clothing in your closet.
              </p>
            </div>

            {/* Step 2: Organize and Visualize */}
            <div
              className={`p-6 transition-all ${
                activeSlide === 1 ? `${activeBGColor} rounded-lg shadow-md` : ''
              }`}
              aria-current={activeSlide === 1 ? 'step' : undefined}
            >
              <div className="flex items-center mb-4">
                {/* Step number indicator with conditional background */}
                <div
                  className={`rounded-full w-10 h-10 flex items-center justify-center mr-4 ${
                    activeSlide === 1 ? 'bg-pink-400' : 'bg-pink-300'
                  }`}
                >
                  <span className="font-bold text-lg">2</span>
                </div>
                <h3 className="font-bold text-lg transition-colors">Organize and visualize</h3>
              </div>
              <p className="text-[14px] md:text-[16px]">
                See everything pictured at your finger tips. Search, filter and view your wardrobe, however you like, whenever you like.
              </p>
            </div>

            {/* Step 3: AI Styling */}
            <div
              className={`p-6 transition-all ${
                activeSlide === 2 ? `${activeBGColor} rounded-lg shadow-md` : ''
              }`}
              aria-current={activeSlide === 2 ? 'step' : undefined}
            >
              <div className="flex items-center mb-4">
                {/* Step number indicator with conditional background */}
                <div
                  className={`rounded-full w-10 h-10 flex items-center justify-center mr-4 ${
                    activeSlide === 2 ? 'bg-pink-400' : 'bg-pink-300'
                  }`}
                >
                  <span className="font-bold text-lg">3</span>
                </div>
                <h3 className="font-bold text-lg transition-colors">AI Styling</h3>
              </div>
              <p className="text-[14px] md:text-[16px]">
                Get personalized outfit recommendations powered by AI for any occasion, season, or mood.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}