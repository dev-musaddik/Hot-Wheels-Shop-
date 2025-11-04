import React from 'react';
import { Navbar } from '../features/navigation/components/Navbar';
import { AdminBrandCategory } from '../features/admin/components/AdminBrandCategory';

export const AdminBrandCategoryPage = () => {
    return (
        <>
            <Navbar />
            <AdminBrandCategory />
        </>
    );
};