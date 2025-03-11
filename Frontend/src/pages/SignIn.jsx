import React, { useState } from 'react'
import InputField from '../components/InputField'
import PasswordInputField from '../Components/PasswordInputField'
import SignUpOptions from '../components/SignUpOptions'
import google from '../icons/google.png'
import facebook from '../icons/facebook.png'
import instagram from '../icons/instagram.png'
import mailLogo from '../icons/mail.png'
import useAuthencationStore from '../store/userStore'


export default function SignIn() {
    const {users} = useAuthencationStore() // get users array from zustand
    const [credentials, setCredentials] = useState({email:'', password:''}); //state to hold user input (email and password)
    const [error, setError] = useState('')  // state to track login errors


    const handleChange = (e) => {  //handle input field changes and update the credentials state
        const {name, value} = e.target;
        setCredentials(prev => ({...prev, [name]:value}))
    }

    const handleSignUp = async (e) => {
                e.preventDefault();
                try {
                  await signUp(email, password);
                 navigate('/Home');
                  alert("Sign up successful!");
                } catch (err) {
                  setError(err.message);
                }
    }

    const isPasswordValid = credentials.password.length >= 8


  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-4 sm:mx-10 gap-[16px] text-gray-400">
        <InputField icon={mailLogo} name='email' placeholder='Email' handleChange={handleChange} />
        <div className="">
          <PasswordInputField name='password' userPassword={credentials.password} passwordLength={credentials.password.length} handleChange={handleChange} />
          {/* field to display error message if credentials dont match */}
          {error && <p className='text-[12px] text-[#ED4F9D]'>{error}</p> } 
        </div>

        <button type='submit' 
            className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
            isPasswordValid ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'}`} 
            disabled={!isPasswordValid}        >
            Continue
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
