import React, { useState } from 'react'
import skyBG from '../images/image.png'
import InputField from '../components/InputField'
import userLogo from '../icons/user.png'
import mailLogo from '../icons/mail.png'
import Password from '../Components/PasswordInputField'
import SignUpOptions from '../components/SignUpOptions'
import google from '../icons/google.png'
import facebook from '../icons/facebook.png'
import instagram from '../icons/instagram.png'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import { signUp } from '../services/authService'
import {useNavigate} from 'react-router-dom'

export default function Login() {
	const [user, setUser ] = useState({
			username: '',
			email: '',
			password: '',
		})
       //Naavigate to Home page
        const navigate = useNavigate();
        const handleSignUp = async (e) => {
            e.preventDefault();
            try {
              await signUp(email, password);
             navigate('/Home');
              alert("Sign up successful!");
            } catch (err) {
              setError(err.message);
            }




    const [isSignUp , useSignUp] = useState(false)
    const handleSignUp = () => {
			useSignUp(true);
			setUser({ username: '', email: '', password: '' })
		}
    const handleSignIn = () => {
			useSignUp(false);
			setUser({ username: '', email: '', password: '' })
		}

    
      const handleChange = (e) => {
          const {name, value} = e.target;
          setUser((previousValue) =>({...previousValue, [name]:value}))
        }

			const isPasswordValid = user.password.length >= 8;

  return (
        <div className="relative overflow-hidden w-full h-full manrope">
            <img src={skyBG} alt="sky background" className='h-full w-full object-cover absolute ' />
            <div className="bg-[#f5f5f5] rounded-[15px] relative  md:w-[740px] md:h-[700px] mx-3 mt-[40px] mb-[40px] md:mx-auto md:mt-[105px] md:mb-[243px] z-10 py-6 px-3 md:py-[57px] md:px-[79px] ">
                <p className='text-center text-[27px] font-bold '>Welcome to StyleSync</p>
                <div className=" sm:mx-10 flex justify-center md:justify-between gap-[30px] md:gap-[60px] mt-[20px] md:mt-[58px] mb-[33px] ">
                    <button className='rounded-[5px] w-[105px] h-[40px] sm:w-[275px] sm:h-[71px] text-[16px] md:text-[24px] bg-white cursor-pointer  focus-within:bg-[#B1D2F1] ' onClick={handleSignUp} >Sign In</button>
                    <button className='rounded-[5px] w-[105px] h-[40px] sm:w-[275px] sm:h-[71px] text-[16px] md:text-[24px] bg-white cursor-pointer focus-within:bg-[#B1D2F1] ' onClick={handleSignIn} >Sign Up</button>
                </div>
                <form >
                    {isSignUp ? 
                        <div className="flex flex-col mx-4 sm:mx-10 gap-[16px] text-gray-400">
                            <InputField icon={mailLogo} name='email' placeholder='Email' handleChange={handleChange} />
                            <Password name='password' userPassword={user.password} passwordLength={user.password.length} handleChange={handleChange} />

                            <button type='submit' className='bg-[#B1D2F1] text-[#212529] w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer '>Log In</button>
														<p className=' text-center text-sm md:text-[20px] text-[#212529]'>or sign in with:</p>	
                            <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px] ">
                                <SignUpOptions icon={google} />
                                <SignUpOptions icon={facebook} />
                                <SignUpOptions icon={instagram} />
                            </div>	
                        </div> 
                        : <div className="flex flex-col mx-4 sm:mx-10 gap-[16px] text-gray-400">
                            <InputField icon={userLogo} name='username' placeholder='Username' handleChange={handleChange} />
                            <InputField icon={mailLogo} name='email' placeholder='Email' handleChange={handleChange} />
                            <Password name='password' userPassword={user.password} passwordLength={user.password.length} handleChange={handleChange} />

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
                        </div>
                    }
                </form>
            </div>
            <Footer position={'relative'} />
        </div>
  )
}
