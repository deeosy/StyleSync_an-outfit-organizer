//pages/Home.jsx
import React, { useEffect } from "react";
import nextArrow from "../icons/right-arrow.png";
import SliderHeroSection from "../components/SliderHeroSection";
import wardrobe from "../icons/wardrobe-outline.png";
import brain from "../icons/brain-outline.png";
import camera from "../icons/camera-outline.png";
import outfit from "../icons/female-dress.png"
import SmartFeaturesCard from "../components/SmartFeaturesCard";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import HowSSyncWorks from "../components/HowSSyncWorks";
import FAQSection from "../components/FAQSection";
import TestimonialSection from "../components/TestimonialSection";
import SubscribtionSection from "../components/SubscribtionSection";
import AddClothesCard from "../components/AddClothesCard";
import CardCover from "../images/Card-cover.jpg";

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
              icon={outfit}
              title="Create Outfits"
              description="Create your own outfits . with clothing you own or yet to own"
            />
          </div>
        </div>
      </div>
      {/* How to use the app section */}
      <>
        <HowSSyncWorks />
      </>
      {/* Testimonials Section component*/}
      <>
        <TestimonialSection />
      </>
      {/* FAQ Section placed in a component */}
      <>
        <FAQSection />
      </>
      {/* Newsletter Subscription placed in a component*/}
      <SubscribtionSection />

     {/* Tutorial Section */}
<div className="bg-white w-full py-[60px] px-10 lg:px-20">
  <h2 className="font-bold text-[18px] md:text-[22px] xl:text-[30px] text-center">
    Learn How to Use Style Sync
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1300px] mx-auto py-8">
    {/* Tutorial card 1 */}
    <div className="bg-[#EADCF8] p-6 w-full flex flex-col justify-end h-[300px] relative">
      <h3 className="font-bold text-[18px] text-left z-10">
        How To Add Clothes
      </h3>
      <img
        src={CardCover}
        alt="How to add clothes"
        className="w-[150px] h-auto absolute bottom-4 right-4"
      />
    </div>

    {/* Tutorial card 2 with thick blue border */}
    <div className="bg-[#B3D4FC] p-6 w-full flex flex-col justify-end h-[300px] relative">
  <h3 className="font-bold text-[18px] text-left z-10">
    Using Our AI Feature
  </h3>
  <img
    src={CardCover}
    alt="Using AI Feature"
    className="w-[150px] h-auto absolute bottom-4 right-4"
  />
</div>


    {/* Tutorial card 3 */}
    <div className="bg-[#D5F5C7] p-6 w-full flex flex-col justify-end h-[300px] relative">
      <h3 className="font-bold text-[18px] text-left z-10">
        How To Create an <br />Outfit
      </h3>
      <img
        src={CardCover}
        alt="How to create an outfit"
        className="w-[150px] h-auto absolute bottom-4 right-4"
      />
    </div>
  </div>
</div>

    </div>
  );
}
