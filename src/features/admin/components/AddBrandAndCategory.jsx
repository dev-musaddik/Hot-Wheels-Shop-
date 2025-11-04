import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { createBrandAsync, resetBrandAddStatus, selectBrandAddStatus, selectBrandErrors } from '../../brands/BrandSlice';
import { createCategoryAsync, resetCategoryAddStatus, selectCategoryAddStatus, selectCategoryErrors } from '../../categories/CategoriesSlice';

export const AddBrandAndCategory = () => {
    const { register: registerBrand, handleSubmit: handleSubmitBrand, reset: resetBrand } = useForm();
    const { register: registerCategory, handleSubmit: handleSubmitCategory, reset: resetCategory } = useForm();
    const dispatch = useDispatch();
    const theme = useTheme();
    const is480 = useMediaQuery(theme.breakpoints.down(480));

    const brandAddStatus = useSelector(selectBrandAddStatus);
    const brandErrors = useSelector(selectBrandErrors);
    const categoryAddStatus = useSelector(selectCategoryAddStatus);
    const categoryErrors = useSelector(selectCategoryErrors);

    useEffect(() => {
        if (brandAddStatus === 'fulfilled') {
            toast.success("Brand added successfully");
            resetBrand();
            dispatch(resetBrandAddStatus());
        } else if (brandAddStatus === 'rejected') {
            toast.error(brandErrors.message || "Error adding brand");
            dispatch(resetBrandAddStatus());
        }
    }, [brandAddStatus, brandErrors, dispatch, resetBrand]);

    useEffect(() => {
        if (categoryAddStatus === 'fulfilled') {
            toast.success("Category added successfully");
            resetCategory();
            dispatch(resetCategoryAddStatus());
        } else if (categoryAddStatus === 'rejected') {
            toast.error(categoryErrors.message || "Error adding category");
            dispatch(resetCategoryAddStatus());
        }
    }, [categoryAddStatus, categoryErrors, dispatch, resetCategory]);

    const handleAddBrand = (data) => {
        dispatch(createBrandAsync(data));
    };

    const handleAddCategory = (data) => {
        dispatch(createCategoryAsync(data));
    };

    return (
        <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} rowGap={5}>
            <Stack width={is480 ? "100%" : '30rem'} rowGap={4} mt={is480 ? 4 : 6} mb={6} component={'form'} noValidate onSubmit={handleSubmitBrand(handleAddBrand)}>
                <Typography variant='h5'>Add Brand</Typography>
                <Stack>
                    <Typography variant='h6' fontWeight={400} gutterBottom>Brand Name</Typography>
                    <TextField {...registerBrand("name", { required: 'Brand name is required' })} />
                </Stack>
                <LoadingButton loading={brandAddStatus === 'pending'} size={is480 ? 'medium' : 'large'} variant='contained' type='submit'>Add Brand</LoadingButton>
            </Stack>

            <Stack width={is480 ? "100%" : '30rem'} rowGap={4} mt={is480 ? 4 : 6} mb={6} component={'form'} noValidate onSubmit={handleSubmitCategory(handleAddCategory)}>
                <Typography variant='h5'>Add Category</Typography>
                <Stack>
                    <Typography variant='h6' fontWeight={400} gutterBottom>Category Name</Typography>
                    <TextField {...registerCategory("name", { required: 'Category name is required' })} />
                </Stack>
                <LoadingButton loading={categoryAddStatus === 'pending'} size={is480 ? 'medium' : 'large'} variant='contained' type='submit'>Add Category</LoadingButton>
            </Stack>
        </Stack>
    );
};