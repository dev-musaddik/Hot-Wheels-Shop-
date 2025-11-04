import { Stack, Typography } from '@mui/material';
import React from 'react';

export const TermsOfUse = () => {
  return (
    <Stack p={4} rowGap={2}>
      <Typography variant="h4">Terms of Use</Typography>
      <Typography>
        By accessing the website at Hot Wheels Shop, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
      </Typography>
      <Typography variant="h5">Use License</Typography>
      <Typography>
        Permission is granted to temporarily download one copy of the materials (information or software) on Hot Wheels Shop's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on Hot Wheels Shop's website.
      </Typography>
    </Stack>
  );
};
