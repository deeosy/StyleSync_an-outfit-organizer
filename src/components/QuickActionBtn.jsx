import React from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import OutfitLogo from './OutfitLogo';
import { useNavigate } from 'react-router-dom';
import useWardrobeStore from '../store/wardrobeStore';
import useAuthenticationStore from '../store/userStore';
import useThemeStore from '../store/themeStore'; // Import theme store

// Helper function to convert Tailwind color classes to CSS color values
const getColorValue = (colorClass) => {
  const colorMap = {
    // Pink colors
    'bg-pink-400': '#f472b6',
    'bg-pink-500': '#ec4899',
    'hover:bg-pink-500': '#ec4899',
    'hover:bg-pink-600': '#db2777',
    // Blue colors
    'bg-blue-400': '#60a5fa',
    'bg-blue-500': '#3b82f6',
    'hover:bg-blue-500': '#3b82f6',
    'hover:bg-blue-600': '#2563eb',
    // Purple colors
    'bg-purple-400': '#c084fc',
    'bg-purple-500': '#a855f7',
    'hover:bg-purple-500': '#a855f7',
    'hover:bg-purple-600': '#9333ea',
    // Green colors
    'bg-green-400': '#4ade80',
    'bg-green-500': '#22c55e',
    'hover:bg-green-500': '#22c55e',
    'hover:bg-green-600': '#16a34a',
    // Orange colors
    'bg-orange-400': '#fb923c',
    'bg-orange-500': '#f97316',
    'hover:bg-orange-500': '#f97316',
    'hover:bg-orange-600': '#ea580c',
    // Teal colors
    'bg-teal-400': '#2dd4bf',
    'bg-teal-500': '#14b8a6',
    'hover:bg-teal-500': '#14b8a6',
    'hover:bg-teal-600': '#0d9488',
    // Red colors
    'bg-red-400': '#f87171',
    'bg-red-500': '#ef4444',
    'hover:bg-red-500': '#ef4444',
    'hover:bg-red-600': '#dc2626',
    // Gray colors
    'bg-gray-400': '#9ca3af',
    'bg-gray-500': '#6b7280',
    'hover:bg-gray-500': '#6b7280',
    'hover:bg-gray-600': '#4b5563',
  };
  
  return colorMap[colorClass] || '#3b82f6'; // Default to blue if not found
};

export default function QuickActionBtn() {
    const navigate = useNavigate()   // Hook for navigation
    const toggleAddForm = useWardrobeStore( state => state.toggleAddForm)   // Get toggleAddForm from store
    const { user, isAuthenticated } = useAuthenticationStore()    // Get user authentication state
    
    // Theme store integration
    const { getTheme, isDarkMode } = useThemeStore();
    const theme = getTheme();
    
    if(!isAuthenticated){   // If user is not authenticated, show a login prompt
      return <p className={`text-center mt-10 ${theme.textPrimary}`}>Please log in to access your wardrobe.</p>;
    }

    const actions = [
      { icon: <CheckroomIcon />, name: 'Add Item', onclick: ()=> { navigate('/wardrobe'); toggleAddForm(true) }}, // added on click actions for navigating and toggle function to open form after navigating
      { icon: <OutfitLogo />, name: 'Create Outfit', onclick: ()=>navigate('/outfits') }, // added on click actions for navigating
    ];

    // Get theme colors for the SpeedDial
    const primaryColor = getColorValue(theme.primary);
    const primaryHoverColor = getColorValue(theme.primaryHover);

  return (
    <SpeedDial  // SpeedDial component for quick actions
    ariaLabel="SpeedDial basic example"
    sx={{ 
      position: 'absolute', 
      bottom: -10, 
      right: 20, 
      "& .MuiFab-primary": { 
        backgroundColor: primaryColor,
        color: '#ffffff',
        "&:hover": { 
          backgroundColor: primaryHoverColor,
        },
        transition: 'all 0.2s ease-in-out',
        boxShadow: `0 4px 12px ${primaryColor}40`, // Add subtle shadow with theme color
      },
      "& .MuiSpeedDialAction-fab": {
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
        color: isDarkMode ? '#ffffff' : '#374151',
        backdropFilter: 'blur(10px)',
        border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        "&:hover": {
          backgroundColor: primaryColor,
          color: '#ffffff',
          transform: 'scale(1.05)',
        },
        transition: 'all 0.2s ease-in-out',
      },
      "& .MuiSpeedDialAction-staticTooltipLabel": {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
        color: isDarkMode ? '#ffffff' : '#374151',
        backdropFilter: 'blur(10px)',
        border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        fontSize: '0.75rem',
        fontWeight: '500',
      }
    }}
    className='!z-10'
    icon={<SpeedDialIcon />}
  >
        {actions.map((action) => (
        <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onclick} //attach onclick handler to button
        />
    ))}       
  </SpeedDial>
  )
}