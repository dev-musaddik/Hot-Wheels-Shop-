import React from 'react';
import { Navbar } from '../features/navigation/components/Navbar';
import { Footer } from '../features/footer/Footer';
import { TermsOfUse } from '../features/legal/TermsOfUse';

export const TermsOfUsePage = () => {
  return (
    <>
      <Navbar />
      <TermsOfUse />
      <Footer />
    </>
  );
};
