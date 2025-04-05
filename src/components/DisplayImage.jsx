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
        alt={avatarAltText}
        src={user?.photoURL || defaultDP}
        sx={{ width: 60, height: 60, position:'relative'}}
        className='md:!h-[80px] md:!w-[80px] xl:!h-[100px] xl:!w-[100px]'
      />
    </Stack>
  );
}