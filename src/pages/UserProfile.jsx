import React, { useState } from 'react';
import { User, Settings, Clock, Grid, Heart, LogOut } from 'lucide-react';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sidebarItems = [
    { 
      icon: <User className="w-5 h-5" />, 
      label: 'Profile', 
      section: 'profile' 
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Settings', 
      section: 'settings' 
    },
    { 
      icon: <Clock className="w-5 h-5" />, 
      label: 'Activity', 
      section: 'activity' 
    },
    { 
      icon: <Grid className="w-5 h-5" />, 
      label: 'Dashboard', 
      section: 'dashboard' 
    },
    { 
      icon: <Heart className="w-5 h-5" />, 
      label: 'Favorites', 
      section: 'favorites' 
    }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Personal Profile</h2>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center space-x-6">
                <img 
                  src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-pink-200"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Emma Thompson</h3>
                  <p className="text-gray-600">Software Engineer</p>
                  <p className="text-sm text-gray-500">San Francisco, CA</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-pink-600 mb-2">About Me</h4>
                <p className="text-gray-700">
                  Passionate software engineer with a love for creating intuitive and 
                  elegant digital solutions. Specializing in React and modern web technologies.
                </p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Account Settings</h2>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    value="emma.thompson@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input 
                    type="tel" 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    value="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-6">Select a section to view details</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-pink-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 text-center border-b border-pink-100">
          <img 
            src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Profile" 
            className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-pink-200"
          />
          <h2 className="text-xl font-bold text-pink-600">Emma Thompson</h2>
          <p className="text-gray-500 text-sm">Software Engineer</p>
        </div>
        <nav className="py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.section}
              onClick={() => setActiveSection(item.section)}
              className={`
                flex items-center w-full px-6 py-3 text-left 
                ${activeSection === item.section 
                  ? 'bg-pink-100 text-pink-600' 
                  : 'text-gray-600 hover:bg-pink-50'}
                transition-colors duration-200
              `}
            >
              {item.icon}
              <span className="ml-3 font-medium">{item.label}</span>
            </button>
          ))}
          <button
            className="flex items-center w-full px-6 py-3 text-left text-red-600 hover:bg-red-50 mt-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-pink-50">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserProfile;