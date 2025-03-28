import React, { useState } from 'react';
import { Menu, X, Home, Shirt, Palette, UserCircle2 } from 'lucide-react';
import useAuthenticationStore from '../store/userStore';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { user, logout } = useAuthenticationStore() 
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const sidebarLinks = [
        { 
            to: '/dashboard', 
            label: 'Dashboard', 
            icon: <Home className="w-5 h-5 mr-3" /> 
        },
        { 
            to: '/wardrobe', 
            label: 'Wardrobe', 
            icon: <Shirt className="w-5 h-5 mr-3" /> 
        },
        { 
            to: '/outfits', 
            label: 'Outfit Builder', 
            icon: <Palette className="w-5 h-5 mr-3" /> 
        },
        { 
            to: '/account', 
            label: 'Account', 
            icon: <UserCircle2 className="w-5 h-5 mr-3" /> 
        },
    ];

    return (
      <>
        {/* Mobile Menu Toggle Button */}
        <button onClick={toggleSidebar}
          className={`sm:hidden relative  z-50 ${user?.gender === "male" ? "bg-blue-200" : "bg-pink-400" } text-white p-2 rounded-full shadow-lg`}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Sidebar */}
        <div 
          className={` fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'} sm:translate-x-0 sm:relative sm:block`}
        >
          <div className="p-6 relative h-full">
            {/* Sidebar Header */}
            <h2 className="text-2xl font-bold mb-8 text-gray-900">StyleSync</h2>

            {/* Navigation Links */}
            <nav>
              <ul className="space-y-2">
                {sidebarLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} onClick={toggleSidebar}
                      className=" flex items-center p-3 rounded-lg hover:bg-pink-50 transition-colors group"
                    >
                      {link.icon}
                      <span className={`text-gray-700 transition-colors ${user?.gender === "male" ? "group-hover:text-blue-500" : "group-hover:text-pink-500" }`}>
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
              <button 
                onClick={()=> {logout(); navigate('/')}}
                className={`
                  w-full py-2  ${user?.gender === "male" ? "bg-blue-200" : "bg-pink-400" }
                  ${user?.gender === "male" ? "hover:bg-blue-300" : "hover:bg-pink-600" } 
                  text-white  rounded-lg  transition-colors`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
            onClick={toggleSidebar}
          />
        )}
      </>
    );
};

export default Sidebar;