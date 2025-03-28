import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthenticationStore from '../store/userStore';
import Sidebar from './Sidebar';

export default function Navbar() {
  const { user, isAuthenticated } = useAuthenticationStore();
  const location = useLocation(); // Get current route

  // Define paths where the Sign In button should be hidden
  const hiddenSignInPaths = [
    '/authentication',
    '/authentication/sign-in',
    '/authentication/sign-up-details',
    '/authentication/sign-up-language',
    '/authentication/sign-up-reason',
  ];

  // Check if Sign In button should be hidden
  const shouldHideSignIn = hiddenSignInPaths.includes(location.pathname);

  return (
    <nav className="bg-[#f5f5f5] text-black manrope">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center gap-5 lg:gap-20 xl:gap-[174px] md:text-[24px] w-full py-[20px]">
          <div className="bagel text-black text-[42px]">
            <Link to="/">StyleSync</Link>
          </div>
          {
            // Show links only if the user is logged in
            isAuthenticated ? (
              <>
                <div className="sm:hidden relative">
                  <Sidebar />
                </div>
                <div className="hidden sm:flex items-center text-[12px] md:text-[20px] py-4 text-[#212529] manrope">
                  <ul className="flex">
                    <li>
                      <Link
                        to="/dashboard"
                        className="px-3 py-2 relative group transition-all duration-300 ease-in-out"
                      >
                        <span className="relative border-r-2 px-3 py-1">
                          Dashboard
                          <span
                            className={`absolute bottom-0 left-3 w-0 h-0.5 ${
                              user?.gender === 'male' ? 'bg-blue-200' : 'bg-pink-500'
                            } group-hover:w-[80%] transition-all duration-300 ease-in-out`}
                          ></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/wardrobe"
                        className="px py-2 relative group transition-all duration-300 ease-in-out"
                      >
                        <span className="relative py-1">
                          Wardrobe
                          <span
                            className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                              user?.gender === 'male' ? 'bg-blue-200' : 'bg-pink-500'
                            } group-hover:w-full transition-all duration-300 ease-in-out`}
                          ></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/outfits"
                        className="px-3 py-2 relative group transition-all duration-300 ease-in-out"
                      >
                        <span className="relative border-x-2 px-3 py-1">
                          Outfit Builder
                          <span
                            className={`absolute bottom-0 left-3 w-0 h-0.5 ${
                              user?.gender === 'male' ? 'bg-blue-200' : 'bg-pink-500'
                            } group-hover:w-[78%] md:group-hover:w-[85%] transition-all duration-300 ease-in-out`}
                          ></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/account"
                        className="py-2 relative group transition-all duration-300 ease-in-out"
                      >
                        <span className="relative py-1">
                          Account
                          <span
                            className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                              user?.gender === 'male' ? 'bg-blue-200' : 'bg-pink-500'
                            } group-hover:w-full transition-all duration-300 ease-in-out`}
                          ></span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              // Show Sign In button only if not on hidden paths
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