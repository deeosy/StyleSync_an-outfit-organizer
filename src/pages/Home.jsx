//pages/Home.jsx
import React, { useEffect } from "react";
import nextArrow from "../icons/right-arrow.png";
import SliderHeroSection from "../components/SliderHeroSection";
import wardrobe from "../icons/wardrobe-outline.png";
import brain from "../icons/brain-outline.png";
import camera from "../icons/camera-outline.png";
import SmartFeaturesCard from "../components/SmartFeaturesCard";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import HowSSyncWorks from "../components/HowSSyncWorks";

export default function Home() {
  useEffect(() => {
    // Animation for Smart Feature Cards
    Aos.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 200,
      disable: "mobile",
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className="text-[#212529] manrope ">
      <div className="w-full bg-[#E5E5E5]  ">
        <div className=" py-[80px] flex flex-col md:mx-auto max-w-[1300px] px-10 sm:flex-row sm:justify-between sm:items-center sm:gap-[100px] ">
          <div className="w-full ">
            <h1 className="uppercase font-bold text-[20px] md:text-[28px] xl:text-[34px] ">
              YOUR SMART DIGITAL WARDROBE ASSISTANT
            </h1>
            <p className="text-[14px] py-[22px] md:text-[20px] xl:text-[24px]">
              Organise your clothing collection, get AI powered outfit
              recommendations and revolutionize your style game
            </p>
            <button className="bg-white rounded-[5px] md:text-[20px] hover:cursor-pointer">
              <Link
                to="/authentication"
                className="flex gap-3 items-center py-2 px-5"
              >
                Get Started
                <img
                  src={nextArrow}
                  alt="next-page icon"
                  className="h-[14px] pt-[2px] "
                />
              </Link>
            </button>
          </div>
          <div className="">
            <SliderHeroSection />
          </div>
        </div>
      </div>
      <div className="bg-white w-full py-[50px] pb-[70px] px-10 lg:px-20 ">
        <h2 className="font-bold text-[18px] md:text-[22px] xl:text-[30px] text-center ">
          Smart Features for your wardrobe
        </h2>
        <p className="text-[14px] py-[20px] lg:py-[40px] md:text-[20px] xl:text-[24px] text-center">
          Experience the future of wardrobe management with our innovative
          features
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-8 lg:py-[50px] lg:px-10 lg:mx-auto max-w-[1300px] ">
          <div className="flex flex-col gap-4 sm:flex-row lg:gap-8">
            <SmartFeaturesCard
              delay={0}
              icon={wardrobe}
              title="Wardrobe Organization"
              description="Categorize and manage your wardrobe efficiently"
            />
            <SmartFeaturesCard
              delay={200}
              icon={brain}
              title="AI Styling"
              description="Get personalized outfit recommendations powered by AI"
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:gap-8">
            <SmartFeaturesCard
              delay={400}
              icon={camera}
              title="Visual Catalog"
              description="Keep a visual record of all your clothing items"
            />
            <SmartFeaturesCard
              delay={600}
              icon={wardrobe}
              title="Wardrobe Organization"
              description="Categorize and manage your wardrobe efficiently"
            />
          </div>
        </div>
      </div>

      <>
        <HowSSyncWorks />
      </>

      {/* Testimonials Section */}
      <div className="bg-white w-full py-[60px] px-10 lg:px-20">
        <h2 className="font-bold text-[18px] md:text-[22px] xl:text-[30px] text-center">
          Join our club and use Style Sync to manage your wardrobe
        </h2>
        <p className="text-[14px] py-[20px] lg:py-[30px] md:text-[20px] xl:text-[22px] text-center">
          Hear from some of our users using Style Sync to manage their wardrobe
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1300px] mx-auto py-8">
          {/* Testimonial cards with hover effect */}
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="border border-gray-200 hover:border-blue-500 rounded-lg p-4 flex flex-col transition-all hover:shadow-md"
          >
            <div className="mb-4">
              <img
                src="src/images/testimonial1.jpg" // Replace with actual image path
                alt="User testimonial"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <h3 className="font-bold text-lg hover:text-blue-500 transition-colors">
              Alicza
            </h3>
            <div className="flex mb-2">
              <span>★★★★★</span>
            </div>
            <p className="text-[14px] flex-grow">
              Style Sync is such an easy web-app to use. It has helped me see
              the good clothing that I own out of the pile in my real wardrobe.
              And I am able to style my outfits for the day!
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="border border-gray-200 hover:border-blue-500 rounded-lg p-4 flex flex-col transition-all hover:shadow-md"
          >
            <div className="mb-4">
              <img
                src="src/images/testimonial2.jpg" // Replace with actual image path
                alt="User testimonial"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <h3 className="font-bold text-lg hover:text-blue-500 transition-colors">
              Walter
            </h3>
            <div className="flex mb-2">
              <span>★★★★★</span>
            </div>
            <p className="text-[14px] flex-grow">
              Style Sync is such an easy web-app to use. It has helped me see
              the good clothing that I own out of the pile in my real wardrobe.
              And I am able to style my outfits for the day!
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="border border-gray-200 hover:border-blue-500 rounded-lg p-4 flex flex-col transition-all hover:shadow-md"
          >
            <div className="mb-4">
              <img
                src="src/images/testimonial3.jpg" // Replace with actual image path
                alt="User testimonial"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <h3 className="font-bold text-lg hover:text-blue-500 transition-colors">
              Alliana
            </h3>
            <div className="flex mb-2">
              <span>★★★★★</span>
            </div>
            <p className="text-[14px] flex-grow">
              Style Sync is such an easy web-app to use. It has helped me see
              the good clothing that I own out of the pile in my real wardrobe.
              And I am able to style my outfits for the day!
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#F8F9FA] w-full py-[60px] px-10 lg:px-20">
        <h2 className="font-bold text-[18px] md:text-[22px] xl:text-[30px] text-center">
          Frequently Asked Questions
        </h2>

        <div className="max-w-[900px] mx-auto py-8">
          <div
            className="mb-6 p-4 border border-transparent hover:border-blue-500 rounded-lg hover:bg-white transition-all"
          >
            <h3 className="font-bold text-lg mb-2 hover:text-blue-500 transition-colors">
              How do I add my clothes?
            </h3>
            <p className="text-[14px] md:text-[16px]">
              You can either take photos of your clothing items or search our
              extensive database to find similar items. Our intelligent system
              makes categorizing and organizing simple.
            </p>
          </div>

          <div
            className="mb-6 p-4 border border-transparent hover:border-blue-500 rounded-lg hover:bg-white transition-all"
          >
            <h3 className="font-bold text-lg mb-2 hover:text-blue-500 transition-colors">
              Is the AI styling feature really personalized?
            </h3>
            <p className="text-[14px] md:text-[16px]">
              Yes! Our AI analyzes your preferences, clothing collection, and
              follows style principles to create outfits specifically for you.
              The more you use Style Sync, the better the recommendations
              become.
            </p>
          </div>

          <div
            className="mb-6 p-4 border border-transparent hover:border-blue-500 rounded-lg hover:bg-white transition-all"
          >
            <h3 className="font-bold text-lg mb-2 hover:text-blue-500 transition-colors">
              Can I use Style Sync on my phone?
            </h3>
            <p className="text-[14px] md:text-[16px]">
              Absolutely! Style Sync is fully responsive and works great on
              mobile devices, tablets, and desktops.
            </p>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="text-[#212529] font-semibold hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
            >
              See all FAQs
              <img src={nextArrow} alt="arrow" className="h-[12px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-[#E5E5E5] w-full py-[60px] px-10 lg:px-20">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-bold text-[18px] md:text-[22px] xl:text-[30px]">
            Stay Updated with Style Tips
          </h2>
          <p className="text-[14px] py-[20px] md:text-[16px]">
            Subscribe to our newsletter for style inspiration, updates, and
            exclusive content
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 md:min-w-[300px]"
            />
            <button className="bg-[#212529] text-white px-6 py-3 rounded-md hover:bg-blue-500 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Tutorial Section */}
      <div className="bg-white w-full py-[60px] px-10 lg:px-20">
        <h2 className="font-bold text-[18px] md:text-[22px] xl:text-[30px] text-center">
          Learn How to Use Style Sync
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1300px] mx-auto py-8">
          {/* Tutorial cards with hover effect */}
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="bg-[#F0E6FF] rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-all hover:transform hover:scale-105"
          >
            <h3 className="font-bold text-lg mb-4 hover:text-blue-500 transition-colors">
              HOW TO ADD CLOTHES
            </h3>
            <img
              src="/path-to-tutorial-image.jpg"
              alt="How to add clothes"
              className="mb-4 w-full h-auto"
            />
            <Link
              to="/tutorial/add-clothes"
              className="mt-4 flex items-center gap-2 text-[#212529] font-semibold hover:text-blue-500 transition-colors"
            >
              Learn more
              <img src={nextArrow} alt="arrow" className="h-[12px]" />
            </Link>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="bg-[#F0E6FF] rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-all hover:transform hover:scale-105"
          >
            <h3 className="font-bold text-lg mb-4 hover:text-blue-500 transition-colors">
              HOW TO ADD CLOTHES
            </h3>
            <img
              src="/path-to-tutorial-image.jpg"
              alt="How to add clothes"
              className="mb-4 w-full h-auto"
            />
            <Link
              to="/tutorial/add-clothes"
              className="mt-4 flex items-center gap-2 text-[#212529] font-semibold hover:text-blue-500 transition-colors"
            >
              Learn more
              <img src={nextArrow} alt="arrow" className="h-[12px]" />
            </Link>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="bg-[#F0E6FF] rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-all hover:transform hover:scale-105"
          >
            <h3 className="font-bold text-lg mb-4 hover:text-blue-500 transition-colors">
              HOW TO ADD CLOTHES
            </h3>
            <img
              src="/path-to-tutorial-image.jpg"
              alt="How to add clothes"
              className="mb-4 w-full h-auto"
            />
            <Link
              to="/tutorial/add-clothes"
              className="mt-4 flex items-center gap-2 text-[#212529] font-semibold hover:text-blue-500 transition-colors"
            >
              Learn more
              <img src={nextArrow} alt="arrow" className="h-[12px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
