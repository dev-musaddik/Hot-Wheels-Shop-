import React from 'react';
import { Navbar } from '../features/navigation/components/Navbar';
import { AddBrandAndCategory } from '../features/admin/components/AddBrandAndCategory';

export const AddBrandAndCategoryPage = () => {
    return (
        <>
            <Navbar />
            <AddBrandAndCategory />
        </>
    );
};