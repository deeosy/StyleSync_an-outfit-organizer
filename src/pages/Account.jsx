import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../config/firebase';
import { updateEmail, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';

const CLIENT_ID = '387ee19ec8efbf6'; //  Imgur Client ID

export default function Account() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    dateOfBirth: '',
    country: '', // Added country field to match the form
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          navigate('/authentication/sign-in');
          return;
        }

        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
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
        } else {
          const userData = userDoc.data();
          setProfile({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            username: userData.username || '',
            email: currentUser.email || '',
            dateOfBirth: userData.dateOfBirth || '',
            country: userData.country || '',
          });
          setPhotoPreview(userData.photoURL || null);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load your profile data. Please try again.');
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('You must be logged in to update your profile');
      await updateDoc(doc(db, 'users', currentUser.uid), {
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        dateOfBirth: profile.dateOfBirth,
        country: profile.country, // Save country
      });
      if (profile.email !== currentUser.email) await updateEmail(currentUser, profile.email);
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

  const handlePhotoChange = async (e) => {
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
      setSuccess('Profile photo updated!');
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (err) {
      console.error('Error uploading photo:', err);
      setError('Failed to upload photo: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      try {
        await auth.signOut();
        navigate('/authentication/sign-in');
      } catch (err) {
        console.error('Error signing out:', err);
        setError('Failed to sign out: ' + err.message);
      }
    }
  };

  const handleResetPassword = async () => {
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

  const getProfileInitials = () =>
    !profile.firstName && !profile.lastName
      ? '?'
      : (profile.firstName.charAt(0) + profile.lastName.charAt(0)).toUpperCase();

  if (loading && !profile.email && !photoPreview) {
    return (
      <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-500 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}
          <div className="flex flex-col gap-6 px-3">
            <div className="bg-white rounded-sm shadow p-3 sm:p-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col-reverse gap-2.5 sm:flex-row items-center ">
                  <div className="flex-shrink-0 mr-4">
                    <div className="relative">
                      <div className="relative h-[120px] w-[120px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {!photoPreview ? (
                          <span className="text-3xl text-gray-600">{getProfileInitials()}</span>
                        ) : (
                          <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 bg-pink-400 rounded-full p-1 cursor-pointer">
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
                  className="px-2 py-2 sm:px-5 sm:py-3 bg-pink-400 text-white rounded-[5px] text-sm font-medium uppercase hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
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
