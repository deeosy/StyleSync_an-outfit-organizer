import React, { useState } from 'react';  // Import React and useState hook for managing component state
import { Menu, X, Home, Shirt, Palette, UserCircle2 } from 'lucide-react';   // Import icons from lucide-react for navigation links
import useAuthenticationStore from '../store/userStore';  // Import Zustand store for authentication state management
import { Link, useNavigate, useLocation } from 'react-router-dom';  // Import routing utilities from react-router-dom
import { auth } from '../config/firebase';   // Import Firebase auth instance
import useAuthHandler from '../hooks/useAuthHandler';   // Import custom hook for handling authentication actions

const Sidebar = () => {
  const { user, logout, isAuthenticated } = useAuthenticationStore();   // Access user, authentication status, and logout function from the Zustand store
  const [isOpen, setIsOpen] = useState(false);  // State to manage the sidebar's open/closed status
  const navigate = useNavigate();  // Hook to programmatically navigate to different routes
  const location = useLocation();   // Hook to get the current route location
  const { loading, error, handleAuthAction } = useAuthHandler();   // Access loading state, error state, and auth action handler from the custom hook

  // Define paths where sidebar should not be displayed
  const hiddenPaths = [
    '/authentication',
    '/authentication/sign-in',
    '/authentication/sign-up-details',
    '/authentication/sign-up-language',
    '/authentication/sign-up-reason',
  ];

  // Check if sidebar should be hidden
  const shouldHideSidebar = () => {
    if (location.pathname === '/' && !isAuthenticated) {  // Hide menu on the homepage if the user is not authenticated
      return true;
    }
    return hiddenPaths.includes(location.pathname);   // Hide on authentication-related paths
  };

  if (shouldHideSidebar()) { // If the sidebar should be hidden, return null to render nothing
    return null;
  }

  const toggleSidebar = () => {  // Function to toggle the sidebar open/closed status
    setIsOpen(!isOpen);
  };

  const sidebarLinks = [  // Define the sidebar navigation links with their respective icons
    { to: '/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5 mr-3" /> },
    { to: '/wardrobe', label: 'Wardrobe', icon: <Shirt className="w-5 h-5 mr-3" /> },
    { to: '/outfits', label: 'Outfit Builder', icon: <Palette className="w-5 h-5 mr-3" /> },
    { to: '/account', label: 'Account', icon: <UserCircle2 className="w-5 h-5 mr-3" /> },
  ];

  const handleSignOut = () =>  // Function to handle sign-out action
    handleAuthAction(async () => {
      if (window.confirm('Are you sure you want to sign out?')) {  // Confirm with the user before signing out
        await auth.signOut(); // Fully sign out from Firebase
        logout(); // Clear Zustand store
        navigate('/authentication/sign-in'); // Redirect to sign-in page
        setIsOpen(false); // Close sidebar on mobile
      }
    }, { default: 'Failed to sign out' });  // Default error message if sign-out fails

    const isMale = user?.gender === 'male'
  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`sm:hidden relative z-50 text-white p-2 rounded-full shadow-lg hover:cursor-pointer ${
          isMale ? 'bg-blue-200 hover:bg-blue-300' : 'bg-pink-400 hover:bg-pink-600'
        }`}
        disabled={loading}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}   // Accessibility attributes for better screen reader support
        aria-expanded={isOpen}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } sm:translate-x-0 sm:relative sm:block`}
      >
        <div className="p-6 relative h-full">
          {/* Sidebar Header */}
          <h2 className="text-2xl font-bold mb-8 text-gray-900">StyleSync</h2>

          {/* Navigation Links */}
          <nav>
            <ul className="space-y-2">
              {sidebarLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={toggleSidebar}
                    className={`flex items-center p-3 rounded-lg transition-colors group ${isMale ? 'hover:bg-blue-50' : 'hover:bg-pink-50' } `}
                    
                    aria-current={location.pathname === link.to ? 'page' : undefined}  // Accessibility attribute for better navigation
                  >
                    {link.icon}
                    <span
                      className={`text-gray-700 transition-colors ${
                        isMale ? 'group-hover:text-blue-500' : 'group-hover:text-pink-500'
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
            {/* Display error message if sign-out fails */}
            {error && <div className="mb-2 text-red-500 text-sm">{error}</div>}
            <button
              onClick={handleSignOut}
              disabled={loading}
              className={`w-full py-2 text-white rounded-lg transition-colors hover:cursor-pointer ${
                isMale ? 'bg-blue-200 hover:bg-blue-300' : 'bg-pink-400 hover:bg-pink-600'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}  
              aria-label="Sign out"
            >
              {loading ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;  // Export the Sidebar component as the default export