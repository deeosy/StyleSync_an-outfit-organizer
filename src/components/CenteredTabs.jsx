import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// Import custom hooks
import useWardrobeStore from "../store/wardrobeStore";
import useAuthenticationStore from '../store/userStore';
import useThemeStore from '../store/themeStore'; // Import theme store

import QuickActionBtn from './QuickActionBtn';
import { Plus, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Helper function to convert Tailwind color classes to CSS color values
const getColorValue = (colorClass, isDark = false) => {
  const colorMap = {
    // Pink colors
    'bg-pink-400': '#f472b6',
    'bg-pink-500': '#ec4899',
    'text-pink-400': '#f472b6',
    'text-pink-600': '#db2777',
    // Blue colors
    'bg-blue-400': '#60a5fa',
    'bg-blue-500': '#3b82f6',
    'text-blue-400': '#60a5fa',
    'text-blue-600': '#2563eb',
    // Purple colors
    'bg-purple-400': '#c084fc',
    'bg-purple-500': '#a855f7',
    'text-purple-400': '#c084fc',
    'text-purple-600': '#9333ea',
    // Green colors
    'bg-green-400': '#4ade80',
    'bg-green-500': '#22c55e',
    'text-green-400': '#4ade80',
    'text-green-600': '#16a34a',
    // Orange colors
    'bg-orange-400': '#fb923c',
    'bg-orange-500': '#f97316',
    'text-orange-400': '#fb923c',
    'text-orange-600': '#ea580c',
    // Teal colors
    'bg-teal-400': '#2dd4bf',
    'bg-teal-500': '#14b8a6',
    'text-teal-400': '#2dd4bf',
    'text-teal-600': '#0d9488',
    // Red colors
    'bg-red-400': '#f87171',
    'bg-red-500': '#ef4444',
    'text-red-400': '#f87171',
    'text-red-600': '#dc2626',
    // Gray colors
    'bg-gray-400': '#9ca3af',
    'bg-gray-500': '#6b7280',
    'text-gray-400': '#9ca3af',
    'text-gray-600': '#4b5563',
    'text-gray-300': '#d1d5db',
    'text-gray-900': '#111827',
    'text-white': '#ffffff'
  };
  
  return colorMap[colorClass] || (isDark ? '#ffffff' : '#111827');
};

export default function CenteredTabs() {
  const [value, setValue] = React.useState('1');

  // Wardrobe and auth stores
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const savedOutfits = useWardrobeStore((state) => state.savedOutfits);
  const toggleAddForm = useWardrobeStore(state => state.toggleAddForm);
  const { user, isAuthenticated } = useAuthenticationStore();
  
  // Theme store
  const { getTheme, isDarkMode } = useThemeStore();
  const theme = getTheme();
  
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <p className={`text-center mt-10 ${theme.textPrimary}`}>
        Please log in to access your wardrobe.
      </p>
    );
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddItem = () => {
    navigate('/wardrobe');
    toggleAddForm(true);
  };

  const handleCreateOutfit = () => {
    navigate('/outfits');
  };

  const categoryCounts = wardrobeItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const unusedItems = wardrobeItems.filter((item) => item.lastWorn === "Never");

  // Use theme colors instead of hardcoded gender-based colors
  const buttonClasses = `${theme.primary} ${theme.primaryHover} text-white`;

  // Enhanced MUI theme styling with proper color integration
  const muiTabStyles = {
    "& .MuiTabs-root": {
      minHeight: '48px',
    },
    "& .MuiTab-root": {
      color: getColorValue(theme.textSecondary, isDarkMode),
      fontSize: '0.875rem',
      fontWeight: '500',
      textTransform: 'none',
      minHeight: '48px',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        color: getColorValue(theme.textPrimary, isDarkMode),
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
      }
    },
    "& .Mui-selected": { 
      color: `${getColorValue(theme.primary, isDarkMode)} !important`,
      fontWeight: '600',
      '&:hover': {
        color: `${getColorValue(theme.primary, isDarkMode)} !important`,
      }
    },
    "& .MuiTabs-indicator": { 
      backgroundColor: getColorValue(theme.primary, isDarkMode),
      height: '3px',
      borderRadius: '2px',
      transition: 'all 0.2s ease-in-out',
    },
    "& .MuiTabs-flexContainer": {
      gap: '8px'
    }
  };

  return (
    <div className={`w-full ${theme.background} transition-colors duration-200`}>
      <Box sx={{ width: '100%', typography: 'body1' }} className='mx-auto !max-w-[1200px]'>
        <TabContext value={value}>
          <Box className={`${theme.surface} rounded-t-lg shadow-sm border-b ${theme.border}`}>
            <TabList  
              centered 
              onChange={handleChange} 
              aria-label="wardrobe tabs"
              sx={muiTabStyles}
            >
              <Tab label="Wardrobe Stats" value="1" />
              <Tab label="Unworn Items" value="2" />
              <Tab label="Quick Actions" value="3" />
            </TabList>
          </Box>
          
          {/* Wardrobe Stats Tab */}
          <TabPanel value="1" sx={{ padding: '16px 0px', position: 'relative' }}>
            <QuickActionBtn />
            <div className="h-[300px] drop-shadow-xl">
              <div className={`${theme.surface} rounded-[5px] shadow-sm border ${theme.border} p-8 h-full overflow-scroll no-scrollbar transition-colors duration-200`}>
                <div className="space-y-3 md:space-y-4">
                  <p className={`text-sm md:text-md ${theme.textSecondary}`}>
                    Total Items:{" "}
                    <span className={`font-medium md:text-md ${theme.textPrimary}`}>
                      {wardrobeItems.length}
                    </span>
                  </p>
                  <p className={`text-sm md:text-md ${theme.textSecondary}`}>
                    Saved Outfits:{" "}
                    <span className={`font-medium md:text-md ${theme.textPrimary}`}>
                      {savedOutfits.length}
                    </span>
                  </p>
                  {Object.entries(categoryCounts).map(([category, count]) => (
                    <p key={category} className={`text-sm md:text-md ${theme.textSecondary}`}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}:{" "}
                      <span className={`font-medium md:text-md ${theme.textPrimary}`}>{count}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </TabPanel>
          
          {/* Unworn Items Tab */}
          <TabPanel value="2" sx={{ padding: '16px 0px', position: 'relative' }}>
            <QuickActionBtn />
            <div className="h-[300px] drop-shadow-xl">
              <div className={`${theme.surface} rounded-lg shadow-sm border ${theme.border} p-8 h-full no-scrollbar overflow-scroll transition-colors duration-200`}>
                {wardrobeItems.length < 1 ? (
                  <p className={`text-sm ${theme.textSecondary}`}>
                    Currently no clothes in your wardrobe
                  </p>
                ) : unusedItems.length > 0 ? (
                  <ul className="space-y-3">
                    {unusedItems.slice(0, 5).map((item) => (
                      <li key={item.id} className={`text-sm flex items-center ${theme.textPrimary}`}>
                        <span
                          className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        {item.name}
                      </li>
                    ))}
                    {unusedItems.length > 5 && (
                      <li className={`text-sm ${theme.textSecondary}`}>
                        And {unusedItems.length - 5} more...
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className={`text-center py-8`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${theme.light} rounded-full mb-4`}>
                      <span className="text-2xl">🎉</span>
                    </div>
                    <p className={`text-sm ${theme.textPrimary} font-medium`}>
                      Great job! You've worn all your items.
                    </p>
                    <p className={`text-xs ${theme.textSecondary} mt-1`}>
                      Keep building your stylish wardrobe!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
          
          {/* Quick Actions Tab */}
          <TabPanel value="3" sx={{ padding: '16px 0px', position: 'relative' }}>
            <QuickActionBtn />
            <div className="h-[300px] drop-shadow-xl">
              <div className={`${theme.surface} rounded-lg shadow-sm border ${theme.border} p-8 h-full transition-colors duration-200`}>
                <h2 className={`text-lg font-semibold mb-6 manrope ${theme.textPrimary}`}>
                  Quick Actions
                </h2>
                
                <div className="flex flex-col gap-4">
                  <button 
                    className={`flex items-center justify-center w-full py-4 px-6 ${buttonClasses} font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md`}
                    onClick={handleAddItem}
                  >
                    <Plus size={20} className="mr-3" />
                    Add New Item
                  </button>
                  
                  <button 
                    className={`flex items-center justify-center w-full py-4 px-6 ${theme.secondary} ${theme.secondaryHover} text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md`}
                    onClick={handleCreateOutfit}
                  >
                    <Layers size={20} className="mr-3" />
                    Create Outfit
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}