import React from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import useAuthenticationStore from '../store/userStore';

export default function ProfileForm({ profile, handleChange, handleSubmit, handleResetPassword, loading }) {
  const { user  } = useAuthenticationStore();   // Access user from the Zustand store

  const isMale = user?.gender === 'male'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-sm py-8 px-10 sm:py-12 sm:px-18">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 uppercase mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className={`w-full border-0 border-b outline-none border-gray-300  focus:ring-0 p-2 text-gray-900
            ${isMale ? 'focus:border-blue-400' : 'focus:border-pink-500'}  `}
            disabled={loading}
          />
        </div>
        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 uppercase mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className={`w-full border-0 border-b outline-none border-gray-300  focus:ring-0 p-2 text-gray-900
            ${isMale ? 'focus:border-blue-400' : 'focus:border-pink-500'}  `} 
            disabled={loading}
          />
        </div>
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-xs font-medium text-gray-700 uppercase mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className={`w-full border-0 border-b outline-none border-gray-300  focus:ring-0 p-2 text-gray-900
            ${isMale ? 'focus:border-blue-400' : 'focus:border-pink-500'}  `}
            disabled={loading}
          />
        </div>
        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-700 uppercase mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className={`w-full border-0 border-b outline-none border-gray-300  focus:ring-0 p-2 text-gray-900
            ${isMale ? 'focus:border-blue-400' : 'focus:border-pink-500'}  `}
            disabled={loading}
          />
        </div>
        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-xs font-medium text-gray-700 uppercase mb-1">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={profile.country || ''}
            onChange={handleChange}
            className={`w-full border-0 border-b outline-none border-gray-300  focus:ring-0 p-2 text-gray-900
            ${isMale ? 'focus:border-blue-400' : 'focus:border-pink-500'}  `}
            disabled={loading}
          />
        </div>
        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-xs font-medium text-gray-700 uppercase mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            onChange={handleChange}
            className={`w-full border-0 hover:cursor-text border-b border-gray-300  focus:ring-0 p-2 text-gray-900 outline-none
            ${isMale ? 'focus:border-blue-400' : 'focus:border-pink-500' } `}
            disabled={loading}
          />
        </div>
        {/* Password (Reset Link) */}
        <div>
          <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Password</label>
          <button
            type="button"
            onClick={handleResetPassword}
            className={` text-sm underline  hover:cursor-pointer ${ isMale ? 'hover:text-blue-600 text-blue-400' : 'hover:text-pink-700 text-pink-500'}`}
            disabled={loading}
          >
            send reset email
          </button>
        </div>
      </div>
      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className={`hover:cursor-pointer w-full py-3  text-white rounded-lg font-medium uppercase  focus:outline-none focus:ring-2  disabled:opacity-50
            ${isMale ? 'bg-blue-300 hover:bg-blue-400 focus:ring-blu-400' : 'bg-pink-400 hover:bg-pink-500 focus:ring-pink-400'}
          `}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}