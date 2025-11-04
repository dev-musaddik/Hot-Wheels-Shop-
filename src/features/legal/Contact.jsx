import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

export const Contact = () => {
  return (
    <Stack p={4} rowGap={2} alignItems="center">
      <Typography variant="h4">Contact Us</Typography>
      <Stack component="form" rowGap={2} width={{ xs: '100%', sm: '80%', md: '60%' }}>
        <TextField label="Your Name" variant="outlined" />
        <TextField label="Your Email" variant="outlined" />
        <TextField label="Message" multiline rows={4} variant="outlined" />
        <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Send Message</Button>
      </Stack>
    </Stack>
  );
};
