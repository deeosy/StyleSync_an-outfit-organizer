import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import dP from '../images/default-profile-pic.png'

export default function DisplayImage() {
  return (
    <Stack >
      <Avatar
        alt="display image"
        src={dP}
        sx={{ width: 60, height: 60, position:'relative'}}
        className='md:!h-[80px] md:!w-[80px] xl:!h-[100px] xl:!w-[100px]'
      />
    </Stack>
  );
}