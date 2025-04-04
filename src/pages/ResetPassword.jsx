import React, { useState } from 'react';
import InputField from '../components/InputField';
import mailLogo from '../icons/mail.png';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import useAuthHandler from '../hooks/useAuthHandler';

export default function ResetPassword() {
  const [credentials, setCredentials] = useState({ email: '' });
  const { loading, error, success, handleAuthAction } = useAuthHandler();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!credentials.email) {
      setError('Please enter your email to reset your password');
      return;
    }
    
    handleAuthAction(() => sendPasswordResetEmail(auth, credentials.email), {
      'auth/invalid-email': 'Invalid email format. Please check and try again.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/too-many-requests': 'Too many requests. Please try again later.',
    });
  };

  return (
    <form onSubmit={handleResetPassword} className="flex flex-col justify-between mx-4 sm:mx-10 gap-[16px] text-gray-400">
      <div>
        <InputField
          icon={mailLogo}
          name="email"
          placeholder="Email"
          handleChange={handleChange}
          value={credentials.email}
        />
        {success && <p className="text-[12px] text-green-500 mt-2">Password reset email sent! Check your inbox.</p>}
        {error && <p className="text-[12px] text-[#ED4F9D] mt-2">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
          !loading ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
        }`}
      >
        {loading ? 'Sending...' : 'Forgot Password?'}
      </button>
    </form>
  );
}