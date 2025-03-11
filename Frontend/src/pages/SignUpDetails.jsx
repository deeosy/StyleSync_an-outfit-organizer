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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from '../icons/calendar.svg'

export default function SignUpDetails() {
    const {user, updateUser, addUser} = useAuthencationStore() // get zustand user store
    const handleChange = (e) => {   // function to change state of input fields
      const { name, value} =  e.target  // destructure e.target to get the name and value properties
      updateUser(name,value)  // update the zustand state with the name and value properties
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        addUser();
        console.log(user);
    }

    const handleGender= (e) => {
      e.preventDefault()
      let { name, value} =  e.target  // destructure e.target to get the name and value properties
      value = e.target.innerHTML.toLowerCase()
      console.log(value);
      updateUser(name,value)
    //   console.log(user);      
      
    }

    const isPasswordValid = user.password.length >= 8;  // red password field if password is below 8 characters

  return (
    <form onSubmit={handleSubmit} className='flex flex-col mx-4 sm:mx-10 gap-[16px] text-gray-400' >
        <div className="flex gap-[20px] items-center">
            <button onClick={handleGender} name='gender' className='w-full py-[13px] rounded-[5px] font-medium border-[1px]   bg-white cursor-pointer  focus-within:bg-[#B1D2F1]' >Female</button>
            <button onClick={handleGender} name='gender' className='w-full py-[13px] rounded-[5px] font-medium border-[1px]  bg-white cursor-pointer  focus-within:bg-[#B1D2F1]'>Male</button>
        </div>
        <InputField icon={userLogo} name='username' placeholder='Username' handleChange={handleChange}  />
        <InputField icon={mailLogo} name='email' placeholder='Email' handleChange={handleChange} />
        <div className="flex gap-[12px] items-center text-[14px] text-gray-900 font-medium py-[12px] px-[16px] border border-gray-400 rounded-[5px] h-auto w-full">
            <img src={calendar} alt="calendar-icon" className='w-[24px] h-[24px]' />
            <DatePicker selected={user.date? new Date(user.date) : null}  // convert selected date to javascript date object, otherwise set it to null
                onChange={(date) => updateUser('date', date.toISOString().split('T')[0])} //update state with the date in this format 'YYYY-MM-DD'
                placeholderText="Date of birth"
                className='text-[14px] text-gray-900 w-full font-medium outline-none '
            />
        </div>
        <PasswordInputField name='password' userPassword={user.password} passwordLength={user.password.length} handleChange={handleChange} />
        {/* <input type="date" placeholder='Date of birth' 
            name="date" value={user.date} onChange={handleChange}
            className='text-[14px] text-gray-900 font-medium outline-none py-[12px] px-[16px] border border-gray-400 rounded-[5px] h-auto w-full ' 
        /> */}
        <button 
            type='submit'
            className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
            isPasswordValid ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'}`} 
            disabled={!isPasswordValid} 
        >
            Submit
        </button>
        <p className=' text-center text-sm  text-gray-500'>or sign up with:</p>	
        <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px] ">
            <SignUpOptions icon={google} />
            <SignUpOptions icon={facebook} />
            <SignUpOptions icon={instagram} />
        </div> 
    </form>
  )
}
