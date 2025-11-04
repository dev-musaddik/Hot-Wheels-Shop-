import { Stack, Typography } from '@mui/material';
import React from 'react';

export const PrivacyPolicy = () => {
  return (
    <Stack p={4} rowGap={2}>
      <Typography variant="h4">Privacy Policy</Typography>
      <Typography>
        Your privacy is important to us. It is Hot Wheels Shop's policy to respect your privacy regarding any information we may collect from you across our website.
      </Typography>
      <Typography variant="h5">Information We Collect</Typography>
      <Typography>
        Log data: When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.
      </Typography>
      <Typography>
        Device data: We may also collect data about the device you’re using to access our website. This data may include the device type, operating system, unique device identifiers, device settings, and geo-location data.
      </Typography>
      <Typography>
        Personal information: We may ask for personal information, such as your name, email, social media profiles, phone/mobile number, home/mailing address, and payment information.
      </Typography>
    </Stack>
  );
};
