import React from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import OutfitLogo from './OutfitLogo';
import { useNavigate } from 'react-router-dom';

export default function QuickActionBtn() {
    const navigate = useNavigate() // call navigate from router dom
    const actions = [
      { icon: <CheckroomIcon />, name: 'Add Item', onclick: ()=>navigate('/wardrobe') }, // added on click actions for navigating
      { icon: <OutfitLogo />, name: 'Create Outfit', onclick: ()=>navigate('/outfits') }, // added on click actions for navigating
    ];

  return (
    <SpeedDial
    ariaLabel="SpeedDial basic example"
    sx={{ position: 'absolute', bottom: -10, right: 20, 
      "& .MuiFab-primary": { backgroundColor: "#fc64b6", "&:hover": { backgroundColor: "#e054a3" } },
      
    }}
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
