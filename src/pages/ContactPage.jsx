import React from 'react';
import { Navbar } from '../features/navigation/components/Navbar';
import { Footer } from '../features/footer/Footer';
import { Contact } from '../features/legal/Contact';

export const ContactPage = () => {
  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
};
