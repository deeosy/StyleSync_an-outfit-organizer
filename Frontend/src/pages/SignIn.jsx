import React from 'react'
import InputField from '../components/InputField'
import PasswordInputField from '../Components/PasswordInputField'
import SignUpOptions from '../components/SignUpOptions'
import google from '../icons/google.png'
import facebook from '../icons/facebook.png'
import instagram from '../icons/instagram.png'
import mailLogo from '../icons/mail.png'
import useAuthencationStore from '../store/userStore'


export default function SignIn() {
    const {user, updateUser, resetUser} = useAuthencationStore()
    const handleChange = (e) => {
        const {name, value} = e.target;
        updateUser(name, value); // Update Zustand state
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

    const isPasswordValid = user.password.length >= 8


  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-4 sm:mx-10 gap-[16px] text-gray-400">
        <InputField icon={mailLogo} name='email' placeholder='Email' handleChange={handleChange} />
        <PasswordInputField name='password' userPassword={user.password} passwordLength={user.password.length} handleChange={handleChange} />

        <button type='submit' 
            className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
            isPasswordValid ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'}`} 
            disabled={!isPasswordValid}        >
            Continue
        </button>
            <p className=' text-center text-sm md:text-[20px] text-[#212529]'>or sign in with:</p>	
        <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px] ">
            <SignUpOptions icon={google} onClick={handleGoogleSignIn} />
            <SignUpOptions icon={facebook} onClick={handleFacebookSignIn} />
            <SignUpOptions icon={instagram} />
        </div>	
    </form> 
  )
}