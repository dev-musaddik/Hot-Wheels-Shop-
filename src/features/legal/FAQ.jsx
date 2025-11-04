import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

export const FAQ = () => {
  return (
    <Stack p={4} rowGap={2}>
      <Typography variant="h4">Frequently Asked Questions</Typography>
      <Accordion>
        <AccordionSummary expandIcon={<AddIcon />}>
          <Typography>What are the shipping options?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We offer standard and express shipping options. Shipping costs and delivery times vary depending on your location.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<AddIcon />}>
          <Typography>What is your return policy?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We accept returns within 30 days of purchase. The item must be unused and in its original packaging.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<AddIcon />}>
          <Typography>How can I track my order?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Once your order has shipped, you will receive an email with a tracking number.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};
