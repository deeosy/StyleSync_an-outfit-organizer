import React from 'react'
import InputField from '../components/InputField'
import PasswordInputField from '../Components/PasswordInputField'
import SignUpOptions from '../components/SignUpOptions'
import userLogo from '../icons/user.png'
import mailLogo from '../icons/mail.png'
import google from '../icons/google.png'
import facebook from '../icons/facebook.png'
import instagram from '../icons/instagram.png'
import useAuthencationStore from '../store/userStore'

export default function SignUpDetails() {
    const {user, updateUser, resetUser} = useAuthencationStore() // get zustand user store
    const handleChange = (e) => {   // function to change state of input fields
      const { name, value} =  e.target  // destructure e.target to get the name and value properties
      updateUser(name,value)  // updat the zustand state with the name and value properties
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        console.log(user);
        resetUser();
    }

    const isPasswordValid = user.password.length >= 8;  // red password field if password is below 8 characters

  return (
    <form onSubmit={handleSubmit} className='flex flex-col mx-4 sm:mx-10 gap-[16px] text-gray-400' >
        <InputField icon={userLogo} name='username' placeholder='Username' handleChange={handleChange}  />
        <InputField icon={mailLogo} name='email' placeholder='Email' handleChange={handleChange} />
        <PasswordInputField name='password' userPassword={user.password} passwordLength={user.password.length} handleChange={handleChange} />
        <button 
            type='submit'
            className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
            isPasswordValid ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'}`} 
            disabled={!isPasswordValid} 
        >
            Submit
        </button>
        <p className=' text-center text-sm md:text-[20px] text-[#212529]'>or sign up with:</p>	
        <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px] ">
            <SignUpOptions icon={google} />
            <SignUpOptions icon={facebook} />
            <SignUpOptions icon={instagram} />
        </div> 
    </form>
  )
}
