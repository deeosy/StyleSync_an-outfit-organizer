import React, { useState } from 'react';
import InputField from '../components/InputField';
import PasswordInputField from '../components/PasswordInputField';
import SignUpOptions from '../components/SignUpOptions';
import mailLogo from '../icons/mail.png';
import google from '../icons/google.png';
import facebook from '../icons/facebook.png';
import { signIn } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import useAuthenticationStore from '../store/userStore';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import useAuthHandler from '../hooks/useAuthHandler';

export default function SignIn() {
  const { login } = useAuthenticationStore();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { loading, error, success, handleAuthAction } = useAuthHandler();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      return;
    }
    handleAuthAction(async () => {
      const userCredential = await signIn(credentials.email, credentials.password);
      const user = userCredential.user;
      if (!user) throw new Error('Authentication failed: No user returned');
      await login(user);
      navigate('/dashboard');
    }, {
      'auth/invalid-credential': 'Invalid email or password. Please check and try again.',
      'auth/user-not-found': 'No account found with this email. Please sign up.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/too-many-requests': 'Too many login attempts. Please try again later.',
    });
  };

  const handleGoogleSignIn = () =>
    handleAuthAction(async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await login(user);
      navigate('/dashboard');
    }, { default: 'Failed to sign in with Google' });

  const handleFacebookSignIn = () =>
    handleAuthAction(async () => {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await login(user);
      navigate('/dashboard');
    }, { default: 'Failed to sign in with Facebook' });

  const isPasswordValid = credentials.password.length >= 8;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email);

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
        <p className="text-[12px] text-gray-500 mt-2 hover:underline w-fit">
          <Link to="/authentication/reset-password">Forgot Password</Link>
        </p>
        {error && <p className="text-[12px] text-[#ED4F9D] mt-2">{error}</p>}
        {success && <p className="text-[12px] text-green-500 mt-2">{success}</p>}
      </div>
      <button
        type="submit"
        disabled={!isPasswordValid || !isEmailValid || loading}
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
        <SignUpOptions icon={google} onClick={handleGoogleSignIn} disabled={loading} />
        <SignUpOptions icon={facebook} onClick={handleFacebookSignIn} disabled={loading} />
      </div>
    </form>
  );
}