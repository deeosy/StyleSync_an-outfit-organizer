// Import React library for building the component
import React from 'react';

// Import Link and useLocation from react-router-dom for navigation and route tracking
import { Link, useLocation } from 'react-router-dom';

// Import the Zustand store for authentication state management
import useAuthenticationStore from '../store/userStore';

// Import the Sidebar component for mobile navigation
import Sidebar from './Sidebar';

// Define the Navbar component
export default function Navbar() {
  // Access user and authentication state from the Zustand store
  const { user, isAuthenticated } = useAuthenticationStore();

  // Get the current route using useLocation hook from react-router-dom
  const location = useLocation();

  // Define paths where the Sign In button should be hidden
  const hiddenSignInPaths = [
    '/authentication',
    '/authentication/sign-in',
    '/authentication/sign-up-details',
    '/authentication/sign-up-language',
    '/authentication/sign-up-reason',
  ];

  // Check if Sign In button should be hidden based on the current path
  const shouldHideSignIn = hiddenSignInPaths.includes(location.pathname);

  // Define the underline style based on user gender, with dynamic width for active state
  const getUnderlineStyle = (isMale, isActive, customWidth) => {
    const baseStyle = `absolute -bottom-2 h-1.5 transition-all duration-300 ease-in-out ${
      isMale ? 'bg-blue-200' : 'bg-pink-500'
    }`;
    // If the link is active, set the width based on the customWidth or full width
    const widthStyle = isActive ? (customWidth ? customWidth : 'w-full') : 'w-0';
    return `${baseStyle} ${widthStyle}`;
  };

  return (
    // Navigation bar with background color and font styling
    <nav className="bg-[#f5f5f5] text-black manrope">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center gap-5 lg:gap-20 xl:gap-[174px] md:text-[24px] w-full py-[20px]">
          {/* Logo section with link to homepage */}
          <div className="bagel text-black text-[42px]">
            <Link to="/">StyleSync</Link>
          </div>
          {
            // Show links or hide links based on authentication status of user
            isAuthenticated ? (
              <>
                {/* Mobile view: Show Sidebar component */}
                <div className="sm:hidden relative">
                  <Sidebar />
                </div>
                {/* Desktop view: Show navigation links */}
                <div className="hidden sm:flex items-center text-[12px] md:text-[20px] py-4 text-[#212529] manrope">
                  <ul className="flex">
                    {/* Dashboard link */}
                    <li>
                      <Link
                        to="/dashboard"
                        className="px-3 py-2 relative transition-all duration-300 ease-in-out"
                      >
                        <span className="relative border-r-2 px-3 border-gray-400">
                          Dashboard
                          {/* Use getUnderlineStyle with active state and custom width */}
                          <span
                            className={`${getUnderlineStyle(user?.gender === 'male', location.pathname === '/dashboard',
                              'w-[72%] md:w-[80%]' )} left-3
                            `}
                          ></span>
                        </span>
                      </Link>
                    </li>
                    {/* Wardrobe link */}
                    <li>
                      <Link
                        to="/wardrobe"
                        className="py-2 relative transition-all duration-300 ease-in-out"
                      >
                        <span className="relative">
                          Wardrobe
                          {/* Use getUnderlineStyle with active state */}
                          <span
                            className={`${getUnderlineStyle( user?.gender === 'male', location.pathname === '/wardrobe')} left-0
                          `}
                          ></span>
                        </span>
                      </Link>
                    </li>
                    {/* Outfit Builder link */}
                    <li>
                      <Link
                        to="/outfits"
                        className="px-3 py-2 relative transition-all duration-300 ease-in-out"
                      >
                        <span className="relative border-x-2 px-3 border-gray-400">
                          Outfit Builder
                          {/* Use getUnderlineStyle with active state and custom width */}
                          <span
                            className={`${getUnderlineStyle( user?.gender === 'male', location.pathname === '/outfits',
                              'w-[78%] md:w-[85%]')} left-3
                          `}
                          ></span>
                        </span>
                      </Link>
                    </li>
                    {/* Account link */}
                    <li>
                      <Link
                        to="/account"
                        className="py-2 relative transition-all duration-300 ease-in-out"
                      >
                        <span className="relative">
                          Account
                          {/* Use getUnderlineStyle with active state, compare the current route to the provided path */}
                          <span
                            className={`${getUnderlineStyle( user?.gender === 'male', location.pathname === '/account' )} 
                              left-0
                          `}
                          ></span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              // If user is not authenticated, show Sign In button unless on hidden paths
              !shouldHideSignIn && (
                <Link to="/authentication/sign-in">
                  <button className="text-white rounded-[3px] bg-pink-400 manrope px-4 py-3 md:px-10 md:py-4 hover:bg-pink-500 hover:cursor-pointer transition-colors">
                    Sign In
                  </button>
                </Link>
              )
            )
          }
        </div>
      </div>
    </nav>
  );
}