import React, { useState } from 'react'
import InputField from '../components/InputField'
import PasswordInputField from '../components/PasswordInputField'
import SignUpOptions from '../components/SignUpOptions'
import google from '../icons/google.png'
import facebook from '../icons/facebook.png'
import instagram from '../icons/instagram.png'
import mailLogo from '../icons/mail.png'
import useAuthencationStore from '../store/userStore'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../services/authService'
import {auth} from '../config/firebase'
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth'

export default function SignIn() { 
    const {users, login} = useAuthencationStore()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({email:'', password:''}); 
    const [error, setError] = useState('')  
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {  
        const {name, value} = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

       try {
        const userCredential = await signIn(credentials.email, credentials.password);
        const user = userCredential.user;
        console.log('Login successful: ', user);
        login(user); 
        setError('');
        navigate('/dashboard');  // Changed to absolute path
      } catch (error) {
        console.error('Login error:', error);
        setError(error.message || 'Invalid email or password');
        setTimeout(() => setError(''), 4000);
      } finally {
        setLoading(false);
      }
    }
   
    const handleGoogleSignIn = async () => {
      setLoading(true);
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        login(user);
        navigate('/dashboard');  // Changed to absolute path
      } catch (error) {
        console.error('Google sign-in error:', error);
        setError(error.message || 'Failed to sign in with Google');
        setTimeout(() => setError(''), 4000);
      } finally {
        setLoading(false);
      }
    }

    const handleFacebookSignIn = async () => {
      setLoading(true);
      try {
        const provider = new FacebookAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        login(user);
        navigate('/dashboard');  // Changed to absolute path
      } catch (error) {
        console.error('Facebook sign-in error:', error);
        setError(error.message || 'Failed to sign in with Facebook');
        setTimeout(() => setError(''), 4000);
      } finally {
        setLoading(false);
      }
    }

    const isPasswordValid = credentials.password.length >= 8
    const isEmailValid = credentials.email.includes('@')

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-4 sm:mx-10 gap-[16px] text-gray-400">
        <InputField icon={mailLogo} name='email'  placeholder='Email' handleChange={handleChange} value={credentials.email}  />
        <div className="">
          <PasswordInputField name='password' userPassword={credentials.password} passwordLength={credentials.password.length} handleChange={handleChange} />
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
            <SignUpOptions icon={google} onClick={handleGoogleSignIn} />
            <SignUpOptions icon={facebook} onClick={handleFacebookSignIn} />
            <SignUpOptions icon={instagram} />
        </div>	
    </form> 
  )
}