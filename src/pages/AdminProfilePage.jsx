import React from 'react';
import { AdminProfile } from '../features/admin/components/AdminProfile';
import { Navbar } from '../features/navigation/components/Navbar';

export const AdminProfilePage = () => {
  return (
    <>
      <Navbar />
      <AdminProfile />
    </>
  );
};
