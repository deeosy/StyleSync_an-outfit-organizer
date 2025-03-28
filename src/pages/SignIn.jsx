// import React, { useState } from 'react'
// import InputField from '../components/InputField'
// import PasswordInputField from '../components/PasswordInputField'
// import SignUpOptions from '../components/SignUpOptions'
// import mailLogo from '../icons/mail.png'  // Re-added the mailLogo import
// import google from '../icons/google.png'
// import facebook from '../icons/facebook.png'
// import { signIn } from '../services/authService'
// import { useNavigate } from 'react-router-dom'
// import useAuthenticationStore from '../store/userStore'
// import {auth} from '../config/firebase'
// import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth'

// export default function SignIn() { 
//     const {login} = useAuthenticationStore()  
//     const navigate = useNavigate()

//     const [credentials, setCredentials] = useState({email:'', password:''}); 
//     const [error, setError] = useState('')  
//     const [loading, setLoading] = useState(false)

//     const handleChange = (e) => {  
//         const {name, value} = e.target;
//         setCredentials(prev => ({ ...prev, [name]: value }))
//         setError('') // Clear previous errors when typing
//     }

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setLoading(true);
//       setError('');

//       // Basic client-side validation
//       if (!credentials.email || !credentials.password) {
//         setError('Please enter both email and password');
//         setLoading(false);
//         return;
//       }

//       try {
//         const userCredential = await signIn(credentials.email, credentials.password);
//         const user = userCredential.user;
        
//         // Additional verification
//         if (!user) {
//           throw new Error('Authentication failed: No user returned');
//         }
//         try{
//           await login(user)
//           navigate("/dashboard")
//         } catch(storeError){
//           console.error('Store update error:', storeError);
//           setError('Failed to update user state');
//         }
//       } catch (error) {
//         console.error('Detailed Login Error:', error);
        
//         // More specific error handling
//         switch (error.code) {
//           case 'auth/invalid-credential':
//             setError('Invalid email or password. Please check and try again.');
//             break;
//           case 'auth/user-not-found':
//             setError('No account found with this email. Please sign up.');
//             break;
//           case 'auth/wrong-password':
//             setError('Incorrect password. Please try again.');
//             break;
//           case 'auth/too-many-requests':
//             setError('Too many login attempts. Please try again later.');
//             break;
//           default:
//             setError('An unexpected error occurred. Please try again.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     const handleGoogleSignIn = async () => {
//       setLoading(true);
//       try {
//         const provider = new GoogleAuthProvider();
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;
//         login(user);
//         navigate('/dashboard');
//       } catch (error) {
//         console.error('Google sign-in error:', error);
//         setError(error.message || 'Failed to sign in with Google');
//         setTimeout(() => setError(''), 4000);
//       } finally {
//         setLoading(false);
//       }
//     }

//     const handleFacebookSignIn = async () => {
//       setLoading(true);
//       try {
//         const provider = new FacebookAuthProvider();
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;
//         login(user);
//         navigate('/dashboard');
//       } catch (error) {
//         console.error('Facebook sign-in error:', error);
//         setError(error.message || 'Failed to sign in with Facebook');
//         setTimeout(() => setError(''), 4000);
//       } finally {
//         setLoading(false);
//       }
//     }

//     const isPasswordValid = credentials.password.length >= 8
//     const isEmailValid = credentials.email.includes('@')

//     return (
//       <form onSubmit={handleSubmit} className="flex flex-col mx-4 sm:mx-10 gap-[16px] text-gray-400">
//         <InputField 
//           icon={mailLogo} 
//           name='email'  
//           placeholder='Email' 
//           handleChange={handleChange} 
//           value={credentials.email}  
//         />
//         <div>
//           <PasswordInputField 
//             name='password' 
//             userPassword={credentials.password} 
//             passwordLength={credentials.password.length} 
//             handleChange={handleChange} 
//           />
//           {error && <p className='text-[12px] text-[#ED4F9D] mt-2'>{error}</p>}
//         </div>

//         <button 
//           type='submit' 
//           disabled={!isPasswordValid || loading}
//           className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
//             isPasswordValid && !loading 
//               ? 'bg-[#B1D2F1] text-[#212529]' 
//               : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
//           }`}
//         >
//           {loading ? 'Signing In...' : 'Continue'}
//         </button>
//         <p className=' text-center text-sm  text-gray-500'>or sign up with:</p>	
//         <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px] ">
//             <SignUpOptions icon={google} onClick={handleGoogleSignIn} />
//             <SignUpOptions icon={facebook} onClick={handleFacebookSignIn} />
//             <SignUpOptions icon={instagram} />
//         </div>	
//       </form> 
//     )
// }

import React, { useState } from 'react';
import InputField from '../components/InputField';
import PasswordInputField from '../components/PasswordInputField';
import SignUpOptions from '../components/SignUpOptions';
import mailLogo from '../icons/mail.png';
import google from '../icons/google.png';
import facebook from '../icons/facebook.png';
import instagram from '../icons/instagram.png'
import { signIn } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import useAuthenticationStore from '../store/userStore'; // Assuming this is the correct path
import { auth } from '../config/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';

export default function SignIn() {
  const { login } = useAuthenticationStore();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes and clear error
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError(''); // Clear previous errors when typing
  };

  // Handle email/password sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic client-side validation
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signIn(credentials.email, credentials.password);
      const user = userCredential.user;

      // Additional verification
      if (!user) {
        throw new Error('Authentication failed: No user returned');
      }

      // Store update with error handling
      try {
        await login(user);
        navigate('/dashboard');
      } catch (storeError) {
        console.error('Store update error:', storeError);
        setError('Failed to update user state');
        return; // Prevent navigation if store update fails
      }
    } catch (error) {
      console.error('Detailed Login Error:', error);

      // Specific error handling
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please check and try again.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/too-many-requests':
          setError('Too many login attempts. Please try again later.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Ensure loading is reset in all cases
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      try {
        await login(user);
        navigate('/dashboard');
      } catch (storeError) {
        console.error('Google store update error:', storeError);
        setError('Failed to update user state after Google sign-in');
        return;
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
      setTimeout(() => setError(''), 4000); // Clear error after 4 seconds
    } finally {
      setLoading(false);
    }
  };

  // Handle Facebook sign-in
  const handleFacebookSignIn = async () => {
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      try {
        await login(user);
        navigate('/dashboard');
      } catch (storeError) {
        console.error('Facebook store update error:', storeError);
        setError('Failed to update user state after Facebook sign-in');
        return;
      }
    } catch (error) {
      console.error('Facebook sign-in error:', error);
      setError(error.message || 'Failed to sign in with Facebook');
      setTimeout(() => setError(''), 4000); // Clear error after 4 seconds
    } finally {
      setLoading(false);
    }
  };

  // Validation rules
  const isPasswordValid = credentials.password.length >= 8;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email); // Stricter email validation

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-4 sm:mx-10 gap-[16px] text-gray-400">
      <InputField
        icon={mailLogo}
        name="email"
        placeholder="Email"
        handleChange={handleChange}
        value={credentials.email}
      />
      <div>
        <PasswordInputField
          name="password"
          userPassword={credentials.password}
          passwordLength={credentials.password.length}
          handleChange={handleChange}
        />
        {error && <p className="text-[12px] text-[#ED4F9D] mt-2">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={!isPasswordValid || !isEmailValid || loading} // Added isEmailValid to disable button
        className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
          isPasswordValid && isEmailValid && !loading
            ? 'bg-[#B1D2F1] text-[#212529]'
            : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
        }`}
      >
        {loading ? 'Signing In...' : 'Continue'}
      </button>
      <p className="text-center text-sm text-gray-500">or sign up with:</p>
      <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px]">
        <SignUpOptions icon={google} onClick={handleGoogleSignIn} />
        <SignUpOptions icon={facebook} onClick={handleFacebookSignIn} />
        <SignUpOptions icon={instagram} />
      </div>
    </form>
  );
}