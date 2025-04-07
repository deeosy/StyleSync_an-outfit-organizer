import React from 'react';  // Import React library for building the component
import useAuthenticationStore from '../store/userStore';  // Import Zustand store for authentication state management

export default function ProfileForm({ profile, handleChange, handleSubmit, handleResetPassword, loading }) {
  const { user  } = useAuthenticationStore();   // Access user from the Zustand store

  const isMale = user?.gender === 'male'   // Determine if the user is male for dynamic styling

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-sm py-8 px-10 sm:py-12 sm:px-18">
      {/* Grid layout for form fields, 1 column on small screens, 2 columns on medium screens and above */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 uppercase mb-1">
            First Name
          </label>
          <input
            type="text"  required
            id="firstName"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className={`w-full border-0 border-b outline-none border-gray-300  focus:ring-0 p-2 text-gray-900
            ${isMale ? 'focus:border-blue-400' : 'focus:border-pink-500'}  `}
            disabled={loading}
            aria-label="First Name"
          />
        </div>
        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 uppercase mb-1">
            Last Name
          </label>
          <input
            type="text" required
            id="lastName"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className={`w-full border-0 border-b outline-none border-gray-300  focus:ring-0 p-2 text-gray-900
            ${isMale ? 'focus:border-blue-400' : 'focus:border-pink-500'}  `} 
            disabled={loading}
            aria-label="Last Name"
          />
        </div>
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-xs font-medium text-gray-700 uppercase mb-1">
            Username
          </label>
          <input
            type="text" required
            id="username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className={`w-full border-0 border-b outline-none border-gray-300  focus:ring-0 p-2 text-gray-900
            ${isMale ? 'focus:border-blue-400' : 'focus:border-pink-500'}  `}
            disabled={loading}
            aria-label="Username"
          />
        </div>
        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-700 uppercase mb-1">
            Email Address
          </label>
          <input
            type="email"   required
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className={`w-full border-0 border-b outline-none border-gray-300  focus:ring-0 p-2 text-gray-900
            ${isMale ? 'focus:border-blue-400' : 'focus:border-pink-500'}  `}
            disabled={loading}
            aria-label="Email Address"
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
            aria-label="Country"
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
            aria-label="Date of Birth"
          />
        </div>
        {/* Password (Reset Link) */}
        <div>
          <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Password</label>
          <button
            type="button"
            onClick={handleResetPassword}
            className={` text-sm underline mb-12 hover:cursor-pointer ${ isMale ? 'hover:text-blue-600 text-blue-400' : 'hover:text-pink-700 text-pink-500'}`}
            disabled={loading}
            aria-label="Send password reset email"
          >
            Send Reset Email
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
          aria-label="Save profile changes"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}