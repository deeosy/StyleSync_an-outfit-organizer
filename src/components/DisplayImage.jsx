import * as React from 'react'; // Import React library for building the component

// Import Material-UI components for the Avatar and layout
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import defaultDP from '../images/default-profile-pic.png'  // Import the default profile picture
import useAuthenticationStore from '../store/userStore'   // Import the Zustand store for authentication state management

export default function DisplayImage() {
 const { user } = useAuthenticationStore()  // Access the user object from the authentication store

 // Define a descriptive alt text using the user's username
 const avatarAltText = user?.username ? `${user.username}'s profile picture` : 'Default profile picture';
  return (
    <Stack >
      <Avatar
        alt={avatarAltText}  // Use the descriptive alt text
        src={user?.photoURL || defaultDP}  // Use the user's photo if available, otherwise use default image
        sx={{ width: 60, height: 60, position:'relative'}}   // Set the width and height of the Avatar using sx prop
        className='md:!h-[80px] md:!w-[80px] xl:!h-[100px] xl:!w-[100px]'
      />
    </Stack>
  );
}