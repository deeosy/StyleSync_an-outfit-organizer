// pages/Home.jsx

import React from 'react'
import nextArrow from '../icons/right-arrow.png'
import SliderHeroSection from '../components/SliderHeroSection'
import wardrobe from '../icons/wardrobe-outline.png'
import brain from '../icons/brain-outline.png'
import camera from '../icons/camera-outline.png'
import SmartFeaturesCard from '../components/SmartFeaturesCard'
import { Link } from 'react-router-dom'


export default function Home() {
  return (
    <div className="text-[#212529] manrope ">
        <div className='w-full bg-[#E5E5E5]  ' >
            <div className=" py-[80px] flex flex-col md:mx-auto max-w-[1300px] px-10 sm:flex-row sm:justify-between sm:items-center sm:gap-[100px] ">
                <div className="w-full ">
                    <h1 className='uppercase font-bold text-[20px] md:text-[28px] xl:text-[34px] ' >YOUR SMART DIGITAL WARDROBE ASSISTANT</h1>
                    <p className='text-[14px] py-[22px] md:text-[20px] xl:text-[24px]' >Organise your clothing collection, get AI powered outfit recommendations and revolutionize your style game</p>
                    <Link to='/authenticaion' >
                        <button className='bg-white py-2 px-5 rounded-[5px] flex gap-3 items-center md:text-[20px] hover:cursor-pointer' >
                            Get Started 
                            <img src={nextArrow} alt="next-page icon" className='h-[14px] pt-[2px] ' />
                        </button>
                    </Link>
                </div>
                <div className="">
                    <SliderHeroSection />
                </div>
            </div>
        </div>
        <div className="bg-white w-full py-[50px] pb-[70px] px-10 lg:px-20 ">
            <h2 className='font-bold text-[18px] md:text-[22px] xl:text-[30px] text-center ' >Smart Features for your wardrobe</h2>
            <p className='text-[14px] py-[20px] lg:py-[40px] md:text-[20px] xl:text-[24px] text-center'>Experience the future of wardrobe management with our innovative features</p>
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-8 lg:py-[50px] lg:px-10 lg:mx-auto max-w-[1300px] ">
                <div className="flex flex-col gap-4 sm:flex-row ">
                    <SmartFeaturesCard icon={wardrobe} title='Wardrobe Organization' descprition='Categorize and manage your wardrobe efficiently' />
                    <SmartFeaturesCard icon={brain} title='AI Styling' descprition='Get personalized outfit recommendations powered by AI' />

                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <SmartFeaturesCard icon={camera} title='Visual Catalog' descprition='Keep a visual record of all your clothing items' />
                    <SmartFeaturesCard icon={wardrobe} title='Wardrobe Organization' descprition='Categorize and manage your wardrobe efficiently' />

                </div>

            </div>
        </div>

    </div>
  )
}
