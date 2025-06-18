import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthenticationStore from '../store/userStore';
import useThemeStore from '../store/themeStore';
import Sidebar from './Sidebar';

export default function Navbar() {
  const { user, isAuthenticated } = useAuthenticationStore();
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const location = useLocation();

  // Define paths where the Sign In button should be hidden
  const hiddenSignInPaths = [
    '/authentication',
    '/authentication/sign-in',
    '/authentication/sign-up-details',
    '/authentication/sign-up-language',
    '/authentication/sign-up-reason',
  ];

  const shouldHideSignIn = hiddenSignInPaths.includes(location.pathname);

  // Updated underline style using theme colors instead of gender-based colors
  const getUnderlineStyle = (isActive, customWidth) => {
    const baseStyle = `absolute -bottom-2 h-1.5 transition-all duration-300 ease-in-out ${theme.primary}`;
    const widthStyle = isActive ? (customWidth ? customWidth : 'w-full') : 'w-0';
    return `${baseStyle} ${widthStyle}`;
  };

  return (
    <nav className={`${theme.surface} ${theme.textPrimary} manrope border-b ${theme.border}`}>
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center gap-5 lg:gap-20 xl:gap-[174px] md:text-[24px] w-full py-[20px]">
          {/* Logo section with themed colors */}
          <div className={`bagel ${theme.textPrimary} text-[42px] hover:${theme.text} transition-colors`}>
            <Link to="/">StyleSync</Link>
          </div>
          
          {isAuthenticated ? (
            <>
              {/* Mobile view: Show Sidebar component */}
              <div className="sm:hidden relative">
                <Sidebar />
              </div>
              
              {/* Desktop view: Show navigation links with theme colors */}
              <div className={`hidden sm:flex items-center text-[12px] md:text-[20px] py-4 ${theme.textSecondary} manrope`}>
                <ul className="flex">
                  {/* Dashboard link */}
                  <li>
                    <Link
                      to="/dashboard"
                      className={`px-3 py-2 relative transition-all duration-300 ease-in-out hover:${theme.textPrimary}`}
                    >
                      <span className={`relative border-r-2 px-3 ${theme.border}`}>
                        Dashboard
                        <span
                          className={`${getUnderlineStyle(
                            location.pathname === '/dashboard',
                            'w-[72%] md:w-[80%]'
                          )} left-3`}
                        ></span>
                      </span>
                    </Link>
                  </li>
                  
                  {/* Wardrobe link */}
                  <li>
                    <Link
                      to="/wardrobe"
                      className={`py-2 relative transition-all duration-300 ease-in-out hover:${theme.textPrimary}`}
                    >
                      <span className="relative">
                        Wardrobe
                        <span
                          className={`${getUnderlineStyle(location.pathname === '/wardrobe')} left-0`}
                        ></span>
                      </span>
                    </Link>
                  </li>
                  
                  {/* Outfit Builder link */}
                  <li>
                    <Link
                      to="/outfits"
                      className={`px-3 py-2 relative transition-all duration-300 ease-in-out hover:${theme.textPrimary}`}
                    >
                      <span className={`relative border-x-2 px-3 ${theme.border}`}>
                        Outfit Builder
                        <span
                          className={`${getUnderlineStyle(
                            location.pathname === '/outfits',
                            'w-[78%] md:w-[85%]'
                          )} left-3`}
                        ></span>
                      </span>
                    </Link>
                  </li>
                  
                  {/* Account link */}
                  <li>
                    <Link
                      to="/account"
                      className={`py-2 relative transition-all duration-300 ease-in-out hover:${theme.textPrimary}`}
                    >
                      <span className="relative">
                        Account
                        <span
                          className={`${getUnderlineStyle(location.pathname === '/account')} left-0`}
                        ></span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            // Sign In button with theme colors instead of hardcoded pink
            !shouldHideSignIn && (
              <Link to="/authentication/sign-in">
                <button className={`text-white rounded-[3px] ${theme.primary} ${theme.primaryHover} manrope px-4 py-3 md:px-10 md:py-4 hover:cursor-pointer transition-colors focus:outline-none focus:ring-2 ${theme.ring}`}>
                  Sign In
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}