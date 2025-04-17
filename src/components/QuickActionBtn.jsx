import React from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import OutfitLogo from './OutfitLogo';
import { useNavigate } from 'react-router-dom';
import useWardrobeStore from '../store/wardrobeStore';
import useAuthenticationStore from '../store/userStore';

export default function QuickActionBtn() {
    const navigate = useNavigate()   // Hook for navigation
    const toggleAddForm = useWardrobeStore( state => state.toggleAddForm)   // Get toggleAddForm from store
    const { user, isAuthenticated } = useAuthenticationStore()    // Get user authentication state
    
    if(!isAuthenticated){   // If user is not authenticated, show a login prompt
      return <p className="text-center mt-10">Please log in to access your wardrobe.</p>;
    }

    const actions = [
      { icon: <CheckroomIcon />, name: 'Add Item', onclick: ()=> { navigate('/wardrobe'); toggleAddForm(true) }}, // added on click actions for navigating and toggle function to open form after navigating
      { icon: <OutfitLogo />, name: 'Create Outfit', onclick: ()=>navigate('/outfits') }, // added on click actions for navigating
    ];

  return (
    <SpeedDial  // SpeedDial component for quick actions
    ariaLabel="SpeedDial basic example"
    sx={{ position: 'absolute', bottom: -10, right: 20, 
      "& .MuiFab-primary": { 
        backgroundColor: `${user?.gender === 'male' ? '#bedbff' : '#fc64b6'}`,
        "&:hover": { backgroundColor: `${user?.gender === 'male' ? '#8ec5ff' : '#e054a3'}`},
      },      
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
