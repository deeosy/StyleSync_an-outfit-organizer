import React from 'react'
import SignUpOptions from '../components/SignUpOptions'
import CountryInputField from '../components/CountryInputField'
import google from '../icons/google.png'
import facebook from '../icons/facebook.png'
import instagram from '../icons/instagram.png'
import useAuthenticationStore from '../store/userStore'
import { Link, Outlet, useNavigate } from 'react-router-dom'


export default function SignUpLanguage() {
    const { user = { country: '', username: '', email: '', password: '', date: '', gender: '' }, updateUser } = useAuthenticationStore();
    const navigate = useNavigate() 
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        updateUser(name, value); // Update Zustand state        
    }
    
    const handleSubmit = (e) => { // handle submit
        e.preventDefault()
        if((user?.country ?? "").trim().length >= 2){navigate('/authentication/sign-up-details')} // Navigate after validation
    }
    
    const safeUser = user ?? { country: "", username: "", email: "", password: "", date: "", gender: "" };  
    const isCountryValid = (user?.country ?? "").trim().length >= 2  // if country is undefined default as an empty string

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-4 sm:mx-10 gap-[33px]">
        <div className="flex flex-col gap-[16px] ">
            {/* Country input field setup, passing it as a name so we can extract the value */}
            <CountryInputField name='country' value={safeUser.country} handleChange={handleChange}  />
            <p className='text-[12px] text-gray-500 ' >Select your country so we can tailor your experience . You can change the country & language in your profile settings anytime</p>
        </div>
        <div className="flex flex-col gap-[16px] ">
            <button 
                type='submit'
                className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
                    isCountryValid ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'}`} 
                    disabled={!isCountryValid} 
            >
                Sign up with email
            </button>
            <p className=' text-center text-sm  text-gray-500'>or sign up with:</p>	
            <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px] ">
                <SignUpOptions icon={google} />
                <SignUpOptions icon={facebook} />
                <SignUpOptions icon={instagram} />
            </div>
        </div>
        <Outlet />
    </form>
  )
}
