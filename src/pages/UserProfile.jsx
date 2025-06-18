import React, { useState } from 'react';
import { User, Settings, Clock, Grid, Heart, LogOut } from 'lucide-react';
import useThemeStore from '../store/themeStore'; // Import theme store

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('profile');

  // Theme store integration
  const { getTheme, isDarkMode } = useThemeStore();
  const theme = getTheme();

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
            <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Personal Profile</h2>
            <div className={`${theme.surface} shadow-md rounded-lg p-6 border ${theme.border} transition-colors duration-200`}>
              <div className="flex items-center space-x-6">
                <img 
                  src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Profile" 
                  className={`w-32 h-32 rounded-full border-4 ${theme.light.replace('bg-', 'border-')}`}
                />
                <div>
                  <h3 className={`text-xl font-semibold ${theme.textPrimary}`}>Emma Thompson</h3>
                  <p className={`${theme.textSecondary}`}>Software Engineer</p>
                  <p className={`text-sm ${theme.textMuted}`}>San Francisco, CA</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className={`text-lg font-semibold ${theme.text} mb-2`}>About Me</h4>
                <p className={`${theme.textSecondary}`}>
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
            <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Account Settings</h2>
            <div className={`${theme.surface} shadow-md rounded-lg p-6 border ${theme.border} transition-colors duration-200`}>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary}`}>Email</label>
                  <input 
                    type="email" 
                    className={`mt-1 block w-full px-3 py-2 border ${theme.border} rounded-md shadow-sm ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors duration-200`}
                    value="emma.thompson@example.com"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary}`}>Phone</label>
                  <input 
                    type="tel" 
                    className={`mt-1 block w-full px-3 py-2 border ${theme.border} rounded-md shadow-sm ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors duration-200`}
                    value="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary}`}>Location</label>
                  <input 
                    type="text" 
                    className={`mt-1 block w-full px-3 py-2 border ${theme.border} rounded-md shadow-sm ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors duration-200`}
                    value="San Francisco, CA"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary}`}>Job Title</label>
                  <input 
                    type="text" 
                    className={`mt-1 block w-full px-3 py-2 border ${theme.border} rounded-md shadow-sm ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:border-transparent transition-colors duration-200`}
                    value="Software Engineer"
                  />
                </div>
                <div className="pt-4">
                  <button 
                    className={`${theme.primary} ${theme.primaryHover} text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md`}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'activity':
        return (
          <div className="p-6">
            <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Recent Activity</h2>
            <div className={`${theme.surface} shadow-md rounded-lg p-6 border ${theme.border} transition-colors duration-200`}>
              <div className="space-y-4">
                <div className={`p-4 ${theme.light} rounded-lg border ${theme.border}`}>
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${theme.textPrimary}`}>Updated profile information</p>
                    <span className={`text-sm ${theme.textMuted}`}>2 hours ago</span>
                  </div>
                </div>
                <div className={`p-4 ${theme.light} rounded-lg border ${theme.border}`}>
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${theme.textPrimary}`}>Added new wardrobe item</p>
                    <span className={`text-sm ${theme.textMuted}`}>1 day ago</span>
                  </div>
                </div>
                <div className={`p-4 ${theme.light} rounded-lg border ${theme.border}`}>
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${theme.textPrimary}`}>Created new outfit</p>
                    <span className={`text-sm ${theme.textMuted}`}>3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`${theme.surface} shadow-md rounded-lg p-6 border ${theme.border} transition-colors duration-200`}>
                <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>Total Items</h3>
                <p className={`text-3xl font-bold ${theme.text}`}>42</p>
                <p className={`text-sm ${theme.textMuted}`}>In your wardrobe</p>
              </div>
              <div className={`${theme.surface} shadow-md rounded-lg p-6 border ${theme.border} transition-colors duration-200`}>
                <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>Outfits Created</h3>
                <p className={`text-3xl font-bold ${theme.text}`}>18</p>
                <p className={`text-sm ${theme.textMuted}`}>This month</p>
              </div>
              <div className={`${theme.surface} shadow-md rounded-lg p-6 border ${theme.border} transition-colors duration-200`}>
                <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>Favorites</h3>
                <p className={`text-3xl font-bold ${theme.text}`}>7</p>
                <p className={`text-sm ${theme.textMuted}`}>Most worn items</p>
              </div>
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className="p-6">
            <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Favorite Items</h2>
            <div className={`${theme.surface} shadow-md rounded-lg p-6 border ${theme.border} transition-colors duration-200`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className={`${theme.light} rounded-lg p-4 border ${theme.border} transition-colors duration-200`}>
                    <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-3"></div>
                    <h4 className={`font-medium ${theme.textPrimary}`}>Favorite Item #{item}</h4>
                    <p className={`text-sm ${theme.textSecondary}`}>Category name</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <p className={`${theme.textSecondary}`}>Select a section to view details</p>
          </div>
        );
    }
  };

  return (
    <div className={`flex min-h-screen ${theme.background} transition-colors duration-200`}>
      {/* Sidebar */}
      <div className={`w-64 ${theme.surface} shadow-md transition-colors duration-200`}>
        <div className={`p-6 text-center border-b ${theme.border}`}>
          <img 
            src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Profile" 
            className={`w-20 h-20 rounded-full mx-auto mb-3 border-4 ${theme.light.replace('bg-', 'border-')}`}
          />
          <h2 className={`text-xl font-bold ${theme.text}`}>Emma Thompson</h2>
          <p className={`${theme.textMuted} text-sm`}>Software Engineer</p>
        </div>
        <nav className="py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.section}
              onClick={() => setActiveSection(item.section)}
              className={`
                flex items-center w-full px-6 py-3 text-left transition-colors duration-200
                ${activeSection === item.section 
                  ? `${theme.light} ${theme.text} border-r-4 ${theme.primary.replace('bg-', 'border-')}` 
                  : `${theme.textSecondary} ${theme.surfaceHover}`}
              `}
            >
              {item.icon}
              <span className="ml-3 font-medium">{item.label}</span>
            </button>
          ))}
          <button
            className={`flex items-center w-full px-6 py-3 text-left text-red-600 hover:bg-red-50 ${isDarkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'} mt-4 transition-colors duration-200`}
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 ${theme.background} transition-colors duration-200`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserProfile;