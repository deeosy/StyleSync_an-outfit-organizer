import React, { useState, useEffect } from 'react';  // Import React and necessary hooks for state and side effects
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';   // Import Firestore functions for database operations

// Import Firebase Auth functions
import { auth, db } from '../config/firebase';
import { updateEmail, sendPasswordResetEmail, updateProfile } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';  // Import routing hook for navigation
import ProfileForm from '../components/ProfileForm';  // Import the ProfileForm component for rendering the form
import useAuthenticationStore from '../store/userStore';   // Import Zustand store for authentication state management

const CLIENT_ID = '387ee19ec8efbf6'; // Imgur Client ID for image uploads

export default function Account() {
  const { user, updateUser  } = useAuthenticationStore();   // Access user data and update function from the Zustand store

  const navigate = useNavigate();  // Hook for programmatic navigation

  const [profile, setProfile] = useState({   // State to manage the profile form data
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    dateOfBirth: '',
    country: '', 
  });

  const [photoPreview, setPhotoPreview] = useState(null);   // State to manage the profile photo preview
  const [loading, setLoading] = useState(true);  // State to track loading status for async operations
  const [error, setError] = useState('');  // State to store error messages
  const [success, setSuccess] = useState('');   // State to store success messages
  const [signOutLoading, setSignOutLoading] = useState('');   // Added: State to track loading status specifically for sign-out  

  const isMale = user?.gender === 'male';  // Determine if the user is male for dynamic styling

  useEffect(() => {   // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {   // Redirect to sign-in if no user is authenticated
          navigate('/authentication/sign-in');
          return;
        }

        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {   // If user document doesn't exist, create a new one with default values
          const initialData = {
            firstName: '',
            lastName: '',
            username: currentUser.displayName || '',
            email: currentUser.email || '',
            dateOfBirth: '',
            country: '',
            photoURL: currentUser.photoURL || '',
            createdAt: new Date(),
          };
          await setDoc(userDocRef, initialData);
          setProfile(initialData);
          setPhotoPreview(initialData.photoURL || null);
          updateUser(initialData);   // Update Zustand store with initial data
        } else {
          // If user document exists, populate the profile state with the data
          const userData = userDoc.data();
          const profileData = {
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            username: userData.username || '',
            email: currentUser.email || '',
            dateOfBirth: userData.dateOfBirth || '',
            country: userData.country || '',
          };
          setProfile(profileData);
          setPhotoPreview(userData.photoURL || null);
          updateUser(profileData)  // Sync Zustand store with fetched data
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load your profile data. Please try again.');
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate, updateUser]);

  const handleChange = (e) => {   // Handle changes to form inputs
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {  // Handle form submission to update profile data
    e.preventDefault();
    if(loading) return;   //Prevent multiple submissions
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('You must be logged in to update your profile');
      
      const updatedProfile ={
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        dateOfBirth: profile.dateOfBirth,
        country: profile.country,
      }

      await updateDoc(doc(db, 'users', currentUser.uid), updatedProfile);  // Update Firestore with the new profile data

      if (profile.email !== currentUser.email) {   // Update email in Firebase Auth if it has changed
        await updateEmail(currentUser, profile.email);
      }

      updateUser(updatedProfile)  // Update Zustand store with the new profile data
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(
        err.code === 'auth/requires-recent-login'
          ? 'Please sign out and sign in again to update your email.'
          : 'Failed to update profile: ' + err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = async (e) => {   // Handle profile photo upload to Imgur
    const file = e.target.files[0];
    if (!file) return;
    
    // File validation
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }
    
    if (!file.type.match('image.*')) {
      setError('Only image files are allowed');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
     // Upload to Imgur
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${CLIENT_ID}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Imgur response:', data);
      
      if (!data.success) {
        console.error('Imgur upload error:', data);
        throw new Error(data.data?.error?.message || 'Image upload failed');
      }
      
      const photoURL = data.data.link;
      
      // Update Firestore with the new photo URL
      const currentUser = auth.currentUser;
      await updateDoc(doc(db, 'users', currentUser.uid), { photoURL });
      setPhotoPreview(photoURL);
      updateUser({ photoURL });   // Update Zustand store with the new photo URL
      setSuccess('Profile photo updated!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error uploading photo:', err);
      setError('Failed to upload photo: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {  // Handle user sign-out
    if (signOutLoading) return;   // Prevent multiple sign-out attempts
    if (window.confirm('Are you sure you want to sign out?')) {
      setSignOutLoading(true);
      setError('');
      try {
        await auth.signOut();
        navigate('/authentication/sign-in');
      } catch (err) {
        console.error('Error signing out:', err);
        setError('Failed to sign out: ' + err.message);
      } finally {
        setSignOutLoading(false);
      }
    }
  };

  const handleResetPassword = async () => {  // Handle sending a password reset email
    if (loading) return; // Prevent multiple resets
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (!profile.email) throw new Error('Email is required to send a reset link');
      await sendPasswordResetEmail(auth, profile.email);
      setSuccess('Password reset email sent! Check your inbox.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error sending password reset:', err);
      setError(
        err.code === 'auth/invalid-email'
          ? 'Invalid email format. Please check and try again.'
          : err.code === 'auth/user-not-found'
          ? 'No account found with this email.'
          : err.code === 'auth/too-many-requests'
          ? 'Too many requests. Please try again later.'
          : 'Failed to send reset email: ' + err.message
      );
    } finally {
      setLoading(false);
    }
  };
  
  const getProfileInitials = () =>  // Function to get profile initials for display if no photo is available
    !profile.firstName && !profile.lastName
      ? '?'
      : (profile.firstName.charAt(0) + profile.lastName.charAt(0)).toUpperCase();

  if (loading && !profile.email && !photoPreview) {  // Display a loading spinner while fetching user data
    return (
      <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isMale ? 'border-blue-400' : 'border-pink-500'} mx-auto`}></div>
          <p className="mt-4">Loading your profile...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Display error message if present */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-500 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {/* Display success message if present */}
          {success && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}
          <div className="flex flex-col gap-6 px-3">
            <div className="bg-white rounded-sm shadow p-3 sm:p-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col-reverse gap-2.5 sm:flex-row items-center ">
                  {/* Profile photo or initials */}
                  <div className="flex-shrink-0 mr-4">
                    <div className="relative">
                      <div className="relative h-[120px] w-[120px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {!photoPreview ? (
                          <span className="text-3xl text-gray-600">{getProfileInitials()}</span>
                        ) : (
                          <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
                        )}
                      </div>
                      {/* Label for uploading a new profile photo */}
                      <label className={`absolute bottom-0 right-0 ${isMale ? 'bg-blue-300' : 'bg-pink-400'}  rounded-full p-1 cursor-pointer`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          viewBox="0 0 20 18"
                          fill="currentColor"
                        >
                          <path d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V4a1 1 0 011-1z" />
                        </svg>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handlePhotoChange}
                          accept="image/*"
                          disabled={loading}
                        />
                      </label>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">My Personal Info</h2>
                </div>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className={`px-2 py-2 sm:px-5 sm:py-3 disabled:opacity-50 text-white rounded-[5px] text-sm font-medium uppercase  focus:outline-none focus:ring-2
                    hover:cursor-pointer ${isMale ? 'focus:ring-blue-300  bg-blue-300 hover:bg-blue-400' : 'focus:ring-pink-500  bg-pink-400 hover:bg-pink-500' } 
                  `}
                >
                  Sign Out
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 inline-block"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zM2 4a2 2 0 012-2h7.586a1 1 0 01.707.293l5 5A1 1 0 0118 8v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Profile form for editing user details */}
            <ProfileForm
              profile={profile}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleResetPassword={handleResetPassword}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
