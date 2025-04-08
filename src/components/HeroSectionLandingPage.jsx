import React from 'react'
import { Link } from "react-router-dom";
import nextArrow from "../icons/right-arrow.png";
import SliderHeroSection from "../components/SliderHeroSection";

export default function HeroSectionLandingPage() {
  return (
		<div className=" py-[40px] md:h-[650px] flex flex-col md:mx-auto max-w-[1300px] px-10 sm:flex-row sm:justify-between sm:items-center sm:gap-[50px] ">
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
			{/* <div className=""> */}
				<SliderHeroSection />
			{/* </div> */}
		</div>
  )
}
