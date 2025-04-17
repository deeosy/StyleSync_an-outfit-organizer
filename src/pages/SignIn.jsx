import React, { useState } from 'react';   // Import React and useState for managing form state
import InputField from '../components/InputField';   // Import custom input field component for email
import PasswordInputField from '../components/PasswordInputField';   // Import custom password input field component
import SignUpOptions from '../components/SignUpOptions';   // Import component for social sign-in buttons (Google/Facebook)

// Import icons for email, Google, and Facebook
import mailLogo from '../icons/mail.png';
import google from '../icons/google.png';
import facebook from '../icons/facebook.png';

import { signIn } from '../services/authService';   // Import signIn function from authService for email/password authentication
import { Link, useNavigate } from 'react-router-dom';   // Import Link and useNavigate from react-router-dom for navigation
import useAuthenticationStore from '../store/userStore';   // Import Zustand store for managing authentication state

// Import Firebase auth instance and providers for social sign-in
import { auth } from '../config/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import useAuthHandler from '../hooks/useAuthHandler';   // Import custom hook for handling authentication actions and errors

export default function SignIn() {
  const { login } = useAuthenticationStore();   // Get the login function from the authentication store to update user state
  const navigate = useNavigate();   // Use navigate hook to redirect users after successful sign-in
  const [credentials, setCredentials] = useState({ email: '', password: '' });   // State to store email and password input values
  const { loading, error, success, handleAuthAction } = useAuthHandler();   // Destructure loading, error, success states and handleAuthAction function from custom hook

  const handleChange = (e) => {   // Handle changes to input fields (email and password)
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {   // Handle form submission for email/password sign-in
    e.preventDefault();
    if (!credentials.email || !credentials.password) {        // Validate that both email and password are provided
      handleAuthAction(() => {
        throw new Error('Please enter both email and password'); // Throw error to be caught by handleAuthAction
      });
      return;
    }

    handleAuthAction(async () => {   // Use handleAuthAction to perform the sign-in and handle errors
      const userCredential = await signIn(credentials.email, credentials.password);   // Call the signIn function with email and password
      const user = userCredential.user;   // Get the user from the credential
      if (!user) throw new Error('Authentication failed: No user returned');   // Validate that a user was returned
      await login(user);   // Update the authentication store with the user
      navigate('/dashboard');   // Redirect to the dashboard after successful sign-in
    }, {
      // Map Firebase error codes to user-friendly messages
      'auth/invalid-credential': 'Invalid email or password. Please check and try again.',
      'auth/user-not-found': 'No account found with this email. Please sign up.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/too-many-requests': 'Too many login attempts. Please try again later.',
    });
  };

  const handleGoogleSignIn = () =>   // Handle sign-in with Google using Firebase Auth
  handleAuthAction(async () => {
    const provider = new GoogleAuthProvider();   // Create a Google authentication provider
    const result = await signInWithPopup(auth, provider);   // Open Google sign-in popup
    const user = result.user;   // Get the user from the result
    await login(user);   // Update the authentication store with the user
    navigate('/dashboard');    // Redirect to the dashboard
  }, { default: 'Failed to sign in with Google' });    // Default error message for Google sign-in failures

  const handleFacebookSignIn = () =>   // Handle sign-in with Facebook using Firebase Auth
  handleAuthAction(async () => {
    const provider = new FacebookAuthProvider(); // Create a Facebook authentication provider
    const result = await signInWithPopup(auth, provider); // Open Facebook sign-in popup
    const user = result.user; // Get the user from the result
    await login(user); // Update the authentication store with the user
    navigate('/dashboard'); // Redirect to the dashboard
  }, { default: 'Failed to sign in with Facebook' }); // Default error message for Facebook sign-in failures
  
  const isPasswordValid = credentials.password.length >= 8;    // Validate email format using a regular expression
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email);    // Validate password length (minimum 8 characters)

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-4 sm:mx-10 gap-[16px] text-gray-400">
      {/* Email input field */}
      <InputField
        icon={mailLogo}
        name="email"
        placeholder="Email"
        handleChange={handleChange}
        value={credentials.email}
      />
      <div>
        {/* Password input field */}
        <PasswordInputField
          name="password"
          userPassword={credentials.password}
          passwordLength={credentials.password.length}
          handleChange={handleChange}
        />
        {/* Link to reset password */}
        <p className="text-[12px] text-gray-500 mt-2 hover:underline w-fit">
          <Link to="/authentication/reset-password">Forgot Password</Link>
        </p>
        {/* Display error message if authentication fails or succeeds */}
        {error && <p className="text-[12px] text-[#ED4F9D] mt-2">{error}</p>}
        {success && <p className="text-[12px] text-green-500 mt-2">{success}</p>}
      </div>
      {/* Submit button for the form */}
      <button
        type="submit"
        disabled={!isPasswordValid || !isEmailValid || loading}
        className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
          isPasswordValid && isEmailValid && !loading
            ? 'bg-[#B1D2F1] text-[#212529]'
            : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
        }`}
      >
        {/* Show "Signing In..." while loading, otherwise "Continue" */}
        {loading ? 'Signing In...' : 'Continue'}
      </button>
      <p className="text-center text-sm text-gray-500">or sign up with:</p>
      {/* Google and Facebook sign-in buttons */}
      <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px]">
        <SignUpOptions icon={google} onClick={handleGoogleSignIn} disabled={loading} />
        <SignUpOptions icon={facebook} onClick={handleFacebookSignIn} disabled={loading} />
      </div>
    </form>
  );
}