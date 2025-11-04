import React from 'react';
import { Navbar } from '../features/navigation/components/Navbar';
import { Footer } from '../features/footer/Footer';
import { FAQ } from '../features/legal/FAQ';

export const FAQPage = () => {
  return (
    <>
      <Navbar />
      <FAQ />
      <Footer />
    </>
  );
};
