import React from 'react';
import { Navbar } from '../features/navigation/components/Navbar';
import { Footer } from '../features/footer/Footer';
import { PrivacyPolicy } from '../features/legal/PrivacyPolicy';

export const PrivacyPolicyPage = () => {
  return (
    <>
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </>
  );
};
