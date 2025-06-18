import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { updateEmail, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import useAuthenticationStore from '../store/userStore';
import useThemeStore from '../store/themeStore';

// Try importing theme components, but provide fallbacks
let ThemeSelector, ThemePreview, DarkModeToggle;

try {
  ThemeSelector = require('../components/ThemeSelector').default;
  ThemePreview = require('../components/ThemePreview').default;
  DarkModeToggle = require('../components/DarkModeToggle').default;
} catch (error) {
  console.log('Theme components not found, using fallbacks');
  
  // Fallback Theme Selector
  ThemeSelector = () => {
    const { currentColorTheme, setColorTheme, getTheme } = useThemeStore();
    const theme = getTheme();
    const themes = [
      { key: 'pink', name: 'Rose' },
      { key: 'blue', name: 'Ocean' },
      { key: 'purple', name: 'Lavender' },
      { key: 'green', name: 'Mint' },
      { key: 'orange', name: 'Sunset' },
      { key: 'teal', name: 'Aqua' },
      { key: 'red', name: 'Cherry' },
      { key: 'gray', name: 'Slate' }
    ];

    return (
      <select
        value={currentColorTheme}
        onChange={(e) => setColorTheme(e.target.value)}
        className={`w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors`}
      >
        {themes.map((theme) => (
          <option key={theme.key} value={theme.key}>
            {theme.name}
          </option>
        ))}
      </select>
    );
  };

  // Fallback Theme Preview
  ThemePreview = () => {
    const { currentColorTheme, setColorTheme, getTheme } = useThemeStore();
    const theme = getTheme();
    const themes = [
      { key: 'pink', name: 'Rose', color: 'bg-pink-400' },
      { key: 'blue', name: 'Ocean', color: 'bg-blue-400' },
      { key: 'purple', name: 'Lavender', color: 'bg-purple-400' },
      { key: 'green', name: 'Mint', color: 'bg-green-400' },
      { key: 'orange', name: 'Sunset', color: 'bg-orange-400' },
      { key: 'teal', name: 'Aqua', color: 'bg-teal-400' },
      { key: 'red', name: 'Cherry', color: 'bg-red-400' },
      { key: 'gray', name: 'Slate', color: 'bg-gray-400' }
    ];

    return (
      <div className="grid grid-cols-2 gap-3">
        {themes.map((themeOption) => (
          <button
            key={themeOption.key}
            onClick={() => setColorTheme(themeOption.key)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${theme.surface} ${theme.surfaceHover} ${
              currentColorTheme === themeOption.key ? `${theme.border} border-2` : `border-gray-200 ${theme.border}`
            }`}
          >
            <div className={`w-8 h-8 rounded-full ${themeOption.color} mx-auto mb-2`}></div>
            <p className={`text-sm ${theme.textPrimary}`}>{themeOption.name}</p>
          </button>
        ))}
      </div>
    );
  };

  // Fallback Dark Mode Toggle
  DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode, getTheme } = useThemeStore();
    const theme = getTheme();
    
    return (
      <button
        onClick={toggleDarkMode}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          isDarkMode ? theme.primary : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            isDarkMode ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    );
  };
}

const CLIENT_ID = '387ee19ec8efbf6';

export default function Account() {
  const { user, updateUser } = useAuthenticationStore();
  const { getTheme, isDarkMode } = useThemeStore();
  const theme = getTheme();

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
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

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
          updateUser(initialData);
        } else {
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
          updateUser(profileData)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(loading) return;
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

      await updateDoc(doc(db, 'users', currentUser.uid), updatedProfile);

      if (profile.email !== currentUser.email) {
        await updateEmail(currentUser, profile.email);
      }

      updateUser(updatedProfile)
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
      
      const currentUser = auth.currentUser;
      await updateDoc(doc(db, 'users', currentUser.uid), { photoURL });
      setPhotoPreview(photoURL);
      updateUser({ photoURL });
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
    if (signOutLoading) return;
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

  const handleResetPassword = async () => {
    if (loading) return;
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
      <div className={`min-h-screen ${theme.background} font-sans flex items-center justify-center transition-colors duration-200`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current ${theme.text} mx-auto`}></div>
          <p className={`mt-4 ${theme.textSecondary}`}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.background} font-sans transition-colors duration-200`}>
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          {error && (
            <div className={`mb-4 border border-red-400 text-red-500 px-4 py-3 rounded transition-colors duration-200 ${
              isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
            }`}>
              {error}
            </div>
          )}
          {success && (
            <div className={`mb-4 border border-green-400 text-green-700 px-4 py-3 rounded transition-colors duration-200 ${
              isDarkMode ? 'bg-green-900/20' : 'bg-green-100'
            }`}>
              {success}
            </div>
          )}
          
          <div className="flex flex-col gap-6 px-3">
            {/* Header Section */}
            <div className={`${theme.surface} rounded-lg shadow border ${theme.border} p-4 sm:p-6 transition-colors duration-200`}>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className={`relative h-[120px] w-[120px] rounded-full overflow-hidden ${theme.light} border-2 ${theme.border} flex items-center justify-center transition-colors duration-200`}>
                        {!photoPreview ? (
                          <span className={`text-3xl ${theme.textMuted}`}>{getProfileInitials()}</span>
                        ) : (
                          <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
                        )}
                      </div>
                      <label className={`absolute bottom-0 right-0 ${theme.secondary} rounded-full p-1 cursor-pointer ${theme.secondaryHover} transition-colors duration-200`}>
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
                  <div className="text-center sm:text-left">
                    <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Account Settings</h1>
                    <p className={`${theme.textSecondary}`}>Manage your profile and preferences</p>
                  </div>
                </div>
                
                <button
                  onClick={handleSignOut}
                  disabled={signOutLoading}
                  className={`px-4 py-2 sm:px-6 sm:py-3 disabled:opacity-50 text-white rounded-lg text-sm font-medium uppercase focus:outline-none ${theme.ring} focus:ring-2
                    hover:cursor-pointer ${theme.secondary} ${theme.secondaryHover} transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 shadow-sm hover:shadow-md`}
                >
                  {signOutLoading ? 'Signing Out...' : 'Sign Out'}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className={`${theme.surface} rounded-lg shadow border ${theme.border} transition-colors duration-200`}>
              <div className={`border-b ${theme.border}`}>
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'profile'
                        ? `border-current ${theme.text}`
                        : `border-transparent ${theme.textSecondary} ${theme.surfaceHover.replace('hover:', 'hover:text-')} hover:${theme.textPrimary.replace('text-', '')}`
                    }`}
                  >
                    Personal Info
                  </button>
                  <button
                    onClick={() => setActiveTab('appearance')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'appearance'
                        ? `border-current ${theme.text}`
                        : `border-transparent ${theme.textSecondary} ${theme.surfaceHover.replace('hover:', 'hover:text-')} hover:${theme.textPrimary.replace('text-', '')}`
                    }`}
                  >
                    Appearance
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'profile' && (
                  <div>
                    <h2 className={`text-xl font-semibold mb-6 ${theme.textPrimary}`}>Personal Information</h2>
                    
                    {/* Inline ProfileForm to ensure theme consistency */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors duration-200`}
                            disabled={loading}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors duration-200`}
                            disabled={loading}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={profile.username}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors duration-200`}
                            disabled={loading}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors duration-200`}
                            disabled={loading}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={profile.dateOfBirth}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors duration-200`}
                            disabled={loading}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                            Country
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={profile.country}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${theme.border} rounded-lg ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors duration-200`}
                            disabled={loading}
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className={`flex-1 px-6 py-3 ${theme.primary} ${theme.primaryHover} text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md focus:outline-none ${theme.ring} focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {loading ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleResetPassword}
                          disabled={loading}
                          className={`px-6 py-3 ${theme.secondary} ${theme.secondaryHover} text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md focus:outline-none ${theme.ring} focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className={`text-xl font-semibold mb-6 ${theme.textPrimary}`}>Appearance Settings</h2>
                      <p className={`${theme.textSecondary} mb-6`}>
                        Customize how your wardrobe app looks and feels. Changes are saved automatically.
                      </p>
                    </div>

                    {/* Dark Mode Toggle */}
                    <div>
                      <h3 className={`text-lg font-medium mb-4 ${theme.textPrimary}`}>Display Mode</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`${theme.textSecondary} text-sm mb-2`}>
                            Choose between light and dark mode
                          </p>
                          <p className={`${theme.textMuted} text-xs`}>
                            Current: {theme.isDark ? 'Dark Mode' : 'Light Mode'}
                          </p>
                        </div>
                        <DarkModeToggle />
                      </div>
                    </div>

                    {/* Theme Selector */}
                    <div>
                      <h3 className={`text-lg font-medium mb-4 ${theme.textPrimary}`}>Color Theme</h3>
                      <p className={`${theme.textSecondary} text-sm mb-3`}>
                        Select your preferred color scheme.
                      </p>
                      <div className="max-w-md">
                        <ThemeSelector />
                      </div>
                    </div>
                    
                    {/* Theme Preview */}
                    <div>
                      <h3 className={`text-lg font-medium mb-4 ${theme.textPrimary}`}>Theme Preview</h3>
                      <p className={`${theme.textSecondary} text-sm mb-3`}>
                        Click on any theme to apply it instantly.
                      </p>
                      <ThemePreview />
                    </div>

                    {/* Component Preview */}
                    <div>
                      <h3 className={`text-lg font-medium mb-4 ${theme.textPrimary}`}>Preview</h3>
                      <div className={`${theme.backgroundSecondary || theme.light} rounded-lg p-6 border ${theme.border} space-y-4 transition-colors duration-200`}>
                        <div className="flex flex-wrap gap-3">
                          <button className={`px-4 py-2 rounded-lg ${theme.primary} ${theme.primaryHover} text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md`}>
                            Primary Button
                          </button>
                          <button className={`px-4 py-2 rounded-lg ${theme.secondary} ${theme.secondaryHover} text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md`}>
                            Secondary Button
                          </button>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${theme.light} border ${theme.border} transition-colors duration-200`}>
                          <h4 className={`${theme.textPrimary} font-medium mb-2`}>Sample Card</h4>
                          <p className={`${theme.textSecondary} text-sm`}>
                            This shows how content looks with your current theme.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}