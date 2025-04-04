import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { updateEmail, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';

const CLIENT_ID = '387ee19ec8efbf6'; // Your Imgur Client ID

export default function Account() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    dateOfBirth: '',
    country: '',
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
    setLoading(true);
    setError('');
    try {
      // Upload the image to Imgur
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${CLIENT_ID}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!data.success) throw new Error('Image upload failed');

      // Get the Imgur image URL
      const photoURL = data.data.link;

      // Update Firestore with the new photoURL
      const currentUser = auth.currentUser;
      await updateDoc(doc(db, 'users', currentUser.uid), { photoURL });
      setPhotoPreview(photoURL);
      setSuccess('Profile photo updated!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error uploading photo:', err);
      setError('Failed to upload photo: ' + err.message);
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
            <div className="mb-4 bg-red-100 border border-red-400 pink-red-500 px-4 py-3 rounded">
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
                      <div className="relative  h-[120px] w-[120px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {!photoPreview ? (
                          <span className="text-3xl text-gray-600">{getProfileInitials()}</span>
                        ) : (
                          <img src={photoPreview} alt="Profile" className="h-16 w-16 object-cover" />
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 bg-pink-400 rounded-full p-1 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          viewBox="0 0 20 18"
                          fill="currentColor"
                        >
                          <path d="M10 3a1 1 0 011 1v2h2a1 1 0 110 2h-3v2h2a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h2V6a1 1 0 112 0v2h2a1 1 0 110 2h-2V6h3a1 1 0 110 2h-3V6h-2V3a1 1 0 011-1z" />
                        </svg>
                        <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold text-gray-900">{profile.username}</h1>
                    <p className="text-sm text-gray-600">{profile.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ProfileForm
                profile={profile}
                setProfile={setProfile}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
