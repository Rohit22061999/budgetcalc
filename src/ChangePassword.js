import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ChangePassword() {
    return (
        <div>
             <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="filled-basic" label="Enter current password" variant="filled" />
    </Box>
            
        </div>
    )
}
